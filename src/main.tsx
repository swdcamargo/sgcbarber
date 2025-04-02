import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';

const Root = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4f46e5', // Indigo
          },
          secondary: {
            main: '#f59e0b', // Amber
          },
          background: {
            default: mode === 'light' ? '#f9fafb' : '#0f172a',
            paper: mode === 'light' ? '#fff' : '#1e293b',
          },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App toggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);