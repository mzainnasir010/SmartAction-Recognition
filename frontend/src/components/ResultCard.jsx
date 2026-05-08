import React from 'react';
import { Box, Typography, Paper, Button, CircularProgress, alpha } from '@mui/material';
import { CheckCircleOutline, Replay, Download } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const CircularProgressWithLabel = ({ value }) => (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={100} size={80} thickness={3} sx={{ color: (theme) => alpha(theme.palette.primary.main, 0.1), position: 'absolute' }} />
        <CircularProgress variant="determinate" value={value} size={80} thickness={3} sx={{ color: 'primary.main', strokeLinecap: 'round' }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>{Math.round(value)}%</Typography>
        </Box>
    </Box>
);

const ProbabilityBar = ({ label, value, index }) => (
    <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', textTransform: 'capitalize' }}>
                {label.replace(/_/g, ' ')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {value}%
            </Typography>
        </Box>
        <Box sx={{ height: 8, width: '100%', bgcolor: (theme) => alpha(theme.palette.divider, 0.5), borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                style={{ height: '100%', backgroundColor: 'currentColor', borderRadius: 4 }}
                sx={{ color: 'primary.main' }}
            />
        </Box>
    </Box>
);

const ResultCard = ({ result, onReset }) => {
    if (!result) return null;

    const topProbabilities = Object.entries(result.probabilities || {}).slice(0, 8);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, mt: 4, borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
                    {/* Background Decorative Element */}
                    <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`, pointerEvents: 'none' }} />

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, position: 'relative' }}>
                        {/* Main Prediction Section */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: (theme) => alpha(theme.palette.success.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, mx: { xs: 'auto', md: 0 } }}>
                                <CheckCircleOutline sx={{ fontSize: 24, color: 'success.main' }} />
                            </Box>
                            
                            <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 3, fontWeight: 800 }}>
                                CLASSIFICATION SUCCESSFUL
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 800, color: 'text.primary', my: 1, textTransform: 'capitalize' }}>
                                {result.action.replace(/_/g, ' ')}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 4, my: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Box>
                                    <CircularProgressWithLabel value={result.confidence} />
                                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary', fontWeight: 700, textAlign: 'center' }}>
                                        CONFIDENCE
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                        {result.processing_time}s
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                                        LATENCY
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                <Button variant="contained" startIcon={<Replay />} onClick={onReset} sx={{ px: 4, py: 1.5 }}>
                                    Analyze New
                                </Button>
                                <Button variant="outlined" startIcon={<Download />} onClick={() => {
                                    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'prediction_result.json';
                                    a.click();
                                }} sx={{ px: 3, borderColor: 'divider', color: 'text.secondary' }}>
                                    JSON
                                </Button>
                            </Box>
                        </Box>

                        {/* Probability Distribution Section */}
                        <Box sx={{ flex: 1.2, borderLeft: { md: '1px solid' }, borderColor: { md: 'divider' }, pl: { md: 6 } }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                                Probability Distribution
                            </Typography>
                            <Box>
                                {topProbabilities.map(([label, value], index) => (
                                    <ProbabilityBar key={label} label={label} value={value} index={index} />
                                ))}
                            </Box>
                        </Box>
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
