export interface IResgistros {
    nsr: number,
    tipo: string,
    dataCompleta: string | Date | null,
    data: string | Date | null,
    hora: string,
    cpfEmpregado: string,
    crc: string,
    origem: string | number | null

}