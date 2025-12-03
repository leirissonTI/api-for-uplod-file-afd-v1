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

    async createEscala(request: Request, response: Response) {
        try {
            const { nome, lotacaoId, recessoId, dataEscala, receberPagamento, escalado } = request.body
            const dataValida = (dataEscala instanceof Date) ? dataEscala : new Date(dataEscala)
            if (!(dataValida instanceof Date) || isNaN(dataValida.getTime())) {
                return response.status(400).json({ success: false, error: 'dataEscala inválida', message: 'Use uma data válida no formato YYYY-MM-DD' })
            }
            const escala = await this.escalaService.createEscalaServidor({
                nome,
                lotacaoId,
                recessoId,
                dataEscala: dataValida,
                receberPagamento,
                escalado,
            })
            response.status(201).json({
                success: true,
                message: `Escala criada com sucesso.`,
                data: escala
            })
        } catch (error) {
            throw new Error(`Erro ao criar escala. ${error}`)
        }
    }

    async updateEscala(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { nome, lotacaoId, recessoId, dataEscala, receberPagamento, escalado } = request.body
            const dataValida = (dataEscala instanceof Date) ? dataEscala : new Date(dataEscala)
            if (!(dataValida instanceof Date) || isNaN(dataValida.getTime())) {
                return response.status(400).json({ success: false, error: 'dataEscala inválida', message: 'Use uma data válida no formato YYYY-MM-DD' })
            }
            const escala = await this.escalaService.updateEscala(id, {
                nome,
                lotacaoId,
                recessoId,
                dataEscala: dataValida,
                receberPagamento,
                escalado,
            })
            response.status(200).json({
                success: true,
                message: `Escala atualizada com sucesso.`,
                data: escala
            })
        } catch (error) {   
            throw new Error(`Erro ao atualizar escala. ${error}`)
        }
    }

    async deleteEscala(request: Request, response: Response) {
        try {
            const { id } = request.params
            await this.escalaService.deleteEscala(id)
            response.status(200).json({
                success: true,
                message: `Escala deletada com sucesso.`,
            })
        } catch (error) {
            throw new Error(`Erro ao deletar escala. ${error}`)
        }
    }

}
