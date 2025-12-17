import { Request, Response } from "express";
import { SolicitacoesService } from "../services/solicitacoes-service";
import { CreateSchemaSolicitacao } from "../dtos/solicitacoes/create-solicitacoes.dto";
import * as UpdateSolicitacaoModule from "../dtos/solicitacoes/update-solicitacoes";
import { string } from "zod";
import path from "path";


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
            const body = UpdateSolicitacaoModule.UpdateSchemaSolicitacao.parse(req.body);
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

    async importFromCsvBackup(req: Request, res: Response) {
        try {
            const recessoId = String(req.query.recessoId || req.params.recessoId || '').trim()
            if (!recessoId) return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe recessoId' })
            if (!req.file) return res.status(400).json({ success: false, error: 'Arquivo não enviado', message: 'Envie um arquivo CSV no campo file' })
            const filePath = path.resolve((req.file as any).path as string)
            const resultado = await this.solicitacoesService.importFromCsvBackup(filePath, recessoId)
            return res.status(200).json({ success: true, message: 'Importação de frequências concluída.', data: resultado })
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao importar frequências do backup', message: `${(error as any).message || error}` })
        }
    }

    async buscarPorMatricula(req: Request, res: Response) {
        try {
            const matricula = String(req.query.matricula || req.params.matricula || '').trim()
            const recessoId = String(req.query.recessoId || '').trim()
            if (!matricula) return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe matricula' })
            const data = await this.solicitacoesService.getSolicitacoesPorMatricula({ matricula, recessoId: recessoId || undefined })
            return res.status(200).json({ success: true, message: 'Solicitações filtradas por matrícula', data })
        } catch (error: any) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar solicitações por matrícula', message: `${(error as any).message || error}` })
        }
    }

    async aprovarSolicitacao(req: Request, res: Response) {
        try {
            const id = String(req.params.id || '').trim()
            const { aprovadorId, chefeMatricula, motivo, status } = (req.body || {})
            if (!id) return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe id' })
            const atualizada = await this.solicitacoesService.aprovarSolicitacao(id, { aprovadorId, chefeMatricula, motivo, status })
            return res.status(200).json({ success: true, message: 'Solicitação atualizada com sucesso.', data: atualizada })
        } catch (error: any) {
            return res.status(500).json({ success: false, error: 'Erro ao aprovar/atualizar solicitação', message: `${(error as any).message || error}` })
        }
    }

    async buscarPorAprovadorMatricula(req: Request, res: Response) {
        try {
            const matricula = String(req.query.matricula || req.params.matricula || '').trim()
            const recessoId = String(req.query.recessoId || '').trim()
            if (!matricula) return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe matricula' })
            const data = await this.solicitacoesService.getSolicitacoesPorAprovadorMatricula({ matricula, recessoId: recessoId || undefined })
            return res.status(200).json({ success: true, message: 'Solicitações filtradas por matrícula de aprovador', data })
        } catch (error: any) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar solicitações por matrícula de aprovador', message: `${(error as any).message || error}` })
        }
    }
}
