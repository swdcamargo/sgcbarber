import { ReactNode, useState } from 'react';
import Sidebar from '../componentes/Sidebar';
import { Box, Toolbar } from '@mui/material';

interface Props {
  children: ReactNode;
  toggleTheme: () => void;
}

export default function Layout({ children, toggleTheme }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar open={open} toggleTheme={toggleTheme} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}