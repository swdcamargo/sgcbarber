import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Snackbar,
    CircularProgress,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import RepeatIcon from '@mui/icons-material/Repeat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Clientes() {
    const [form, setForm] = useState({
        nome: '',
        telefone: '',
        mensalista: 'não',
        tipo: '',
    });

    const [clientes, setClientes] = useState<any[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const armazenados = JSON.parse(localStorage.getItem('clientes') || '[]');
        setClientes(armazenados);
    }, []);

    const formatarTelefone = (valor: string) => {
        const somenteNumeros = valor.replace(/\D/g, '');
        if (somenteNumeros.length <= 10) {
            return somenteNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
        }
        return somenteNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name as string]: name === 'telefone' ? formatarTelefone(value as string) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const atualizados = [...clientes];
            if (editIndex !== null) {
                atualizados[editIndex] = form;
            } else {
                atualizados.push(form);
            }
            setClientes(atualizados);
            localStorage.setItem('clientes', JSON.stringify(atualizados));
            setForm({ nome: '', telefone: '', mensalista: 'não', tipo: '' });
            setMostrarFormulario(false);
            setEditIndex(null);
            setLoading(false);
            setToast({ open: true, message: 'Cliente salvo com sucesso!', severity: 'success' });
        }, 1000);
    };

    const handleEdit = (index: number) => {
        setForm(clientes[index]);
        setMostrarFormulario(true);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const filtrado = clientes.filter((_, i) => i !== index);
        setClientes(filtrado);
        localStorage.setItem('clientes', JSON.stringify(filtrado));
        setToast({ open: true, message: 'Cliente excluído com sucesso!', severity: 'info' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <Box>
                <Snackbar
                    open={toast.open}
                    autoHideDuration={3000}
                    onClose={() => setToast({ ...toast, open: false })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MuiAlert elevation={6} variant="filled" severity={toast.severity as any}>
                        {toast.message}
                    </MuiAlert>
                </Snackbar>

                <Typography variant="h4" mb={2}>Clientes</Typography>

                <Box mb={3}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setMostrarFormulario(!mostrarFormulario);
                            setForm({ nome: '', telefone: '', mensalista: 'não', tipo: '' });
                            setEditIndex(null);
                        }}
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                        {mostrarFormulario ? 'Fechar Cadastro' : 'Novo Cliente'}
                    </Button>
                </Box>

                {mostrarFormulario && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Paper elevation={3} sx={{ p: 4, mb: 4, borderLeft: '6px solid #4f46e5' }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                {editIndex !== null ? 'Editar Cliente' : 'Cadastrar Cliente'}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Nome completo"
                                        name="nome"
                                        value={form.nome}
                                        onChange={handleChange}
                                        placeholder="Ex: João da Silva"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <TextField
                                        label="Telefone"
                                        name="telefone"
                                        value={form.telefone}
                                        onChange={handleChange}
                                        placeholder="(11) 91234-5678"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel>Mensalista</InputLabel>
                                        <Select
                                            name="mensalista"
                                            value={form.mensalista}
                                            label="Mensalista"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="sim">Sim</MenuItem>
                                            <MenuItem value="não">Não</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel>Tipo de Cliente</InputLabel>
                                        <Select
                                            name="tipo"
                                            value={form.tipo}
                                            label="Tipo de Cliente"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Semanal">Semanal</MenuItem>
                                            <MenuItem value="Quinzenal">Quinzenal</MenuItem>
                                            <MenuItem value="Mensal">Mensal</MenuItem>
                                            <MenuItem value="Turista">Turista</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ textTransform: 'none', fontWeight: 500 }}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : editIndex !== null ? 'Atualizar' : 'Cadastrar'}
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </motion.div>
                )}

                <Typography variant="h6" gutterBottom>
                    Visualização dos Clientes
                </Typography>

                <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: '#4f46e5' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PersonIcon fontSize="small" />
                                        <span>Nome</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PhoneIcon fontSize="small" />
                                        <span>Telefone</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        ✅
                                        <span>Mensalista</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <RepeatIcon fontSize="small" />
                                        <span>Frequência</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }} align="center">
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((cliente, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{cliente.nome}</TableCell>
                                    <TableCell>{cliente.telefone}</TableCell>
                                    <TableCell>
                                        {cliente.mensalista === 'sim' ? (
                                            <CheckCircleIcon color="success" fontSize="small" />
                                        ) : (
                                            <CancelIcon color="error" fontSize="small" />
                                        )}
                                    </TableCell>
                                    <TableCell>{cliente.tipo}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton onClick={() => handleEdit(index)} color="primary">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton onClick={() => handleDelete(index)} color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </motion.div>
    );
}
