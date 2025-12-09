import { IEspelhoDiario } from './IEspelhoDiario'

export interface IEspelhoMensal {
 cpf: string
  mesAno: string
  diasUteis: number
  diasTrabalhados: number
  totalHorasTrabalhadas: number
  totalHorasDevidas: number
  saldoHoras: number
  registros: IEspelhoDiario[]
}