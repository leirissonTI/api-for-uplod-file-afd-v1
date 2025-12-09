import { Request, Response } from "express";
import { SolicitacoesService } from "../services/solicitacoes-service";
import { CreateSchemaSolicitacao } from "../dtos/solicitacoes/create-solicitacoes.dto";
import { UpdateSchemaSolicitacao } from "../dtos/solicitacoes/update-solicitacoes";
import { string } from "zod";


export class SolicitacoesController {
    constructor(private solicitacoesService: SolicitacoesService) { }

    async getAllSolicitacoes(req: Request, res: Response) {
        try {
            res.json(await this.solicitacoesService.getAllSolicitacoes());
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Cria uma nova solicitação
     * @param req 
     * @param res 
     */
    async createSolicitacao(req: Request, res: Response) {
        try {
            // validar o body da requisição
            const body = CreateSchemaSolicitacao.parse(req.body);
            const criada = await this.solicitacoesService.createSolicitacao(body);
            return res.status(201).json({ success: true, message: 'Solicitação criada com sucesso.' })
        } catch (error) {
            if ((error as any).issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: (error as any).issues })
            }
            return res.status(500).json({ success: false, error: 'Erro ao criar solicitação', message: `${(error as any).message || error}` })
        }
    }
    /**
     * Obtém uma solicitação por ID
     * @param req 
     * @param res 
     */
    async getSolicitacaoById(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            const solicitacao = await this.solicitacoesService.getSolicitacaoById(id);
            if (!solicitacao) {
                return res.status(404).json({ success: false, error: 'Solicitação não encontrada.' })
            }
            return res.status(200).json({ success: true, solicitacao })
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao obter solicitação por ID', message: `${(error as any).message || error}` })
        }
    }

    async updateSolicitacao(req: Request, res: Response) {
        try {
            // validar o body da requisição
            const id = req.params.id as string
            const body = UpdateSchemaSolicitacao.parse(req.body);
            const atualizada = await this.solicitacoesService.updateSolicitacao(id, body);
            return res.status(200).json({ success: true, message: 'Solicitação atualizada com sucesso.' })
        } catch (error) {
            if ((error as any).issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: (error as any).issues })
            }
            return res.status(500).json({ success: false, error: 'Erro ao atualizar solicitação', message: `${(error as any).message || error}` })
        }
    }

    async deleteSolicitacao(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            await this.solicitacoesService.deleteSolicitacao(id);
            return res.status(200).json({ success: true, message: 'Solicitação deletada com sucesso.' })
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao deletar solicitação', message: `${(error as any).message || error}` })
        }
    }
}
