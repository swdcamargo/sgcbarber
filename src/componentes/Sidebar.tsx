import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Box,
    useTheme,
    Stack,
    Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import { TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GroupIcon from '@mui/icons-material/Group'; // <- Ícone para Clientes
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // ícone recomendado




const drawerWidth = 240;

const navItems = [
    { name: 'Início', icon: HomeIcon, path: '/' },
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Faturamento', icon: PaymentsIcon, path: '/faturamento' },
    { name: 'Lançamento', icon: AddCircleIcon, path: '/lancamento' },
    { name: 'Clientes', icon: GroupIcon, path: '/clientes' },
    { name: 'Agendamento', icon: CalendarMonthIcon, path: '/agendamento' }, // <- Novo item
];

export default function Sidebar({
    open,
    toggleTheme,
    setOpen,
}: {
    open: boolean;
    toggleTheme: () => void;
    setOpen: (value: boolean) => void;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 72,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: open ? drawerWidth : 72,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
                    borderRight: `1px solid ${theme.palette.divider}`,
                },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    px: 2,
                }}
            >
                {open && <Typography variant="h6">Camargo Barbearia</Typography>}
                <IconButton onClick={() => setOpen(!open)} size="small">
                    {open ? (
                        <TbLayoutSidebarLeftCollapseFilled size={24} />
                    ) : (
                        <TbLayoutSidebarRightCollapseFilled size={24} />
                    )}
                </IconButton>


            </Toolbar>

            <Divider />

            <List>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const IconComponent = item.icon;
                    return (
                        <motion.div key={item.name} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                            <Tooltip title={open ? '' : item.name} placement="right">
                                <ListItemButton
                                    selected={isActive}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        my: 0.5,
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    <motion.div
                                        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2 : 'auto',
                                                justifyContent: 'center',
                                                color: isActive ? 'primary.main' : 'text.secondary',
                                            }}
                                        >
                                            <IconComponent />
                                        </ListItemIcon>
                                    </motion.div>
                                    {open && (
                                        <ListItemText
                                            primary={item.name}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 600 : 400,
                                                color: isActive ? 'primary.main' : 'text.primary',
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </motion.div>
                    );
                })}
            </List>

            <Divider />

            <Box mt="auto" p={2} textAlign="center">
                <Stack spacing={1} alignItems="center">
                    <IconButton onClick={toggleTheme}>
                        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Stack>
            </Box>
        </Drawer>
    );
}
