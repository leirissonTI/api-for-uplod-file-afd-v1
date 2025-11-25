import { z } from "zod";
import { CreateRecessoDto, createRecessoSchema } from "../dtos/create-recesso.dto";
import { SchemaIdRecesso, TIdRecessoDto } from "../dtos/id-recesso.dto";
import { RecessoService } from "../services/recesso-service";
import { Request, Response } from 'express'
import { TUpdateRecessoDto } from "../dtos/update-recesso.dto";


export class RecessoController {
    constructor(private recessoService: RecessoService) { }

    /**
     * @description Retorna todos os recessos.
     * @param _ - Requisição HTTP (não utilizada).
     * @param response - Resposta HTTP com os dados dos recessos ou mensagens de erro.
     */
    async getAllRecesso(_: Request, response: Response) {
        try {
            const recessos = await this.recessoService.getAllRecesso()
            response.status(200).json({
                success: true,
                message: `Todos os recessos foram resgatados com sucesso.`,
                data: recessos
            })
        } catch (error: any) {
            response.status(500).json({
                success: false,
                error: `Erro ao resgatar todos os recessos.`,
                message: `${error.message}`
            })
        }
    }

    /**
     * @description Retorna um recesso pelo ID.
     * @param request - Requisição HTTP contendo o ID do recesso nos parâmetros.
     * @param response - Resposta HTTP com os dados do recesso ou mensagens de erro.
     */
    async getRecessoById(request: Request, response: Response) {
        try {
            // Validar os dados do recesso usando o schema do prisma
            const validatedRecesso: TIdRecessoDto = SchemaIdRecesso.parse({ id: request.params.id as string })
            const recesso = await this.recessoService.getRecessoById(validatedRecesso)
            response.status(200).json({
                success: true,
                message: `Recesso com ID ${validatedRecesso.id} foi resgatado com sucesso.`,
                data: recesso
            })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                response.status(400).json({
                    success: false,
                    error: `Erro de validação ao resgatar recesso com ID ${request.params.id}.`,
                    message: `${error.issues.map((issue) => issue.message).join(', ')}`
                })
            }

            response.status(500).json({
                success: false,
                error: `Erro ao resgatar recesso com ID ${request.params.id}.`,
                message: `${error.message}`
            })
        }
    }

    /**
     * @description Cria um novo recesso.
     * @param request - Requisição HTTP contendo os dados do recesso no corpo.
     * @param response - Resposta HTTP com os dados do recesso criado ou mensagens de erro.
     */
    async createRecesso(request: Request, response: Response) {
        try {
            const recesso: CreateRecessoDto = request.body
            // Validar os dados do recesso usando o schema do prisma
            const validatedRecesso = createRecessoSchema.parse(recesso)
            await this.recessoService.createRecesso(validatedRecesso)
            response.status(201).json({
                success: true,
                message: `Recesso criado com sucesso.`,
                data: validatedRecesso
            })
        } catch (error: any) {
            response.status(500).json({
                success: false,
                error: `Erro ao criar recesso.`,
                message: `${error.message}`
            })
        }
    }

    /**
     * @description Atualiza um recesso existente.
     * @param request - Requisição HTTP contendo o ID do recesso nos parâmetros e os dados atualizados no corpo.
     * @param response - Resposta HTTP com os dados do recesso atualizado ou mensagens de erro.
     */
    async updateRecesso(request: Request, response: Response) {
        try {
            const validatedRecesso: TIdRecessoDto = SchemaIdRecesso.parse({ id: request.params.id as string })
            const recesso: TUpdateRecessoDto = request.body
            await this.recessoService.updateRecesso(validatedRecesso, recesso)
            response.status(200).json({
                success: true,
                message: `Recesso com ID ${validatedRecesso.id} foi atualizado com sucesso.`,
                data: recesso
            })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                response.status(400).json({
                    success: false,
                    error: `Erro de validação ao atualizar recesso com ID ${request.params.id}.`,
                    message: `${error.issues.map((issue) => issue.message).join(', ')}`
                })
            }
            response.status(500).json({
                success: false,
                error: `Erro ao atualizar recesso com ID ${request.params.id}.`,
                message: `${error.message}`
            })
        }
    }

    /**
     * @description Deleta um recesso existente.
     * @param request - Requisição HTTP contendo o ID do recesso nos parâmetros.
     * @param response - Resposta HTTP com mensagens de sucesso ou erro.
     */
    async deleteRecesso(request: Request, response: Response) {
        try {
            const validatedRecesso: TIdRecessoDto = SchemaIdRecesso.parse({ id: request.params.id as string })
            await this.recessoService.deleteUmRecesso(validatedRecesso)
            response.status(200).json({
                success: true,
                message: `Recesso com ID ${validatedRecesso.id} foi deletado com sucesso.`
            })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                response.status(400).json({
                    success: false,
                    error: `Erro de validação ao deletar recesso com ID ${request.params.id}.`,
                    message: `${error.issues.map((issue) => issue.message).join(', ')}`
                })
            }
            response.status(500).json({
                success: false,
                error: `Erro ao deletar recesso com ID ${request.params.id}.`,
                message: `${error.message}`
            })
        }
    }
}