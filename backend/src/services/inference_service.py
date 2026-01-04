import torch
import pickle
import os
import urllib.request
import tempfile
import io
from ..config import Config
from ..models.cnn_lstm import CNNLSTMModel
from .video_service import extract_frames, normalize_frames

class InferenceService:
    """Singleton service for model loading and inference."""
    _instance = None
    _model = None
    _label_encoder = None
    _device = None
    _num_classes = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
            cls._instance._load_resources()
        return cls._instance

    def _load_resources(self):
        """Load model and label encoder directly from Hugging Face."""
        self._device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Loading model on {self._device}...")
        
        # Load label encoder directly from Hugging Face
        print("Fetching label encoder from Hugging Face...")
        try:
            with urllib.request.urlopen(Config.HF_ENCODER_URL) as response:
                encoder_data = response.read()
            self._label_encoder = pickle.loads(encoder_data)
            print("Label encoder loaded from Hugging Face")
        except Exception as e:
            raise RuntimeError(f"Failed to load label encoder from Hugging Face: {e}")
        
        self._num_classes = len(self._label_encoder.classes_)
        print(f"Loaded {self._num_classes} classes")

        # Create model with correct architecture
        self._model = CNNLSTMModel(
            num_classes=self._num_classes,
            lstm_hidden=Config.LSTM_HIDDEN,
            lstm_layers=Config.LSTM_LAYERS,
            dropout=Config.DROPOUT
        )

        # Load model weights directly from Hugging Face
        print("Fetching model from Hugging Face (this may take a moment)...")
        try:
            with urllib.request.urlopen(Config.HF_MODEL_URL) as response:
                model_data = io.BytesIO(response.read())
            checkpoint = torch.load(model_data, map_location=self._device, weights_only=False)
            print("Model downloaded from Hugging Face")
        except Exception as e:
            raise RuntimeError(f"Failed to load model from Hugging Face: {e}")
        
        # Handle DataParallel saved models
        state_dict = checkpoint.get('model_state_dict', checkpoint)
        
        # Remove 'module.' prefix if present (from DataParallel)
        new_state_dict = {}
        for k, v in state_dict.items():
            if k.startswith('module.'):
                new_state_dict[k[7:]] = v
            else:
                new_state_dict[k] = v
        
        self._model.load_state_dict(new_state_dict)
        self._model.to(self._device)
        self._model.eval()
        print("Model loaded successfully!")

    def predict(self, video_path):
        """Run inference on a video file."""
        try:
            # Extract and preprocess frames
            frames = extract_frames(video_path, Config.SEQUENCE_LENGTH)
            input_tensor = normalize_frames(frames).to(self._device)

            # Run inference
            with torch.no_grad():
                outputs = self._model(input_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                confidence, predicted_idx = probabilities.max(1)

            # Decode prediction
            confidence_score = confidence.item() * 100
            predicted_label = self._label_encoder.inverse_transform([predicted_idx.item()])[0]

            return {
                'action': predicted_label,
                'confidence': round(confidence_score, 2)
            }

        except Exception as e:
            print(f"Prediction failed: {e}")
            raise e

    def get_classes(self):
        """Return list of all action classes."""
        if self._label_encoder:
            return list(self._label_encoder.classes_)
        return []
