import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const Layout = ({ toggleTheme, mode }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <CssBaseline />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: '260px' },
                    width: { xs: '100%', md: `calc(100% - 260px)` },
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Header toggleTheme={toggleTheme} mode={mode} />
                <Container maxWidth="lg" sx={{ flex: 1, px: { xs: 2, md: 4 } }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;

Layout.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['light', 'dark']).isRequired,
};
