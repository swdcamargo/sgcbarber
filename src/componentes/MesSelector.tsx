import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion } from 'framer-motion';

interface MesSelectorProps {
    meses: string[];
    mesSelecionado: number;
    setMesSelecionado: (index: number) => void;
    limparDiaSelecionado: () => void;
}

export default function MesSelector({
    meses,
    mesSelecionado,
    setMesSelecionado,
    limparDiaSelecionado
}: MesSelectorProps) {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newMes: number
    ) => {
        if (newMes !== null) {
            setMesSelecionado(newMes);
            limparDiaSelecionado();
        }
    };

    return (
        <Box mb={3}>
            <ToggleButtonGroup
                value={mesSelecionado}
                exclusive
                onChange={handleChange}
                aria-label="Selecionar mês"
                fullWidth
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3
                }}
            >
                {meses.map((mes, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ width: '100%' }}
                    >
                        <ToggleButton
                            value={index}
                            sx={{
                                width: '100%',
                                height: 70,
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: 0,
                                borderTop: mesSelecionado === index ? '4px solid #4f46e5' : '4px solid transparent',
                                backgroundColor: mesSelecionado === index ? 'primary.main' : 'background.paper',
                                color: mesSelecionado === index ? '#fff' : 'text.primary',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    backgroundColor: mesSelecionado === index ? 'primary.dark' : 'primary.light',
                                },
                            }}
                        >
                            {mes}
                        </ToggleButton>
                    </motion.div>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
}
