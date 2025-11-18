export function getDiasUteis(mes: number, ano: number): number {
  let count = 0;
  const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();

  for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
    const data = new Date(ano, mes - 1, dia); // JS conta meses a partir do 0
    const diaDaSemana = data.getDay(); // 0 = domingo, 6 = sábado

    if (diaDaSemana !== 0 && diaDaSemana !== 6) {
      count++;
    }
  }

  return count;
}