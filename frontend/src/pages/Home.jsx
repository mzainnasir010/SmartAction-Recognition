import React from 'react';
import { Box, Typography, Grid, Paper, Chip, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Memory, Speed, ArrowForward, Layers, Schema } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, action, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Paper
            sx={{
                p: 4,
                minHeight: 320,
                bgcolor: 'background.paper',
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { 
                    borderColor: 'primary.main', 
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`
                },
            }}
        >
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: 'primary.main',
                }}
            >
                {icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: action ? 3 : 0, flex: 1 }}>
                {description}
            </Typography>
            {action}
        </Paper>
    </motion.div>
);

const Home = () => {
    const navigate = useNavigate();

    const features = [
        { 
            icon: <Memory />, 
            title: 'ResNet50 Backbone', 
            description: 'Leverages a pre-trained ResNet-50 CNN to extract 2048-dimensional spatial feature vectors from 112×112 resolution frames, capturing high-fidelity visual context.' 
        },
        { 
            icon: <Schema />, 
            title: 'Bidirectional LSTM', 
            description: 'A 256-unit Bi-LSTM network analyzes sequences of 20 frames in both directions to identify complex temporal dependencies and motion patterns.' 
        },
        { 
            icon: <Speed />, 
            title: 'Low-Latency Inference', 
            description: 'Optimized for rapid processing with a specialized inference pipeline, achieving sub-second classification on standard GPU accelerators like the Tesla T4.' 
        },
        { 
            icon: <Layers />, 
            title: 'Action Classification', 
            description: 'Comprehensive recognition engine trained on the extensive UCF-101 dataset, supporting a wide range of human activities across 101 distinct classes.',
            action: (
                <Button 
                    variant="outlined" 
                    size="small" 
                    href="https://www.kaggle.com/datasets/matthewjansen/ucf101-action-recognition" 
                    target="_blank"
                    sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
                >
                    Explore Dataset
                </Button>
            )
        },
    ];

    const supportedActions = ['Basketball', 'Bowling', 'GolfSwing', 'TennisSwing', 'Drumming', 'PushUps', 'PullUps', 'JumpingJack'];

    return (
        <Box sx={{ py: 6 }}>
            {/* Hero Section */}
            <Box sx={{ mb: 10, position: 'relative' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <Typography variant="h1" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, letterSpacing: '-0.05em' }}>
                        Neural Insight into
                        <br />
                        <Box component="span" sx={{ 
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Human Dynamics</Box>
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 700, mb: 6, fontWeight: 500, lineHeight: 1.6 }}>
                        Harness the power of CNN-LSTM architectures to detect, classify, and analyze human actions in video sequences with professional-grade accuracy.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/analysis')} sx={{ px: 6, py: 2 }}>
                            Analyze Now
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/about')} sx={{ px: 4 }}>
                            System Architecture
                        </Button>
                    </Box>
                </motion.div>
            </Box>

            {/* Metrics */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}>
                <Grid container spacing={3} sx={{ mb: 12 }}>
                    {[
                        { label: 'Action Classes', value: '101' },
                        { label: 'Architecture', value: 'CNN-LSTM' },
                        { label: 'Avg. Accuracy', value: '92%' },
                        { label: 'Inference', value: '< 1.5s' },
                    ].map((stat, i) => (
                        <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2, bgcolor: 'background.paper' }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}>{stat.value}</Typography>
                                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: 2 }}>{stat.label}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>

            {/* Actions Grid */}
            <Box sx={{ mb: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 3 }}>CORE CAPABILITIES</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>Primary Recognition Sets</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {supportedActions.map((action) => (
                        <Chip
                            key={action}
                            label={action.replace(/([A-Z])/g, ' $1').trim()}
                            sx={{
                                px: 2,
                                py: 3,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                fontWeight: 700,
                                transition: 'all 0.2s',
                                '&:hover': { 
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05)
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Features */}
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 3, mb: 1, display: 'block' }}>ENGINEERING EXCELLENCE</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 6 }}>Model Highlights</Typography>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={feature.title}>
                        <FeatureCard {...feature} delay={0.1 * index} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
