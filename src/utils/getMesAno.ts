
export function getMesAnoDB(dataStr: string): { mes: number; ano: number } {
    const partes = dataStr.split('/').map(p => p.trim());

    if (partes.length < 2 || partes.some(p => isNaN(Number(p)))) {
        throw new Error(`Formato inválido: "${dataStr}". Esperado "MM/YYYY" ou "DD/MM/YYYY".`);
    }

    const [mes, diaOuAno] = partes;

    let ano: number;
    if (partes.length === 2) {
        // Formato: MM/YYYY
        ano = Number(diaOuAno);
    } else {
        // Formato: DD/MM/YYYY
        ano = Number(partes[2]);
    }

    const numeroMes = Number(mes);
    if (numeroMes < 1 || numeroMes > 12) {
        throw new Error(`Mês inválido: ${numeroMes}. Deve estar entre 01 e 12.`);
    }

    return {
        mes: numeroMes,
        ano
    };
}