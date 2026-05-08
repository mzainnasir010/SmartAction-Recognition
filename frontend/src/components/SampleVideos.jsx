import React from 'react';
import { Box, Typography, Grid, Paper, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import {
    SportsBasketball,
    SportsCricket,
    SportsGolf,
    SportsTennis,
    MusicNote,
    FitnessCenter,
} from '@mui/icons-material';

// The 8 supported action classes from the trained model
const SUPPORTED_ACTIONS = [
    { id: 1, title: 'Basketball', icon: SportsBasketball },
    { id: 2, title: 'Bowling', icon: SportsCricket },
    { id: 3, title: 'Golf Swing', icon: SportsGolf },
    { id: 4, title: 'Tennis Swing', icon: SportsTennis },
    { id: 5, title: 'Drumming', icon: MusicNote },
    { id: 6, title: 'Push Ups', icon: FitnessCenter },
    { id: 7, title: 'Pull Ups', icon: FitnessCenter },
    { id: 8, title: 'Jumping Jack', icon: FitnessCenter },
];

const SampleVideos = () => {
    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                SUPPORTED ACTIONS
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                What the model can recognize
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                This model is trained on <strong>8 action classes</strong>. For best results, upload videos containing these activities:
            </Typography>

            <Grid container spacing={2}>
                {SUPPORTED_ACTIONS.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={action.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                            >
                                <Paper
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        borderRadius: 3,
                                        cursor: 'default',
                                        transition: 'all 0.3s ease',
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        <IconComponent sx={{ fontSize: 24, color: 'text.primary' }} />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.85rem' }}
                                    >
                                        {action.title}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Guidance Note */}
            <Paper
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    💡 <strong>Tip:</strong> Upload videos showing clear, complete actions. The model performs best with
                    well-lit videos where the person is clearly visible performing one of the supported activities above.
                </Typography>
            </Paper>
        </Box>
    );
};

export default SampleVideos;
