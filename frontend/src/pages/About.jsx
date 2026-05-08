import React from 'react';
import { motion } from 'framer-motion';
import { 
    LayersOutlined, 
    StorageOutlined, 
    SpeedOutlined, 
    TerminalOutlined, 
    HubOutlined,
    DoneAllOutlined,
    OpenInNew
} from '@mui/icons-material';
import { Box, Typography, Grid, Paper, Card, CardContent, Divider, alpha, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const techStack = [
        { name: 'PyTorch', description: 'Deep Learning Framework', icon: <TerminalOutlined color="primary" /> },
        { name: 'ResNet-50', description: 'Feature Extraction (CNN)', icon: <LayersOutlined color="primary" /> },
        { name: 'LSTM', description: 'Temporal Sequence Analysis', icon: <HubOutlined color="primary" /> },
        { name: 'Flask', description: 'Backend REST API', icon: <TerminalOutlined color="primary" /> },
        { name: 'React', description: 'Frontend Interface', icon: <LayersOutlined color="primary" /> },
        { name: 'MUI', description: 'Design System', icon: <LayersOutlined color="primary" /> }
    ];

    const modelDetails = [
        { 
            label: 'Dataset', 
            value: 'UCF-101 (101 Action Classes)',
            action: (
                <Button 
                    size="small" 
                    startIcon={<OpenInNew fontSize="small" />}
                    href="https://www.kaggle.com/datasets/matthewjansen/ucf101-action-recognition"
                    target="_blank"
                    sx={{ mt: 1, borderRadius: 1.5, fontSize: '0.7rem', py: 0.2 }}
                >
                    Explore Kaggle
                </Button>
            )
        },
        { label: 'Architecture', value: 'CNN + Bi-LSTM' },
        { label: 'Sequence Length', value: '20 Frames' },
        { label: 'Frame Size', value: '112 x 112 Pixels' }
    ];

    return (
        <Box sx={{ py: 6, pb: 10 }}>
            {/* Hero Section */}
            <Box component={motion.div} {...fadeIn} sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 4 }}>
                    ARCHITECTURE & DESIGN
                </Typography>
                <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 900 }}>
                    Human Action Recognition
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto', fontWeight: 500 }}>
                    A sophisticated deep learning pipeline combining convolutional spatial feature extraction with recurrent temporal analysis.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Core Architecture */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper component={motion.div} {...fadeIn} sx={{ p: 4, height: '100%', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LayersOutlined color="primary" fontSize="large" /> The Pipeline
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                            Our model employs a hybrid <strong>CNN-LSTM</strong> architecture designed to capture both what is happening in each frame (spatial) and how the action evolves over time (temporal).
                        </Typography>
                        
                        <Box sx={{ position: 'relative', pl: 4, borderLeft: '2px solid', borderColor: 'divider' }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>1. Spatial Feature Extraction</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    A pre-trained <strong>ResNet-50</strong> CNN processes individual video frames to extract high-dimensional spatial features, converting visual data into numerical representations.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>2. Temporal Modeling</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    The sequence of spatial features is fed into a <strong>Bidirectional LSTM</strong> (Long Short-Term Memory) network which identifies patterns and dependencies across the temporal dimension.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>3. Classification</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    A final fully-connected layer produces a probability distribution across 101 distinct action classes, outputting the most likely classification with a confidence score.
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Quick Specs */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
                        <Card component={motion.div} {...fadeIn} transition={{ delay: 0.2 }} sx={{ p: 1, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <StorageOutlined color="primary" /> Model Specs
                                </Typography>
                                <List disablePadding>
                                    {modelDetails.map((detail, index) => (
                                        <ListItem key={index} divider={index !== modelDetails.length - 1} sx={{ px: 0, py: 2, alignItems: 'flex-start' }}>
                                            <ListItemText 
                                                primary={<Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{detail.label}</Typography>} 
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 700 }}>{detail.value}</Typography>
                                                        {detail.action}
                                                    </Box>
                                                } 
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>

                        <Paper component={motion.div} {...fadeIn} transition={{ delay: 0.3 }} sx={{ p: 4, borderRadius: 2, flex: 1, bgcolor: alpha('#6366f1', 0.05) }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <SpeedOutlined color="primary" /> Inference
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                Optimized for CPU/GPU inference with sub-second latency for short video segments.
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>

                {/* Tech Stack Grid */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, mt: 4, textAlign: 'center' }}>
                        Powered By
                    </Typography>
                    <Grid container spacing={3}>
                        {techStack.map((tech, index) => (
                            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                                <Card 
                                    component={motion.div} 
                                    whileHover={{ y: -5 }}
                                    sx={{ 
                                        textAlign: 'center', 
                                        p: 2, 
                                        height: '100%', 
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }}>{tech.icon}</Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{tech.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{tech.description}</Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default About;
