import { Box, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from 'recharts';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { motion } from 'framer-motion';

dayjs.extend(weekOfYear);

export default function Dashboard() {
    const [dados, setDados] = useState<any[]>([]);
    const [tipoGrafico, setTipoGrafico] = useState<'barra' | 'linha'>('barra');

    useEffect(() => {
        const lancamentos = JSON.parse(localStorage.getItem('lancamentos') || '[]');
        const agrupado: Record<string, number> = {};
        lancamentos.forEach((item: any) => {
            agrupado[item.data] = (agrupado[item.data] || 0) + parseFloat(item.valor);
        });
        const grafico = Object.entries(agrupado).map(([data, valor]) => ({ data, valor }));
        setDados(grafico);
    }, []);

    const total = dados.reduce((acc, item) => acc + item.valor, 0);
    const mediaDiaria = dados.length ? total / dados.length : 0;

    const dadosComData = dados.map((d) => ({ ...d, week: dayjs(d.data).week(), month: dayjs(d.data).month() }));
    const semanasUnicas = [...new Set(dadosComData.map((d) => d.week))];
    const mesesUnicos = [...new Set(dadosComData.map((d) => d.month))];
    const mediaSemanal = semanasUnicas.length ? total / semanasUnicas.length : 0;
    const mediaMensal = mesesUnicos.length ? total / mesesUnicos.length : 0;

    const COLORS = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#14b8a6'];
    const cardStyles = [
        '#4f46e5', // Indigo
        '#10b981', // Green
        '#f59e0b', // Amber
        '#ef4444', // Red
    ];

    return (
        <Box>
            <Typography variant="h4" mb={3}>Dashboard</Typography>

            {/* Cards de resumo */}
            <Box display="flex" gap={2} mb={4} flexWrap="wrap">
                {[{
                    label: 'Total Geral',
                    valor: total,
                }, {
                    label: 'Média por Dia',
                    valor: mediaDiaria,
                }, {
                    label: 'Média Semanal',
                    valor: mediaSemanal,
                }, {
                    label: 'Média Mensal',
                    valor: mediaMensal,
                }].map((item, index) => (
                    <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ flex: 1, minWidth: 200 }}
                    >
                        <Paper sx={{ p: 2, backgroundColor: cardStyles[index % cardStyles.length], color: '#fff' }}>
                            <Typography variant="subtitle2">{item.label}</Typography>
                            <Typography variant="h6">R$ {item.valor.toFixed(2)}</Typography>
                        </Paper>
                    </motion.div>
                ))}
            </Box>

            {/* Seletor de gráfico */}
            <FormControl sx={{ mb: 2, minWidth: 200 }}>
                <InputLabel>Tipo de Gráfico</InputLabel>
                <Select value={tipoGrafico} label="Tipo de Gráfico" onChange={(e) => setTipoGrafico(e.target.value as any)}>
                    <MenuItem value="barra">Gráfico de Barras</MenuItem>
                    <MenuItem value="linha">Gráfico de Linha</MenuItem>
                </Select>
            </FormControl>

            {/* Gráfico de barras ou linha */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Faturamento por Dia</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    {tipoGrafico === 'barra' ? (
                        <BarChart data={dados} margin={{ top: 16, right: 24, bottom: 0, left: -16 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <LineChart data={dados}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="valor" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </Paper>

            {/* Gráfico de Pizza */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Distribuição Geral</Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={dados}
                            dataKey="valor"
                            nameKey="data"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {dados.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
}