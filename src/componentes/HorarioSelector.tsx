import { Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

interface Props {
    diaSelecionado: string | null;
    horarios: string[];
    estaAgendado: (dia: string | null, hora: string) => boolean;
    handleAgendarClick: (hora: string) => void;
}

export default function HorarioSelector({
    diaSelecionado,
    horarios,
    estaAgendado,
    handleAgendarClick
}: Props) {
    if (!diaSelecionado) return null;

    return (
        <>
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mt: 4, mb: 2 }}>
                Horários disponíveis para {dayjs(diaSelecionado).format('DD/MM/YYYY')}
            </Typography>

            <Grid container spacing={3}>
                {horarios.map((hora) => {
                    const agendado = estaAgendado(diaSelecionado, hora);

                    return (
                        <Grid item key={hora} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <motion.div whileHover={{ scale: agendado ? 1 : 1.08 }} whileTap={{ scale: agendado ? 1 : 0.95 }}>
                                <Paper
                                    elevation={agendado ? 1 : 4}
                                    sx={{
                                        aspectRatio: '1 / 1',
                                        width: '100%',
                                        maxWidth: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        borderRadius: 6,
                                        fontSize: '1.6rem',
                                        fontWeight: 700,
                                        letterSpacing: 1,
                                        cursor: agendado ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        boxShadow: agendado ? 1 : 3,
                                        bgcolor: agendado ? 'action.disabledBackground' : 'background.paper',
                                        color: agendado ? 'text.disabled' : 'text.primary',
                                        border: agendado ? '1px solid' : '2px solid',
                                        borderColor: agendado ? 'divider' : 'divider',
                                        textDecoration: agendado ? 'line-through' : 'none',
                                        '&:hover': {
                                            boxShadow: agendado ? 1 : 6,
                                            transform: agendado ? 'none' : 'scale(1.18)',
                                        },
                                    }}
                                    onClick={() => {
                                        if (!agendado) handleAgendarClick(hora);
                                    }}
                                >
                                    {hora}
                                </Paper>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}