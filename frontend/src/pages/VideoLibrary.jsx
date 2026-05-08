import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, Card, CardMedia, CardContent, Button, Chip, alpha, Stack, Tab, Tabs, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsOutlined, PlayArrowRounded, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VIDEO_DATA = [
  // Basketball (kept constant as requested)
  {
    id: 1,
    title: 'Three Pointer Practice',
    category: 'Basketball',
    url: 'https://www.youtube.com/watch?v=daq9kfjQl7U'
  },

  {
    id: 2,
    title: 'Street Ball Dunk',
    category: 'Basketball',
    url: 'https://www.youtube.com/watch?v=tXTVydpaxEA'
  },

  {
    id: 3,
    title: 'Strike Shot',
    category: 'Bowling',
    url: 'https://www.youtube.com/watch?v=RyXJbWsm-S4'
  },

  // Updated Remaining Links

  {
    id: 4,
    title: 'Perfect Golf Swing',
    category: 'Golf Swing',
    url: 'https://www.youtube.com/watch?v=xvMiZQo70-E'
  },

  {
    id: 5,
    title: 'Tennis Serve',
    category: 'Tennis Swing',
    url: 'https://www.youtube.com/watch?v=UGQ6d5VTcv8'
  },

  {
    id: 6,
    title: 'Drum Solo',
    category: 'Drumming',
    url: 'https://www.youtube.com/watch?v=FssULNGSZIA'
  },

  {
    id: 7,
    title: 'Military Push Ups',
    category: 'Push Ups',
    url: 'https://www.youtube.com/watch?v=IODxDxX7oi4'
  },

  {
    id: 8,
    title: 'Pull Up Strength',
    category: 'Pull Ups',
    url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
  },

  {
    id: 9,
    title: 'Jumping Jack Cardio',
    category: 'Jumping Jack',
    url: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8'
  }
];

const CATEGORIES = ['All', 'Basketball', 'Bowling', 'Golf Swing', 'Tennis Swing', 'Drumming', 'Push Ups', 'Pull Ups', 'Jumping Jack'];

const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

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
                        const ytId = getYouTubeID(video.url);
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
                                    borderRadius: 4,
                                    bgcolor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        transform: 'translateY(-4px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}>
                                    <Box sx={{ position: 'relative', bgcolor: '#000', height: 220, overflow: 'hidden' }}>
                                        {isPlaying && ytId ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <>
                                                {ytId ? (
                                                    <Box
                                                        component="img"
                                                        src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => { e.target.src = `https://img.youtube.com/vi/${ytId}/0.jpg`; }}
                                                    />
                                                ) : (
                                                    <CardMedia
                                                        component="video"
                                                        src={video.url}
                                                        sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                                        muted
                                                        loop
                                                        playsInline
                                                        preload="metadata"
                                                    />
                                                )}
                                                
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
                                            Test AI Model
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