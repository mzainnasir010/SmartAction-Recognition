from flask import Flask
from flask_cors import CORS
from .config import Config
from .controllers.predict_controller import predict_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}}) # Allow all for development, or specify localhost:5173
    
    # Initialize Config (create dirs)
    Config.ensure_dirs()
    
    # Register Blueprints
    app.register_blueprint(predict_bp)
    
    # Preload Model (Optional: depends on if we want lazy or eager loading)
    # Eager loading is better for user experience on first request
    with app.app_context():
        from .services.inference_service import InferenceService
        print("Initializing Inference Service...")
        InferenceService.get_instance()
        
    return app
