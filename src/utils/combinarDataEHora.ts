export function combinarDataEHora(dataStr: string, horaStr: string): Date {
    try {
        // 🚨 Validação de entrada
        if (!dataStr || !horaStr) {
            console.warn('Data ou hora vazia:', { dataStr, horaStr });
            throw new Error('Data ou hora inválida');
        }

        if (dataStr === 'DATA INVÁLIDA' || horaStr === 'HORA INVÁLIDA') {
            console.warn('Data/hora marcada como inválida:', { dataStr, horaStr });
            throw new Error('Data/hora inválida no parsing');
        }

        // Validação de formato
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const horaRegex = /^\d{2}:\d{2}:\d{2}$/;

        if (!dataRegex.test(dataStr)) {
            console.warn('Formato de data inválido:', dataStr);
            throw new Error(`Formato de data inválido: ${dataStr}`);
        }

        if (!horaRegex.test(horaStr)) {
            console.warn('Formato de hora inválido:', horaStr);
            throw new Error(`Formato de hora inválido: ${horaStr}`);
        }

        // Parse dos componentes
        const [dia, mes, ano] = dataStr.split('/').map(Number);
        const [horas, minutos, segundos] = horaStr.split(':').map(Number);

        // 🧮 Validação de valores
        if (isNaN(dia) || isNaN(mes) || isNaN(ano) || 
            isNaN(horas) || isNaN(minutos) || isNaN(segundos)) {
            console.warn('Valores numéricos inválidos:', { dia, mes, ano, horas, minutos, segundos });
            throw new Error('Valores numéricos inválidos');
        }

        // Validação de ranges
        if (mes < 1 || mes > 12) {
            console.warn('Mês inválido:', mes);
            throw new Error(`Mês inválido: ${mes}`);
        }

        if (dia < 1 || dia > 31) {
            console.warn('Dia inválido:', dia);
            throw new Error(`Dia inválido: ${dia}`);
        }

        if (horas < 0 || horas > 23) {
            console.warn('Hora inválida:', horas);
            throw new Error(`Hora inválida: ${horas}`);
        }

        if (minutos < 0 || minutos > 59) {
            console.warn('Minuto inválido:', minutos);
            throw new Error(`Minuto inválido: ${minutos}`);
        }

        if (segundos < 0 || segundos > 59) {
            console.warn('Segundo inválido:', segundos);
            throw new Error(`Segundo inválido: ${segundos}`);
        }

        // Criar data com validação final
        const data = new Date(ano, mes - 1, dia, horas, minutos, segundos);
        
        // Verificar se a data é válida
        if (isNaN(data.getTime())) {
            console.warn('Data resultante inválida:', { ano, mes, dia, horas, minutos, segundos });
            throw new Error('Data resultante inválida');
        }

        // Verificar se os componentes batem (evita problemas como 31/02/2024)
        if (data.getFullYear() !== ano || 
            data.getMonth() !== mes - 1 || 
            data.getDate() !== dia) {
            console.warn('Componentes da data não coincidem:', { 
                esperado: { ano, mes: mes - 1, dia }, 
                obtido: { 
                    ano: data.getFullYear(), 
                    mes: data.getMonth(), 
                    dia: data.getDate() 
                } 
            });
            throw new Error('Data inválida (componentes não coincidem)');
        }

        return data;

    } catch (error: any) {
        console.error('❌ Erro ao combinar data/hora:', error.message);
        console.error('Dados de entrada:', { dataStr, horaStr });
        
        // Lançar erro para que o parser saiba que falhou
        throw new Error(`Falha ao combinar data/hora: ${error.message}`);
    }
}