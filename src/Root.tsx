import { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App toggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
