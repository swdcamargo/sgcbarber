import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Paper,
    Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { motion } from 'framer-motion';

// Ativa plugins do dayjs
import 'dayjs/locale/pt-br';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('pt-br');

export default function Faturamento() {
    const [periodo, setPeriodo] = useState('diario');
    const [dadosFaturamento, setDadosFaturamento] = useState<any[]>([]);
    const hoje = dayjs();

    useEffect(() => {
        const armazenados = JSON.parse(localStorage.getItem('lancamentos') || '[]');
        setDadosFaturamento(armazenados);
    }, [periodo]);

    const filtrarPorPeriodo = () => {
        return dadosFaturamento.filter((item: any) => {
            const data = dayjs(item.data);
            switch (periodo) {
                case 'diario':
                    return data.isSame(hoje, 'day');
                case 'semanal':
                    return data.isSame(hoje, 'week');
                case 'mensal':
                    return data.isSame(hoje, 'month');
                case 'anual':
                    return data.isSame(hoje, 'year');
                default:
                    return true;
            }
        });
    };

    const total = filtrarPorPeriodo().reduce((acc: number, item: any) => acc + Number(item.valor), 0);

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Typography variant="h4" gutterBottom>
                    Faturamento
                </Typography>
            </motion.div>

            <ToggleButtonGroup
                value={periodo}
                exclusive
                onChange={(_, value) => value && setPeriodo(value)}
                sx={{ mb: 3 }}
            >
                <ToggleButton value="diario">Diário</ToggleButton>
                <ToggleButton value="semanal">Semanal</ToggleButton>
                <ToggleButton value="mensal">Mensal</ToggleButton>
                <ToggleButton value="anual">Anual</ToggleButton>
            </ToggleButtonGroup>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', boxShadow: 2 }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        Total {periodo}: R$ {total.toFixed(2)}
                    </Typography>
                </Paper>
            </motion.div>
        </Box>
    );
}
