import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface AgendamentoDialogProps {
    open: boolean;
    onClose: () => void;
    cliente: { nome: string; telefone: string };
    setCliente: (cliente: { nome: string; telefone: string }) => void;
    diaSelecionado: string | null;
    horarioSelecionado: string | null;
    onSave: () => void;
}

export default function AgendamentoDialog({ open, onClose, cliente, setCliente, diaSelecionado, horarioSelecionado, onSave }: AgendamentoDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agendar Horário</DialogTitle>
            <DialogContent>
                <Typography variant="body2" gutterBottom>
                    {dayjs(diaSelecionado).format('DD/MM/YYYY')} às {horarioSelecionado}
                </Typography>
                <TextField
                    label="Nome do Cliente"
                    value={cliente.nome}
                    onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Telefone"
                    value={cliente.telefone}
                    onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={onSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}