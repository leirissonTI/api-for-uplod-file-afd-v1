/**
 * Formata uma data conforme o formato desejado.
 * @param data - Pode ser string, Date ou timestamp
 * @param formato - Exemplos: 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/YYYY', 'HH:mm:ss'
 * @returns string - Data formatada
 */
export function formatarData(data: string | Date | number, formato: string = 'YYYY-MM-DD'): string {
    const d = new Date(data);

    if (Number.isNaN(d.getTime())) {
        throw new Error(`Data inválida: ${data}`);
    }

    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0'); // Meses são 0-based
    const dia = String(d.getDate()).padStart(2, '0');
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    const segundos = String(d.getSeconds()).padStart(2, '0');

    return formato
        .replace('YYYY', ano.toString())
        .replace('MM', mes)
        .replace('DD', dia)
        .replace('HH', horas)
        .replace('mm', minutos)
        .replace('ss', segundos);
}