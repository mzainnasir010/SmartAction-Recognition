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
                        variant="body1"
                        sx={{ fontWeight: 600, color: 'text.primary', display: { xs: 'none', sm: 'block' } }}
                    >
                        Action Recognition
                    </Typography>
                    <Chip
                        label="BETA"
                        size="small"
                        sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            bgcolor: alpha('#0ea5e9', 0.15),
                            color: 'primary.main',
                            border: '1px solid',
                            borderColor: alpha('#0ea5e9', 0.3),
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { bgcolor: alpha('#0ea5e9', 0.1) },
                    }}
                >
                    {mode === 'dark' ? (
                        <LightModeOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                    ) : (
                        <DarkModeOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
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
