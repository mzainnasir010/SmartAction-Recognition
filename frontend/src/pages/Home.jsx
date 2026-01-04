import React from 'react';
import { Box, Typography, Grid, Paper, Chip, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Memory, Speed, ArrowForward, Layers, Schema } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Paper
            sx={{
                p: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
            }}
        >
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha('#0ea5e9', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'primary.main',
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {description}
            </Typography>
        </Paper>
    </motion.div>
);

const Home = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <Memory />, title: 'ResNet50 Backbone', description: 'Pre-trained on ImageNet for spatial feature extraction.' },
        { icon: <Schema />, title: 'Bi-LSTM Sequence', description: 'Captures temporal patterns both forward and backward.' },
        { icon: <Speed />, title: 'Real-Time Analysis', description: 'Optimized inference pipeline processes videos in seconds.' },
        { icon: <Layers />, title: '8 Action Classes', description: 'Sports, fitness, and music activities recognition.' },
    ];

    // The 8 supported classes
    const supportedActions = ['Basketball', 'Bowling', 'GolfSwing', 'TennisSwing', 'Drumming', 'PushUps', 'PullUps', 'JumpingJack'];

    return (
        <Box sx={{ py: 4 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Chip
                    label="Deep Learning • Computer Vision"
                    size="small"
                    sx={{
                        mb: 3,
                        bgcolor: alpha('#0ea5e9', 0.1),
                        color: 'primary.main',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: alpha('#0ea5e9', 0.2),
                    }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary', fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1 }}>
                    Understand Human
                    <br />
                    <Box component="span" sx={{ color: 'primary.main' }}>Actions in Video</Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
                    A CNN-LSTM model that watches video sequences and identifies what actions are being performed.
                </Typography>
                <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/analysis')} sx={{ px: 4, py: 1.5 }}>
                    Start Analysis
                </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Paper sx={{ p: 3, my: 6, borderRadius: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 3 }}>
                    {[
                        { label: 'Action Classes', value: '8' },
                        { label: 'Architecture', value: 'CNN-LSTM' },
                        { label: 'Frames/Video', value: '20' },
                        { label: 'Input Size', value: '112×112' },
                    ].map((stat) => (
                        <Box key={stat.label} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>{stat.value}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{stat.label}</Typography>
                        </Box>
                    ))}
                </Paper>
            </motion.div>

            {/* Supported Actions Display */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
                    SUPPORTED ACTIONS
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {supportedActions.map((action) => (
                        <Chip
                            key={action}
                            label={action.replace(/([A-Z])/g, ' $1').trim()}
                            sx={{
                                bgcolor: alpha('#0ea5e9', 0.1),
                                color: 'primary.main',
                                fontWeight: 600,
                                '&:hover': { bgcolor: alpha('#0ea5e9', 0.2) }
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>ARCHITECTURE HIGHLIGHTS</Typography>
            <Grid container spacing={3}>
                {features.map((feature, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={feature.title}>
                        <FeatureCard {...feature} delay={0.1 * index} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8 }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>TECH STACK</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {['PyTorch', 'Flask', 'OpenCV', 'React', 'Vite', 'Material UI', 'Framer Motion'].map((tech) => (
                        <Chip key={tech} label={tech} variant="outlined" size="small" sx={{ borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
