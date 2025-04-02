import {
    Box,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import dayjs from 'dayjs';
import MesSelector from '../componentes/MesSelector';
import DiaSelector from '../componentes/DiaSelector';
import HorarioSelector from '../componentes/HorarioSelector';
import ListaAgendamentos from '../componentes/ListaAgendamentos';
import AgendamentoDialog from '../componentes/AgendamentoDialog';

const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const horarios = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function AgendamentoPage() {
    const hoje = dayjs();
    const [mesSelecionado, setMesSelecionado] = useState<number>(hoje.month());
    const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cliente, setCliente] = useState({ nome: '', telefone: '' });
    const [agendamentos, setAgendamentos] = useState<any[]>(() => {
        const armazenados = localStorage.getItem('agendamentos');
        return armazenados ? JSON.parse(armazenados) : [];
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const estaAgendado = (dia: string | null, hora: string) => {
        return agendamentos.some(a => a.dia === dia && a.hora === hora);
    };

    const handleAgendarClick = (hora: string) => {
        setHorarioSelecionado(hora);
        setDialogOpen(true);
    };

    const handleSalvarAgendamento = () => {
        const dados = { dia: diaSelecionado, hora: horarioSelecionado, ...cliente };
        const atualizados = [...agendamentos];
        if (editIndex !== null) {
            atualizados[editIndex] = dados;
        } else {
            atualizados.push(dados);
        }
        atualizados.sort((a, b) => dayjs(`${a.dia}T${a.hora}`).diff(dayjs(`${b.dia}T${b.hora}`)));
        setAgendamentos(atualizados);
        setDialogOpen(false);
        setCliente({ nome: '', telefone: '' });
        setHorarioSelecionado(null);
        setEditIndex(null);
    };

    const handleEditar = (index: number) => {
        const item = agendamentos[index];
        setCliente({ nome: item.nome, telefone: item.telefone });
        setDiaSelecionado(item.dia);
        setHorarioSelecionado(item.hora);
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleExcluir = (index: number) => {
        const filtrado = agendamentos.filter((_, i) => i !== index);
        setAgendamentos(filtrado);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <Box>
                <Typography variant="h4" mb={3}>Agendamentos</Typography>

                <Typography variant="h6" gutterBottom>Selecione um mês</Typography>
                <MesSelector
                    meses={meses}
                    mesSelecionado={mesSelecionado}
                    setMesSelecionado={setMesSelecionado}
                    limparDiaSelecionado={() => setDiaSelecionado(null)}
                />

                <DiaSelector mesSelecionado={mesSelecionado} diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} />
                <HorarioSelector diaSelecionado={diaSelecionado} horarios={horarios} estaAgendado={estaAgendado} handleAgendarClick={handleAgendarClick} />
                <ListaAgendamentos agendamentos={agendamentos} onEditar={handleEditar} onExcluir={handleExcluir} />
                <AgendamentoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} cliente={cliente} setCliente={setCliente} diaSelecionado={diaSelecionado} horarioSelecionado={horarioSelecionado} onSave={handleSalvarAgendamento} />
            </Box>
        </motion.div>
    );
}
