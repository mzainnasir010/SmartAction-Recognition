import { createTheme, alpha } from '@mui/material/styles';

export const getTheme = (mode) => {
    const isDark = mode === 'dark';

    const palette = {
        primary: isDark ? '#ffffff' : '#000000',
        secondary: isDark ? '#888888' : '#555555',
        success: '#22c55e',
        warning: '#eab308',
        error: '#3b82f6',
        background: {
            default: isDark ? '#000000' : '#ffffff',
            paper:   isDark ? '#0a0a0a' : '#fafafa',
            surface: isDark ? '#111111' : '#f3f3f3',
        },
    };

    return createTheme({
        palette: {
            mode,
            primary:    { main: palette.primary,    contrastText: isDark ? '#000' : '#fff' },
            secondary:  { main: palette.secondary },
            background: { default: palette.background.default, paper: palette.background.paper },
            text: {
                primary:   isDark ? '#ededed' : '#111111',
                secondary: isDark ? '#888888' : '#555555',
            },
            divider:  isDark ? '#1a1a1a' : '#e5e5e5',
            success:  { main: palette.success },
            warning:  { main: palette.warning },
            error:    { main: palette.error },
        },
        typography: {
            fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            h1: { fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.1 },
            h2: { fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15 },
            h3: { fontWeight: 600, letterSpacing: '-0.03em' },
            h4: { fontWeight: 600, letterSpacing: '-0.02em' },
            h5: { fontWeight: 500 },
            h6: { fontWeight: 500 },
            button: { fontWeight: 500, letterSpacing: '0em', textTransform: 'none', fontSize: '0.875rem' },
            body1:  { lineHeight: 1.6, fontSize: '0.9375rem' },
            body2:  { lineHeight: 1.5, fontSize: '0.8125rem', color: isDark ? '#888' : '#555' },
        },
        shape: { borderRadius: 8 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: palette.background.default,
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            background: isDark ? '#2a2a2a' : '#d4d4d4',
                            borderRadius: '6px',
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? alpha('#000000', 0.7) : alpha('#ffffff', 0.7),
                        backdropFilter: 'blur(16px) saturate(180%)',
                        borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#e5e5e5'}`,
                        boxShadow: 'none',
                        color: isDark ? '#ededed' : '#111111',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '8px 20px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'all 0.15s ease',
                    },
                    containedPrimary: {
                        backgroundColor: palette.primary,
                        color: isDark ? '#000' : '#fff',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: isDark ? '#e0e0e0' : '#222222',
                            boxShadow: 'none',
                            transform: 'none',
                        },
                    },
                    outlined: {
                        borderColor: isDark ? '#2a2a2a' : '#e0e0e0',
                        '&:hover': {
                            borderColor: isDark ? '#555' : '#aaa',
                            backgroundColor: isDark ? alpha('#fff', 0.04) : alpha('#000', 0.04),
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        backgroundColor: palette.background.paper,
                        border: `1px solid ${isDark ? '#1a1a1a' : '#e5e5e5'}`,
                        boxShadow: isDark
                            ? '0 1px 3px rgba(0,0,0,0.6)'
                            : '0 1px 3px rgba(0,0,0,0.06)',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        backgroundColor: palette.background.paper,
                        border: `1px solid ${isDark ? '#1a1a1a' : '#e5e5e5'}`,
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: isDark ? '#333' : '#ccc',
                        },
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: { borderColor: isDark ? '#1a1a1a' : '#e5e5e5' },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        backgroundColor: isDark ? '#111' : '#f0f0f0',
                        border: `1px solid ${isDark ? '#2a2a2a' : '#e0e0e0'}`,
                        color: isDark ? '#ededed' : '#111111',
                    },
                },
            },
        },
    });
};