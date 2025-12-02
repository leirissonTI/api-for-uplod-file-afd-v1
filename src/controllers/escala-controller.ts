import { EscalaEntity } from "../entitys/escala.entity";
import { EscalaService } from "../services/escala-service";
import { Request, Response } from 'express'


export class EscalaController {
    constructor(private escalaService: EscalaService) { }

    /**
     * Retorna todas as escalas.
     * @returns Uma promessa que resolve para um array de escalas.
     * @throws {Error} Se ocorrer um erro ao buscar as escalas.
     */
    async getAllEscalas(_:Request, response:Response) {
        try {
            const escalas: EscalaEntity[] =  await this.escalaService.getAllEscalas()
             response.status(200).json({
                success: true,
                message: `Todos as escalas foram resgatadas com sucesso.`,
                data: escalas
            })
            
        } catch (error) {
            throw new Error(`Erro ao buscar todas as escalas. ${error}`)
        }
    }

}