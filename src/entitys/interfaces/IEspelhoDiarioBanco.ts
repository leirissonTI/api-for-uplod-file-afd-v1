export interface IEspelhoDiarioBanco {
    cpf: string;
    mesAno: string;
    diaDoMes: number;
    credito: Date | null;
    debito: Date | null;
    horasNormais: number;
    horasExtras: number;
    saldo: number;
    motivoReajuste: string;
    data: Date;
    primeiraEntrada: Date | null;
    primeiraSaida: Date | null;
    segundaEntrada: Date | null;
    segundaSaida: Date | null;
    horasTrabalhadas: number;
    observacoes: string;
    status: string;
}