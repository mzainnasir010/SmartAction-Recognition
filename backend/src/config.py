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
    HF_MODEL_URL = os.environ['HF_MODEL_URL']
    HF_ENCODER_URL = os.environ['HF_ENCODER_URL']
    
    # Model Architecture Config
    SEQUENCE_LENGTH = int(os.environ['SEQUENCE_LENGTH'])
    IMG_HEIGHT = 112
    IMG_WIDTH = 112
    LSTM_HIDDEN = int(os.environ['LSTM_HIDDEN'])
    LSTM_LAYERS = int(os.environ['LSTM_LAYERS'])      
    DROPOUT = float(os.environ['DROPOUT'])
    
    # Application Settings
    CORS_ALLOWED_ORIGINS = os.environ['CORS_ALLOWED_ORIGINS']
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    MAX_CONTENT_LENGTH = int(os.environ['MAX_CONTENT_LENGTH'])
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

    @staticmethod
    def ensure_dirs():
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        os.makedirs(Config.MODEL_DIR, exist_ok=True)

