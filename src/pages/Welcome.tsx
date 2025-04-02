import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { RocketIcon, CalendarDaysIcon, DollarSignIcon, UsersIcon } from 'lucide-react';

const cardData = [
    {
        icon: <RocketIcon size={28} />,
        title: 'Dashboard',
        description: 'Tela com gráficos atualizados diariamente, mostrando entradas e saídas por período.',
        extra: 'Inclui média diária, semanal e mensal do faturamento.',
        color: '#6366f1'
    },
    {
        icon: <CalendarDaysIcon size={28} />,
        title: 'Lançamentos',
        description: 'Cadastro completo com data, hora, cliente, serviço, valor, forma de pagamento e descrição.',
        extra: 'Permite visualizar, editar e excluir os lançamentos realizados.',
        color: '#0ea5e9'
    },
    {
        icon: <DollarSignIcon size={28} />,
        title: 'Faturamento',
        description: 'Controle diário, semanal, mensal e anual dos valores recebidos na barbearia.',
        extra: 'Visualize totais com gráficos de barras, linhas e pizza de forma clara.',
        color: '#10b981'
    },
    {
        icon: <UsersIcon size={28} />,
        title: 'Experiência',
        description: 'Interface moderna com animações suaves, tema escuro, toasts e responsividade.',
        extra: 'Utilização de Material UI, Framer Motion e HeroUI para máxima usabilidade.',
        color: '#f59e0b'
    },
];

export default function Welcome() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh" px={2} py={6}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Bem-vindo ao Sistema Camargo Barbearia
                </Typography>

                <Typography variant="body1" mb={4} textAlign="center" maxWidth={600}>
                    Esse sistema foi desenvolvido para facilitar o gerenciamento financeiro da sua barbearia.
                    Utilize o menu lateral para acessar os recursos disponíveis.
                </Typography>

                <Grid container spacing={3} maxWidth={960} justifyContent="center">
                    {cardData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index} display="flex" justifyContent="center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                style={{ width: '100%', maxWidth: 360 }}
                            >
                                <Paper
                                    elevation={4}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        borderLeft: `6px solid ${item.color}`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        minHeight: 200,
                                        bgcolor: isDark ? 'grey.900' : 'background.paper',
                                        color: isDark ? 'grey.100' : 'text.primary'
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                                        {item.icon}
                                        <Typography variant="h6">{item.title}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" mt={1}>
                                        {item.extra}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box component="footer" py={3} textAlign="center" bgcolor={isDark ? 'grey.900' : '#f9fafb'} borderTop="1px solid" borderColor={isDark ? 'grey.800' : '#e5e7eb'}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Controle de Faturamento • Desenvolvido por Sidwanderson Camargo Santos
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Projeto acadêmico - Engenharia de Software
                </Typography>
            </Box>
        </motion.div>
    );
}
