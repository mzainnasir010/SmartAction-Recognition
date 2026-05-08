import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Chip, alpha } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Header = ({ toggleTheme, mode }) => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            component={motion.header}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: 1.5, display: { xs: 'none', sm: 'block' } }}
                    >
                        SYSTEM DASHBOARD
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s',
                        '&:hover': { 
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            borderColor: 'primary.main',
                            transform: 'rotate(15deg)'
                        },
                    }}
                >
                    {mode === 'dark' ? (
                        <LightModeOutlined fontSize="small" sx={{ color: 'primary.main' }} />
                    ) : (
                        <DarkModeOutlined fontSize="small" sx={{ color: 'primary.main' }} />
                    )}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

Header.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['light', 'dark']).isRequired,
};
