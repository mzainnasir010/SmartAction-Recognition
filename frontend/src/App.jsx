import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getTheme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout toggleTheme={toggleTheme} mode={mode} />}>
            <Route index element={<Home />} />
            <Route path="analysis" element={<Analysis />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
