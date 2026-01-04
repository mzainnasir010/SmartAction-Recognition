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
    # Check if video file is in request
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided. Please upload a video.'}), 400
    
    file = request.files['video']
    
    # Check if file was selected
    if file.filename == '':
        return jsonify({'error': 'No file selected. Please choose a video file.'}), 400
    
    # Check file extension
    if not allowed_file(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else 'unknown'
        return jsonify({
            'error': f'Invalid file type (.{ext}). Allowed formats: MP4, AVI, MOV.'
        }), 415
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
    
    try:
        # Save uploaded file
        file.save(filepath)
        
        # Check file size after save (backup check)
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
