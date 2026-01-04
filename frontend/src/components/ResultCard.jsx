import React from 'react';
import { Box, Typography, Paper, Button, CircularProgress, alpha } from '@mui/material';
import { CheckCircleOutline, Replay, Download } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const CircularProgressWithLabel = ({ value }) => (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={100} size={100} thickness={3} sx={{ color: alpha('#0ea5e9', 0.1), position: 'absolute' }} />
        <CircularProgress variant="determinate" value={value} size={100} thickness={3} sx={{ color: 'primary.main' }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>{Math.round(value)}%</Typography>
        </Box>
    </Box>
);

const ResultCard = ({ result, onReset }) => {
    if (!result) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
                <Paper sx={{ p: 5, mt: 4, borderRadius: 4, textAlign: 'center', border: '1px solid', borderColor: alpha('#0ea5e9', 0.3), bgcolor: alpha('#0ea5e9', 0.02) }}>
                    <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: alpha('#10b981', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                        <CheckCircleOutline sx={{ fontSize: 32, color: '#10b981' }} />
                    </Box>
                    <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>DETECTED ACTION</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', my: 2, textTransform: 'capitalize' }}>{result.action.replace(/_/g, ' ')}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, my: 4 }}>
                        <Box>
                            <CircularProgressWithLabel value={result.confidence} />
                            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary', fontWeight: 500 }}>Confidence</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>{result.processing_time}s</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>Processing Time</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" startIcon={<Replay />} onClick={onReset} sx={{ px: 4 }}>Analyze Another</Button>
                        <Button variant="outlined" startIcon={<Download />} onClick={() => {
                            const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'prediction_result.json';
                            a.click();
                        }} sx={{ borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}>Export</Button>
                    </Box>
                </Paper>
            </motion.div>
        </AnimatePresence>
    );
};

export default ResultCard;

ResultCard.propTypes = {
    result: PropTypes.shape({
        action: PropTypes.string.isRequired,
        confidence: PropTypes.number.isRequired,
        processing_time: PropTypes.number.isRequired,
    }),
    onReset: PropTypes.func.isRequired,
};
