import { IResgistros } from "../interfaces/IResgistros"

export type TRegistroAFD = {
  tipo: string   // ex: '1', '2', '3', '5'
  linha: string
  parsed?: IResgistros | null // Pode ser null se não for um tipo conhecido
} 