import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Local model paths (downloaded on startup if not present)
    MODEL_DIR = os.path.join(BASE_DIR, 'src', 'models')
    MODEL_PATH = os.path.join(MODEL_DIR, 'action_recognition_model.pth')
    LABEL_ENCODER_PATH = os.path.join(MODEL_DIR, 'label_encoder.pkl')
    
    # Hugging Face URLs for model download
    HF_MODEL_URL = os.getenv('HF_MODEL_URL', "https://huggingface.co/zainnasir010/action-recognition-cnn-lstm/resolve/main/action_recognition_model.pth")
    HF_ENCODER_URL = os.getenv('HF_ENCODER_URL', "https://huggingface.co/zainnasir010/action-recognition-cnn-lstm/resolve/main/label_encoder.pkl")
    
    # Model Architecture Config
    SEQUENCE_LENGTH = int(os.getenv('SEQUENCE_LENGTH', 20))
    IMG_HEIGHT = 112
    IMG_WIDTH = 112
    LSTM_HIDDEN = int(os.getenv('LSTM_HIDDEN', 256))
    LSTM_LAYERS = int(os.getenv('LSTM_LAYERS', 2))      
    DROPOUT = float(os.getenv('DROPOUT', 0.3))
    
    # Application Settings
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '*')
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 50 * 1024 * 1024))
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

    @staticmethod
    def ensure_dirs():
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        os.makedirs(Config.MODEL_DIR, exist_ok=True)

