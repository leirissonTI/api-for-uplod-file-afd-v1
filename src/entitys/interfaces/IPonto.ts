export default interface IPonto {
    id: string
    nsr: number
    tipo: string
    dataCompleta?: Date | string; // Campo correto do banco
    data: string | Date
    hora: string
    cpfEmpregado: string
    crc: string
    origem: string | null

}