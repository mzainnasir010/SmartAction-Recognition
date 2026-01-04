import torch
import torch.nn as nn
from torchvision import models

class CNNLSTMModel(nn.Module):
    """
    CNN-LSTM Model for Action Recognition
    Architecture matches the new 8-class trained model
    - CNN: ResNet50 (pretrained, frozen)
    - LSTM: Bidirectional with hidden=256, layers=2
    - FC: 512 -> 256 -> num_classes
    """
    def __init__(self, num_classes, lstm_hidden=256, lstm_layers=2, dropout=0.3):
        super(CNNLSTMModel, self).__init__()
        
        # ResNet50 backbone (pretrained, frozen)
        resnet = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)
        self.cnn = nn.Sequential(*list(resnet.children())[:-1])
        
        # Freeze CNN parameters
        for param in self.cnn.parameters():
            param.requires_grad = False
        
        # Bidirectional LSTM
        self.lstm = nn.LSTM(
            input_size=2048,        # ResNet50 output features
            hidden_size=lstm_hidden,
            num_layers=lstm_layers,
            batch_first=True,
            dropout=dropout if lstm_layers > 1 else 0,
            bidirectional=True
        )
        
        # Fully connected layers (matching new model: 512 -> 256 -> num_classes)
        self.fc = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(lstm_hidden * 2, 256),  # *2 for bidirectional = 512 -> 256
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(256, num_classes)
        )
        
    def forward(self, x):
        # Input shape: (batch_size, seq_len, channels, height, width)
        batch_size, seq_len, c, h, w = x.size()
        
        # Reshape for CNN: (batch * seq_len, channels, height, width)
        x = x.view(batch_size * seq_len, c, h, w)
        
        # Extract CNN features
        x = self.cnn(x)  # Output: (batch * seq_len, 2048, 1, 1)
        
        # Reshape for LSTM: (batch_size, seq_len, 2048)
        x = x.view(batch_size, seq_len, -1)
        
        # LSTM forward
        x, _ = self.lstm(x)
        
        # Take last timestep output
        x = x[:, -1, :]
        
        # Classification
        x = self.fc(x)
        return x
