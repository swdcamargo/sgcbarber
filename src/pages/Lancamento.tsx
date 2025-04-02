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
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Tooltip,
    IconButton,
    Snackbar,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotesIcon from '@mui/icons-material/Notes';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BoltIcon from '@mui/icons-material/Bolt';
import PaymentIcon from '@mui/icons-material/Payment';

export default function Lancamento() {
    const [form, setForm] = useState({
        data: '',
        hora: '',
        cliente: '',
        servico: '',
        valor: '',
        descricao: '',
        formaPagamento: '',
    });
    const [lancamentos, setLancamentos] = useState<any[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const armazenados = JSON.parse(localStorage.getItem('lancamentos') || '[]');
        setLancamentos(armazenados);
    }, []);

    const formatarValor = (valor: string) => {
        const limpo = valor.replace(/\D/g, '');
        const numero = parseFloat(limpo) / 100;
        return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const name = e.target.name || '';
        const value = e.target.value;

        if (name === 'valor') {
            const formatado = formatarValor(value as string);
            setForm({ ...form, valor: formatado });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const atualizados = [...lancamentos];
            const valorNumerico = parseFloat(form.valor.replace(/[^\d,]/g, '').replace(',', '.'));
            const dados = { ...form, valor: valorNumerico };
            if (editIndex !== null) {
                atualizados[editIndex] = dados;
            } else {
                atualizados.push(dados);
            }
            setLancamentos(atualizados);
            localStorage.setItem('lancamentos', JSON.stringify(atualizados));
            setForm({ data: '', hora: '', cliente: '', servico: '', valor: '', descricao: '', formaPagamento: '' });
            setMostrarFormulario(false);
            setEditIndex(null);
            setLoading(false);
            setToast({ open: true, message: 'Lançamento salvo com sucesso!', severity: 'success' });
        }, 1000);
    };

    const handleEdit = (index: number) => {
        const item = lancamentos[index];
        setForm({ ...item, valor: item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) });
        setMostrarFormulario(true);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const filtrado = lancamentos.filter((_, i) => i !== index);
        setLancamentos(filtrado);
        localStorage.setItem('lancamentos', JSON.stringify(filtrado));
        setToast({ open: true, message: 'Lançamento excluído com sucesso!', severity: 'info' });
    };

    const getPagamentoColor = (tipo: string) => {
        switch (tipo) {
            case 'Dinheiro': return 'success';
            case 'Cartão de Crédito': return 'primary';
            case 'Cartão de Débito': return 'info';
            case 'Pix': return 'secondary';
            default: return 'default';
        }
    };

    const getPagamentoIcon = (tipo: string) => {
        switch (tipo) {
            case 'Dinheiro': return <MonetizationOnIcon fontSize="small" />;
            case 'Cartão de Crédito': return <CreditCardIcon fontSize="small" />;
            case 'Cartão de Débito': return <CreditScoreIcon fontSize="small" />;
            case 'Pix': return <BoltIcon fontSize="small" />;
            default: return <PaymentIcon fontSize="small" />;
        }
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

                <Typography variant="h4" mb={2}>Lançamentos</Typography>

                <Box mb={3}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setMostrarFormulario(!mostrarFormulario);
                            setForm({ data: '', hora: '', cliente: '', servico: '', valor: '', descricao: '', formaPagamento: '' });
                            setEditIndex(null);
                        }}
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                        {mostrarFormulario ? 'Fechar Cadastro' : 'Novo Lançamento'}
                    </Button>
                </Box>

                {mostrarFormulario && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Paper elevation={3} sx={{ p: 4, mb: 4, borderLeft: '6px solid #4f46e5' }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                {editIndex !== null ? 'Editar Lançamento' : 'Cadastrar Lançamento'}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <TextField label="Data" name="data" type="date" value={form.data} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
                                    <TextField label="Hora" name="hora" type="time" value={form.hora} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />

                                    <TextField
                                        label="Cliente"
                                        name="cliente"
                                        placeholder="Ex: João da Silva"
                                        value={form.cliente}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                                    />

                                    <TextField
                                        label="Serviço"
                                        name="servico"
                                        placeholder="Ex: Corte + Barba"
                                        value={form.servico}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{ startAdornment: <InputAdornment position="start"><MiscellaneousServicesIcon /></InputAdornment> }}
                                    />

                                    <TextField
                                        label="Valor"
                                        name="valor"
                                        placeholder="R$ 0,00"
                                        value={form.valor}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment> }}
                                    />

                                    <TextField
                                        label="Descrição"
                                        name="descricao"
                                        placeholder="Ex: Cliente preferencial, agendado com antecedência."
                                        value={form.descricao}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        minRows={2}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><NotesIcon /></InputAdornment> }}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel>Forma de Pagamento</InputLabel>
                                        <Select
                                            name="formaPagamento"
                                            value={form.formaPagamento}
                                            label="Forma de Pagamento"
                                            onChange={handleChange}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                                            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                                            <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                                            <MenuItem value="Pix">Pix</MenuItem>
                                            <MenuItem value="Outro">Outro</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 500 }} disabled={loading}>
                                        {loading ? <CircularProgress size={24} color="inherit" /> : editIndex !== null ? 'Atualizar' : 'Cadastrar'}
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </motion.div>
                )}

                <Typography variant="h6" gutterBottom>Visualização dos Lançamentos</Typography>

                <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: '#4f46e5' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>Data</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Hora</TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PersonIcon fontSize="small" /> <span>Cliente</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <MiscellaneousServicesIcon fontSize="small" /> <span>Serviço</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AttachMoneyIcon fontSize="small" /> <span>Valor</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }} align="center">
                                    <Chip size="small" label="Pagamento" sx={{ color: '#fff', backgroundColor: 'transparent' }} />
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <NotesIcon fontSize="small" /> <span>Descrição</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }} align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lancamentos.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{row.data}</TableCell>
                                    <TableCell>{row.hora}</TableCell>
                                    <TableCell>{row.cliente}</TableCell>
                                    <TableCell>{row.servico}</TableCell>
                                    <TableCell sx={{ color: 'secondary.main' }}>R$ {row.valor.toFixed(2).replace('.', ',')}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title={row.formaPagamento} arrow>
                                            <Chip
                                                icon={getPagamentoIcon(row.formaPagamento)}
                                                label={row.formaPagamento}
                                                color={getPagamentoColor(row.formaPagamento)}
                                                size="small"
                                                sx={{
                                                    minWidth: 120,
                                                    height: 28,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                    textTransform: 'capitalize',
                                                    letterSpacing: '0.3px',
                                                    pl: 1
                                                }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{row.descricao}</TableCell>
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
