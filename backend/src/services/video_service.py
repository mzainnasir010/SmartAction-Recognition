import cv2
import numpy as np
import torch
from ..config import Config

def extract_frames(video_path, max_frames=None):
    """
    Extract frames from video - matching notebook implementation exactly.
    Uses uniform sampling to get max_frames from the video.
    """
    if max_frames is None:
        max_frames = Config.SEQUENCE_LENGTH
        
    cap = cv2.VideoCapture(video_path)
    frames = []
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    if total_frames == 0:
        cap.release()
        raise ValueError("Could not read frames from video")
    
    # Calculate step for uniform sampling (from notebook)
    step = max(1, total_frames // max_frames)
    
    for i in range(0, total_frames, step):
        if len(frames) >= max_frames:
            break
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if ret:
            # Resize and convert BGR to RGB
            frame = cv2.resize(frame, (Config.IMG_WIDTH, Config.IMG_HEIGHT))
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame)
    
    cap.release()
    
    # Pad with last frame if needed (from notebook)
    while len(frames) < max_frames:
        if len(frames) > 0:
            frames.append(frames[-1])
        else:
            frames.append(np.zeros((Config.IMG_HEIGHT, Config.IMG_WIDTH, 3), dtype=np.uint8))
    
    return np.array(frames[:max_frames])

def normalize_frames(frames):
    """
    Normalize frames (0-255 -> 0-1) and convert to PyTorch tensor.
    Returns tensor of shape (1, seq_len, 3, h, w)
    """
    # Normalize to 0-1 (from notebook)
    frames = frames / 255.0
    
    # Convert to tensor: (seq_len, h, w, 3) -> (seq_len, 3, h, w)
    frames = torch.FloatTensor(frames).permute(0, 3, 1, 2)
    
    # Add batch dimension: (1, seq_len, 3, h, w)
    frames = frames.unsqueeze(0)
    
    return frames
