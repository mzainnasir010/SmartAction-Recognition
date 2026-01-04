import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Tooltip, alpha } from '@mui/material';
import { HomeOutlined, AnalyticsOutlined, GitHub, AutoAwesome } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Home', icon: <HomeOutlined />, path: '/' },
        { text: 'Analyze', icon: <AnalyticsOutlined />, path: '/analysis' },
    ];

    return (
        <Box
            component={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            sx={{
                width: 260,
                height: '100vh',
                bgcolor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1200,
            }}
        >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    component="img"
                    src="/logo.png"
                    alt="ActionAI Logo"
                    sx={{
                        width: 56,
                        height: 56,
                        objectFit: 'cover',
                    }}
                />


                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
                        ActionAI
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                        CNN-LSTM
                    </Typography>
                </Box>
            </Box>

            <Typography variant="overline" sx={{ px: 3, pt: 3, pb: 1, fontSize: '0.65rem', color: 'text.secondary' }}>
                NAVIGATION
            </Typography>

            <List sx={{ px: 1.5, flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 2,
                                    bgcolor: isActive ? alpha('#0ea5e9', 0.15) : 'transparent',
                                    border: isActive ? '1px solid' : '1px solid transparent',
                                    borderColor: isActive ? alpha('#0ea5e9', 0.3) : 'transparent',
                                    '&:hover': {
                                        bgcolor: alpha('#0ea5e9', 0.1),
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 36 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? 'primary.main' : 'text.primary',
                                        fontSize: '0.9rem',
                                    }}
                                />
                                {isActive && (
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            bgcolor: 'primary.main',
                                            boxShadow: (theme) => `0 0 8px 2px ${alpha(theme.palette.primary.main, 0.6)}`,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        p: 2.5,
                        borderRadius: 3,
                        bgcolor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                        Built by
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5 }}>
                        M. Zain Nasir
                    </Typography>
                    <Tooltip title="View on GitHub" arrow>
                        <IconButton
                            href="https://github.com/mzainnasir010"
                            target="_blank"
                            size="small"
                            sx={{
                                bgcolor: alpha('#0ea5e9', 0.1),
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                },
                            }}
                        >
                            <GitHub fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
