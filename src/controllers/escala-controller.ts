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
            const { nome, lotacaoId, recessoId, dataEscala, diasEscala, receberPagamento, escalado, servidorId, servidorMatricula, chefeId, chefeMatricula, motivo } = request.body
            const escala = await this.escalaService.createEscalaServidor({
                nome,
                lotacaoId,
                recessoId,
                dataEscala,
                diasEscala,
                servidorId,
                servidorMatricula,
                chefeId,
                chefeMatricula,
                motivo,
                receberPagamento,
                escalado,
            })
            response.status(201).json({
                success: true,
                message: `Escala(s) criada(s) com sucesso.`,
                data: escala
            })
        } catch (error) {
            throw new Error(`Erro ao criar escala. ${error}`)
        }
    }

    async createEscalaPorNomes(request: Request, response: Response) {
        try {
            const {
                nome_servidor,
                nome_chefe,
                dia_escala,
                folga_ou_pagamento,
                recessoId,
                lotacaoId,
                nome
            } = request.body

            if (!nome_servidor || !nome_chefe || !dia_escala || !recessoId || !lotacaoId) {
                return response.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe nome_servidor, nome_chefe, dia_escala, recessoId e lotacaoId' })
            }

            const dataEscala = new Date(dia_escala)
            if (isNaN(dataEscala.getTime())) {
                return response.status(400).json({ success: false, error: 'data inválida', message: 'dia_escala deve ser uma data válida (YYYY-MM-DD)' })
            }

            const servidores = await this.escalaService['prismaService'].funcionario.findMany({
                where: { nome: { equals: String(nome_servidor), mode: 'insensitive' as any } },
                select: { id: true, nome: true, matricula: true }
            })
            if (servidores.length === 0) {
                return response.status(404).json({ success: false, error: 'Servidor não encontrado', message: `Nome: ${nome_servidor}` })
            }
            if (servidores.length > 1) {
                return response.status(400).json({ success: false, error: 'Nome de servidor ambíguo', message: `Forneça a matrícula para desambiguar (${nome_servidor})` })
            }
            const servidorId = servidores[0].id

            const chefes = await this.escalaService['prismaService'].funcionario.findMany({
                where: { nome: { equals: String(nome_chefe), mode: 'insensitive' as any } },
                select: { id: true, nome: true, matricula: true }
            })
            if (chefes.length === 0) {
                return response.status(404).json({ success: false, error: 'Chefe não encontrado', message: `Nome: ${nome_chefe}` })
            }
            if (chefes.length > 1) {
                return response.status(400).json({ success: false, error: 'Nome de chefe ambíguo', message: `Forneça a matrícula para desambiguar (${nome_chefe})` })
            }
            const chefeId = chefes[0].id

            const criado = await this.escalaService.createEscalaServidor({
                nome: nome || nome_servidor,
                lotacaoId,
                recessoId,
                dataEscala,
                receberPagamento: !!folga_ou_pagamento,
                escalado: false,
                servidorId,
                chefeId,
            })

            return response.status(201).json({ success: true, message: 'Escala criada com sucesso.', data: criado })
        } catch (error: any) {
            return response.status(500).json({ success: false, error: 'Erro ao criar escala por nomes', message: `${error.message || error}` })
        }
    }

    async getResumo(request: Request, response: Response) {
        try {
            const { recessoId, matricula } = request.params as { recessoId: string; matricula: string }
            if (!recessoId || !matricula) {
                return response.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe recessoId e matricula' })
            }
            const resumo = await this.escalaService.getResumoEscalaServidor({ recessoId, servidorMatricula: matricula })
            return response.status(200).json({ success: true, message: 'Resumo de escala do servidor', data: resumo })
        } catch (error: any) {
            return response.status(500).json({ success: false, error: 'Erro ao resgatar resumo', message: `${error.message || error}` })
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

    async getEscalasPorRecessoDescricao(request: Request, response: Response) {
        try {
            const { descricao } = request.params as { descricao: string }
            if (!descricao) {
                return response.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe descricao' })
            }
            const escalas = await this.escalaService.getEscalasPorRecessoDescricao(descricao)
            return response.status(200).json({ success: true, message: 'Escalas filtradas por recesso', data: escalas })
        } catch (error: any) {
            return response.status(500).json({ success: false, error: 'Erro ao filtrar escalas', message: `${error.message || error}` })
        }
    }
}
