import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, Card, CardMedia, CardContent, Button, Chip, alpha, Stack, Tab, Tabs, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsOutlined, PlayArrowRounded, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VIDEO_DATA = [
    {
        id: 1,
        title: 'Slam Dunk',
        category: 'Basketball',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330676/v_BasketballDunk_g01_c02_lxirak.mp4'
    },
    {
        id: 4,
        title: 'Perfect Roll',
        category: 'Bowling',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330676/v_Bowling_g01_c03_hfrjpq.mp4'
    },
    {
        id: 5,
        title: 'Power Drive',
        category: 'Golf Swing',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330679/v_GolfSwing_g03_c01_b6ns4o.mp4'
    },
    {
        id: 6,
        title: 'Iron Shot',
        category: 'Golf Swing',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330678/v_GolfSwing_g02_c01_zmtbox.mp4'
    },
    {
        id: 7,
        title: 'Forehand Smash',
        category: 'Tennis Swing',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778333084/v_TennisSwing_g03_c04_szuhtn.mp4'
    },
    {
        id: 8,
        title: 'Backhand Rally',
        category: 'Tennis Swing',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778333084/v_TennisSwing_g02_c02_mi7ubi.mp4'
    },
    {
        id: 9,
        title: 'Drum Solo',
        category: 'Drumming',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330681/v_Drumming_g03_c02_pbqmuw.mp4'
    },
    {
        id: 10,
        title: 'Rhythm Fill',
        category: 'Drumming',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330676/v_Drumming_g02_c06_rb2tfz.mp4'
    },
    {
        id: 11,
        title: 'Military Push Ups',
        category: 'Push Ups',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330765/v_PushUps_g02_c01_txpstw.mp4'
    },
    {
        id: 12,
        title: 'Diamond Push Ups',
        category: 'Push Ups',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330765/v_PushUps_g03_c03_ot7kuq.mp4'
    },
    {
        id: 13,
        title: 'Dead Hang Pull Up',
        category: 'Pull Ups',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330764/v_PullUps_g07_c04_gpekiy.mp4'
    },
    {
        id: 14,
        title: 'Chin Up',
        category: 'Pull Ups',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330763/v_PullUps_g02_c02_xiilgb.mp4'
    },
    {
        id: 15,
        title: 'Cardio Burst',
        category: 'Jumping Jack',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778330679/v_JumpingJack_g01_c06_qj4v4k.mp4'
    },
    {
        id: 16,
        title: 'Full Body Jump',
        category: 'Jumping Jack',
        url: 'https://res.cloudinary.com/defegszzf/video/upload/v1778333086/v_JumpingJack_g06_c05_utfday.mp4'
    },
];

const CATEGORIES = ['All', 'Basketball', 'Bowling', 'Golf Swing', 'Tennis Swing', 'Drumming', 'Push Ups', 'Pull Ups', 'Jumping Jack'];



const VideoLibrary = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [playingVideos, setPlayingVideos] = useState({});
    const navigate = useNavigate();

    const filteredVideos = useMemo(() => {
        if (selectedCategory === 'All') return VIDEO_DATA;
        return VIDEO_DATA.filter(v => v.category === selectedCategory);
    }, [selectedCategory]);

    const toggleVideoPlay = (videoId) => {
        setPlayingVideos(prev => ({ ...prev, [videoId]: !prev[videoId] }));
    };

    return (
        <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 4 }}>
                    REFERENCE DATASET
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                    Video Library
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 800 }}>
                    Explore our curated collection of action videos. Filter by category and view reference footage.
                </Typography>
            </Box>

            {/* Filter Section */}
            <Paper sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
                <Tabs
                    value={selectedCategory}
                    onChange={(_, val) => setSelectedCategory(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 2,
                        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                        '& .MuiTab-root': { py: 3, fontWeight: 700, fontSize: '0.85rem' }
                    }}
                >
                    {CATEGORIES.map(cat => (
                        <Tab key={cat} label={cat} value={cat} />
                    ))}
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                <AnimatePresence mode="popLayout">
                    {filteredVideos.map((video, index) => {
                        const isPlaying = playingVideos[video.id];

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id} component={motion.div} layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 2,
                                    bgcolor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        transform: 'translateY(-4px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}>
                                    <Box sx={{ position: 'relative', bgcolor: '#000', height: 300, overflow: 'hidden' }}>
                                        {isPlaying ? (
                                            <video controls autoPlay width="100%" style={{ height: '100%', objectFit: 'cover' }}>
                                                <source src={video.url} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <>
                                                <CardMedia
                                                    component="video"
                                                    src={`${video.url}#t=0.1`}
                                                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                                    preload="metadata"
                                                />

                                                {/* Play Button Overlay */}
                                                <Box
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleVideoPlay(video.id);
                                                    }}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        bgcolor: alpha('#000', 0.4),
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s',
                                                        '&:hover': { bgcolor: alpha('#000', 0.5) }
                                                    }}
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0.8 }}
                                                        animate={{ scale: 1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        <PlayArrowRounded sx={{ fontSize: 64, color: '#fff', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }} />
                                                    </motion.div>
                                                </Box>
                                            </>
                                        )}

                                        {/* Category Badge */}
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            bgcolor: alpha('#000', 0.7),
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid',
                                            borderColor: alpha('#fff', 0.2),
                                            pointerEvents: 'none',
                                            zIndex: 2
                                        }}>
                                            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 800, fontSize: '0.7rem' }}>
                                                {video.category}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}>
                                            {video.title}
                                        </Typography>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<AnalyticsOutlined />}
                                            onClick={() => navigate('/analysis', {
                                                state: {
                                                    prefilledVideoUrl: video.url,
                                                    videoName: `${video.title.replace(/\s+/g, '_')}.mp4`,
                                                    isFromLibrary: true
                                                }
                                            })}
                                            sx={{ borderRadius: 2, py: 1.2, fontWeight: 700 }}
                                        >
                                            Predict Action
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </AnimatePresence>
            </Grid>
        </Box>
    );
};

export default VideoLibrary;