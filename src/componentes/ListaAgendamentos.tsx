import {
    Paper,
    Stack,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import dayjs from 'dayjs';

interface Agendamento {
    nome: string;
    telefone: string;
    dia: string;
    hora: string;
}

interface Props {
    agendamentos: Agendamento[];
    onEditar: (index: number) => void;
    onExcluir: (index: number) => void;
}

export default function ListaAgendamentos({ agendamentos, onEditar, onExcluir }: Props) {
    if (agendamentos.length === 0) return null;

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
                Visualização Geral de Agendamentos
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2}>
                {agendamentos.map((ag, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 3,
                            borderLeft: '6px solid #4f46e5',
                            borderRadius: 3,
                            transition: '0.3s ease',
                            '&:hover': { boxShadow: 4 }
                        }}
                        variant="outlined"
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <div className="flex gap-4 items-center">
                                <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                </div>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        <strong>Nome:</strong> {ag.nome}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                                        <EventIcon fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Data:</strong> {dayjs(ag.dia).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AccessTimeIcon fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Hora:</strong> {ag.hora}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PhoneIcon fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Telefone:</strong> {ag.telefone}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                                <IconButton color="primary" onClick={() => onEditar(index)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton color="error" onClick={() => onExcluir(index)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Paper>
    );
}
