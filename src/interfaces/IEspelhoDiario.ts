import { IStatusDia } from "./IStatusDia"

export interface IEspelhoDiario {
  cpf:string
  diaDoMes: string // ex: "Seg, 25/04/2025"
  credito: number // Horas trabalhadas (máx 7)
  debito: number // Horas faltando (negativo)
  horasNormais: number // Horas dentro da carga padrão (até 7h)
  horasExtras: number // Acima de 7h
  saldo: number // Total de horas trabalhadas - 7h
  motivoReajuste: string // Motivo do crédito ou débito
  data: string 
  primeiraEntrada: string | null
  primeiraSaida: string | null
  segundaEntrada: string | null
  segundaSaida: string | null
  horasTrabalhadas: number
  observacoes: string
  origem?: string
  status: IStatusDia,
  mesAno:string
  horasAlmoco : number
  bancoDeHoras : number
}

