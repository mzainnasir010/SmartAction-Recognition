import { createTheme, alpha } from '@mui/material/styles';

export const getTheme = (mode) => {
    const isDark = mode === 'dark';

    const palette = {
        primary: '#0ea5e9',      // Sky 500 - Electric Cyan
        success: '#10b981',      // Emerald 500
        warning: '#f59e0b',      // Amber 500
        error: '#ef4444',        // Red 500
    };

    return createTheme({
        palette: {
            mode,
            primary: {
                main: palette.primary,
                contrastText: '#ffffff',
            },
            secondary: {
                main: isDark ? '#94a3b8' : '#64748b', // Slate 400 / 500
            },
            background: {
                default: isDark ? '#0f172a' : '#f8fafc', // Slate 900 / Slate 50
                paper: isDark ? '#1e293b' : '#ffffff',   // Slate 800 / White
            },
            text: {
                primary: isDark ? '#f1f5f9' : '#0f172a',   // Slate 100 / Slate 900
                secondary: isDark ? '#94a3b8' : '#64748b', // Slate 400 / Slate 500
            },
            divider: isDark ? '#334155' : '#e2e8f0', // Slate 700 / Slate 200
            success: { main: palette.success },
            warning: { main: palette.warning },
            error: { main: palette.error },
        },
        typography: {
            fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
            h1: { fontWeight: 700, letterSpacing: '-0.02em' },
            h2: { fontWeight: 700, letterSpacing: '-0.02em' },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
            button: { fontWeight: 500, letterSpacing: '0.02em' },
            overline: { fontWeight: 600, letterSpacing: '0.1em' },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                        color: isDark ? '#f1f5f9' : '#0f172a',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? alpha('#0f172a', 0.8) : alpha('#ffffff', 0.8),
                        backdropFilter: 'blur(12px)',
                        borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                        boxShadow: 'none',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '10px 20px',
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                    contained: {
                        boxShadow: `0 4px 14px 0 ${alpha(palette.primary, 0.4)}`,
                        '&:hover': {
                            boxShadow: `0 6px 20px 0 ${alpha(palette.primary, 0.5)}`,
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        fontWeight: 500,
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
        },
    });
};
