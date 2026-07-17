from flask import Flask
from flask_cors import CORS
from .config import Config
from .controllers.predict_controller import predict_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ALLOWED_ORIGINS']}})
    
    # Initialize Config (create dirs)
    Config.ensure_dirs()
    
    # Register Blueprints
    app.register_blueprint(predict_bp)

    @app.route('/')
    def index():
        return {'status': 'running', 'message': 'SmartAction Recognition API'}, 200

    @app.route('/health')
    def health():
        return {'status': 'ok'}, 200
    
    # Preload Model (Optional: depends on if we want lazy or eager loading)
    # Eager loading is better for user experience on first request
    with app.app_context():
        from .services.inference_service import InferenceService
        print("Initializing Inference Service...")
        InferenceService.get_instance()
        
    return app