import { IResgistros } from './IResgistros'

export interface ICacheResponse {
    success: boolean
    message?: string
    data?: {
        tipo?: string
        total?: number
        registros: IResgistros[]
    }
}   