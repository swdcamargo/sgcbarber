import dayjs from 'dayjs';

export function gerarDiasDoMes(mesIndex: number) {
    const dias = [];
    const hoje = dayjs();
    const inicio = dayjs().month(mesIndex).startOf('month');
    const diasNoMes = inicio.daysInMonth();

    for (let i = 0; i < diasNoMes; i++) {
        const dia = inicio.add(i, 'day');
        if (dia.isSameOrAfter(hoje, 'day')) {
            dias.push(dia);
        }
    }

    return dias;
}
