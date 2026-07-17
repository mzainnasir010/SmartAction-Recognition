# Action Recognition Web Application

A full-stack application for human action recognition using Deep Learning (CNN-LSTM).

## Features
- **8 Action Classes**: Basketball, Bowling, GolfSwing, TennisSwing, Drumming, PushUps, PullUps, JumpingJack
- **Auto-download Models**: Fetches trained model from Hugging Face on startup
- **Modern UI**: React + Vite with Material UI and Framer Motion animations

## Project Structure
- `backend/`: Flask REST API with PyTorch inference
- `frontend/`: React dashboard with video upload

## Prerequisites
- Python 3.8+
- Node.js 16+

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Server runs on `http://localhost:5000`. Models are automatically downloaded from [Hugging Face](https://huggingface.co/zainnasir010/action-recognition-cnn-lstm).

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Usage
1. Open the frontend URL
2. Navigate to "Analyze" page
3. Upload a video file (.mp4, .avi, .mov)
4. View the predicted action and confidence score

## Model
- **Architecture**: ResNet50 (CNN) + Bidirectional LSTM
- **Dataset**: UCF-101 (filtered to 8 classes)
- **Hosted on**: [Hugging Face](https://huggingface.co/zainnasir010/action-recognition-cnn-lstm)

## Author
M. Zain Nasir - [GitHub](https://github.com/mzainnasir010)
