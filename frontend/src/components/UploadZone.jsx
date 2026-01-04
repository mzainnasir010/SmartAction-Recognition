import React, { useCallback } from 'react';
import { Box, Typography, Paper, CircularProgress, alpha } from '@mui/material';
import { CloudUploadOutlined, VideoFileOutlined } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const UploadZone = ({ onFileSelect, isLoading, previewUrl }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': ['.mp4', '.avi', '.mov'] },
        maxFiles: 1,
        disabled: isLoading,
    });

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <Paper
                {...getRootProps()}
                sx={{
                    p: 6,
                    borderRadius: 4,
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'divider',
                    bgcolor: isDragActive ? alpha('#0ea5e9', 0.05) : 'background.paper',
                    cursor: isLoading ? 'default' : 'pointer',
                    textAlign: 'center',
                    minHeight: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: 'primary.main', bgcolor: alpha('#0ea5e9', 0.02) },
                }}
            >
                <input {...getInputProps()} />
                {isLoading ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                            <CircularProgress size={80} thickness={3} sx={{ color: 'primary.main' }} />
                            <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <VideoFileOutlined sx={{ fontSize: 28, color: 'primary.main' }} />
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Analyzing Video</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>Extracting frames and running inference...</Typography>
                    </Box>
                ) : previewUrl ? (
                    <Box sx={{ width: '100%' }}>
                        <video src={previewUrl} controls style={{ maxHeight: 280, maxWidth: '100%', borderRadius: 12, boxShadow: `0 8px 32px ${alpha('#000', 0.4)}` }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3, fontWeight: 500 }}>Drop another file to replace</Typography>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ width: 80, height: 80, borderRadius: 3, bgcolor: alpha('#0ea5e9', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, color: 'primary.main' }}>
                            <CloudUploadOutlined sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{isDragActive ? 'Drop it here' : 'Upload Video'}</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>Drag & drop or click to browse</Typography>
                        <Box sx={{ display: 'inline-flex', gap: 2, p: 1.5, px: 2.5, borderRadius: 2, bgcolor: 'background.default' }}>
                            {['.MP4', '.AVI', '.MOV'].map((ext) => (
                                <Typography key={ext} variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>{ext}</Typography>
                            ))}
                            <Typography variant="caption" sx={{ color: 'divider' }}>•</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>Max 50MB</Typography>
                        </Box>
                    </>
                )}
            </Paper>
        </motion.div>
    );
};

export default UploadZone;

UploadZone.propTypes = {
    onFileSelect: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    previewUrl: PropTypes.string,
};
