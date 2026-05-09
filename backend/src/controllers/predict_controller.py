from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import os
import time
from ..services.inference_service import InferenceService

from ..config import Config

predict_bp = Blueprint('predict', __name__, url_prefix='/api')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

@predict_bp.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(e):
    """Handle 413 Request Entity Too Large"""
    return jsonify({
        'error': f'File too large. Maximum allowed size is {Config.MAX_CONTENT_LENGTH // (1024*1024)}MB.'
    }), 413

@predict_bp.route('/predict', methods=['POST'])
def predict():
    filepath = None
    
    # CASE 1: Video URL (Direct Link)
    video_url = request.form.get('video_url')
    if video_url:
        try:
            import requests
            import uuid
            
            # Simple validation
            if not video_url.startswith(('http://', 'https://')):
                return jsonify({'error': 'Invalid URL format.'}), 400
                
            response = requests.get(video_url, stream=True, timeout=30)
            response.raise_for_status()
            
            # Create a unique filename
            filename = f"{uuid.uuid4()}.mp4"
            filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
            
            # Stream the download to avoid loading entirely into memory
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        
        except Exception as e:
            return jsonify({
                'error': f'Failed to download video from URL: {str(e)}'
            }), 422
    
    # CASE 2: Uploaded File
    elif 'video' in request.files:
        file = request.files['video']
        if file.filename == '':
            return jsonify({'error': 'No file selected.'}), 400
        
        if not allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else 'unknown'
            return jsonify({'error': f'Invalid file type (.{ext}).'}), 415
            
        filename = secure_filename(file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(filepath)
    
    else:
        return jsonify({'error': 'No video file or URL provided.'}), 400
    
    try:
        # Check file size after save or download
        file_size = os.path.getsize(filepath)
        if file_size > Config.MAX_CONTENT_LENGTH:
            os.remove(filepath)
            return jsonify({
                'error': f'File too large ({file_size // (1024*1024)}MB). Maximum is {Config.MAX_CONTENT_LENGTH // (1024*1024)}MB.'
            }), 413
        
        # Run inference
        start_time = time.time()
        inference_service = InferenceService.get_instance()
        result = inference_service.predict(filepath)
        processing_time = round(time.time() - start_time, 2)
        
        # Clean up uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)
        
        return jsonify({
            'action': result['action'],
            'confidence': result['confidence'],
            'probabilities': result['probabilities'],
            'processing_time': processing_time
        })
        
    except FileNotFoundError as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        current_app.logger.error(f"Model file not found: {str(e)}")
        return jsonify({'error': 'Model not loaded. Please contact administrator.'}), 503
        
    except ValueError as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        current_app.logger.error(f"Video processing error: {str(e)}")
        return jsonify({'error': f'Could not process video: {str(e)}'}), 422
        
    except Exception as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        current_app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@predict_bp.route('/classes', methods=['GET'])
def get_classes():
    try:
        inference_service = InferenceService.get_instance()
        classes = inference_service.get_classes()
        return jsonify({'classes': classes, 'count': len(classes)})
    except Exception as e:
        return jsonify({'error': f'Failed to load classes: {str(e)}'}), 500

@predict_bp.route('/health', methods=['GET'])
def health_check():
    try:
        inference_service = InferenceService.get_instance()
        model_loaded = inference_service._model is not None
        return jsonify({
            'status': 'healthy' if model_loaded else 'degraded',
            'model_loaded': model_loaded,
            'num_classes': len(inference_service.get_classes()) if model_loaded else 0
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 503
