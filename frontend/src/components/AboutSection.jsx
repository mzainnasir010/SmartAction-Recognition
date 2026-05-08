import React from 'react';
import { Box, Typography, Paper, Grid, alpha, Chip } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ArchitectureBlock = ({ title, subtitle, color }) => (
    <Paper 
        sx={{ 
            p: 2.5, 
            textAlign: 'center', 
            borderRadius: 2, 
            bgcolor: (theme) => alpha(color.includes('.') ? theme.palette.text.primary : color, 0.08), 
            border: '1px solid', 
            borderColor: (theme) => alpha(color.includes('.') ? theme.palette.text.primary : color, 0.2) 
        }}
    >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color }}>{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
    </Paper>
);

const AboutSection = () => {
    // The 8 supported classes
    const supportedActions = ['Basketball', 'Bowling', 'Golf Swing', 'Tennis Swing', 'Drumming', 'Push Ups', 'Pull Ups', 'Jumping Jack'];

    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>MODEL ARCHITECTURE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>How the model works</Typography>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <Paper sx={{ p: 4, borderRadius: 4 }}>
                    {/* Architecture Flow */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 120 }}><ArchitectureBlock title="Video Input" subtitle="20 Frames" color="text.primary" /></Box>
                        <ArrowForward sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
                        <Box sx={{ flex: 1, minWidth: 120 }}><ArchitectureBlock title="ResNet50" subtitle="Feature Extraction" color="text.primary" /></Box>
                        <ArrowForward sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
                        <Box sx={{ flex: 1, minWidth: 120 }}><ArchitectureBlock title="Bi-LSTM" subtitle="Sequence Analysis" color="text.primary" /></Box>
                        <ArrowForward sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
                        <Box sx={{ flex: 1, minWidth: 120 }}><ArchitectureBlock title="Dense Layer" subtitle="Classification" color="text.primary" /></Box>
                        <ArrowForward sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
                        <Box sx={{ flex: 1, minWidth: 120 }}><ArchitectureBlock title="Action" subtitle="8 Classes" color="text.primary" /></Box>
                    </Box>

                    {/* Supported Classes */}
                    <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                            Recognized Actions
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {supportedActions.map((action) => (
                                <Chip
                                    key={action}
                                    label={action}
                                    size="small"
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
                                        color: 'primary.main',
                                        fontWeight: 500,
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Technical Details */}
                    <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Frame Extraction</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>Uniformly samples 20 frames from input video, resizing each to 112×112 pixels.</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Spatial Features</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>ResNet50 extracts 2048-dimensional feature vectors from each frame.</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Temporal Modeling</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>Bidirectional LSTM captures motion patterns across the frame sequence.</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default AboutSection;
