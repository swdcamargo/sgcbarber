import { Grid, Paper } from '@mui/material'; // ✅ CORRETO para MUI atual
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // ⮆️ importante!
dayjs.extend(utc);

interface DiaSelectorProps {
    mesSelecionado: number;
    diaSelecionado: string | null;
    setDiaSelecionado: (dia: string) => void;
}

export default function DiaSelector({
    mesSelecionado,
    diaSelecionado,
    setDiaSelecionado
}: DiaSelectorProps) {
    const hoje = dayjs();
    const inicio = dayjs().month(mesSelecionado).startOf('month');
    const diasNoMes = inicio.daysInMonth();

    const dias = [];
    for (let i = 0; i < diasNoMes; i++) {
        const dia = inicio.add(i, 'day');
        if (dia.isSameOrAfter(hoje, 'day')) dias.push(dia);
    }

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {dias.map((dia) => {
                const diaFormatado = dia.format('YYYY-MM-DD');
                const isSelected = diaSelecionado === diaFormatado;

                return (
                    <Grid item key={diaFormatado} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                            <Paper
                                elevation={isSelected ? 8 : 2}
                                sx={{
                                    aspectRatio: '1 / 1',
                                    width: '100%',
                                    maxWidth: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: isSelected ? 'primary.main' : 'background.paper',
                                    color: isSelected ? '#fff' : 'text.primary',
                                    borderRadius: 2,
                                    boxShadow: isSelected ? 6 : 2,
                                    border: isSelected ? '2px solid #4f46e5' : '1px solid #e0e0e0',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        boxShadow: 8,
                                        transform: 'scale(1.18)',
                                    },
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    boxSizing: 'border-box',
                                }}
                                onClick={() => setDiaSelecionado(diaFormatado)}
                            >
                                {dia.format('DD/MM')}
                            </Paper>
                        </motion.div>
                    </Grid>
                );
            })}
        </Grid>
    );
}