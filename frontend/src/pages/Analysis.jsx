import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import UploadZone from '../components/UploadZone';
import ResultCard from '../components/ResultCard';
import SampleVideos from '../components/SampleVideos';
import AboutSection from '../components/AboutSection';

// Error code to user-friendly message mapping
const ERROR_MESSAGES = {
    400: 'Invalid request. Please check your file and try again.',
    413: 'File too large. Maximum size is 50MB.',
    415: 'Unsupported file format. Please use MP4, AVI, or MOV.',
    422: 'Could not process video. File may be corrupted.',
    500: 'Server error occurred. Please try again later.',
    503: 'Model is still loading. Please wait a moment and try again.',
};

const getErrorMessage = (error) => {
    // Network error (backend not running)
    if (!error.response) {
        if (error.code === 'ERR_NETWORK') {
            return 'Cannot connect to server. Is the backend running?';
        }
        return 'Network error. Please check your connection.';
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.error;

    // Use server message if available, otherwise map status code
    if (serverMessage) {
        return serverMessage;
    }

    return ERROR_MESSAGES[status] || `Error ${status}: Something went wrong.`;
};

const Analysis = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileSelect = async (selectedFile) => {
        // Client-side validation first
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (selectedFile.size > maxSize) {
            setError('File too large. Maximum size is 50MB.');
            return;
        }

        const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo'];
        const allowedExtensions = ['.mp4', '.avi', '.mov'];
        const extension = '.' + selectedFile.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            setError(`Unsupported format (${extension}). Please use MP4, AVI, or MOV.`);
            return;
        }

        setFile(selectedFile);
        setResult(null);
        setError(null);

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        await predictAction(selectedFile);
    };

    const predictAction = async (videoFile) => {
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('video', videoFile);

        try {
            const response = await axios.post('http://localhost:5000/api/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 120000, // 2 minute timeout for large videos
                maxContentLength: 50 * 1024 * 1024,
                maxBodyLength: 50 * 1024 * 1024,
            });
            setResult(response.data);
        } catch (err) {
            console.error('Prediction error:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
    };

    return (
        <Box sx={{ py: 4 }}>
            {!result && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Live Analysis
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Upload a video to detect human actions in real-time.
                    </Typography>
                </Box>
            )}

            <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} previewUrl={previewUrl} />

            <ResultCard result={result} onReset={handleReset} />

            {!result && (
                <>
                    <SampleVideos />
                    <AboutSection />
                </>
            )}

            <Snackbar
                open={!!error}
                autoHideDuration={8000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setError(null)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%', maxWidth: 500 }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Analysis;
