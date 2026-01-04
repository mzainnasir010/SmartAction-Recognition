# Action Recognition Web Application

A professional full-stack application for human action recognition using Deep Learning (CNN-LSTM).

## Project Structure
- `backend/`: Flask REST API serving the PyTorch model.
- `frontend/`: React + Vite application with Material UI.

## Prerequisites
- Python 3.8+
- Node.js 16+
- PyTorch Model (`action_recognition_model.pth`) and Label Encoder (`label_encoder.pkl`)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create `action_recognition_model.pth` and `label_encoder.pkl` inside `backend/src/models/`.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python run.py
   ```
   Server runs on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`.

## Environment Variables
Create a `.env` file in `backend/` if needed (currently using `config.py` defaults).

## Usage
1. Open the frontend URL.
2. Drag and drop a video file (.mp4, .avi).
3. View the predicted action and confidence score.
