"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacoesController = void 0;
const create_solicitacoes_dto_1 = require("../dtos/solicitacoes/create-solicitacoes.dto");
const update_solicitacoes_1 = require("../dtos/solicitacoes/update-solicitacoes");
class SolicitacoesController {
    solicitacoesService;
    constructor(solicitacoesService) {
        this.solicitacoesService = solicitacoesService;
    }
    async getAllSolicitacoes(req, res) {
        try {
            res.json(await this.solicitacoesService.getAllSolicitacoes());
        }
        catch (error) {
            console.log(error);
        }
    }
    /**
     * Cria uma nova solicitação
     * @param req
     * @param res
     */
    async createSolicitacao(req, res) {
        try {
            // validar o body da requisição
            const body = create_solicitacoes_dto_1.CreateSchemaSolicitacao.parse(req.body);
            const criada = await this.solicitacoesService.createSolicitacao(body);
            return res.status(201).json({ success: true, message: 'Solicitação criada com sucesso.' });
        }
        catch (error) {
            if (error.issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues });
            }
            return res.status(500).json({ success: false, error: 'Erro ao criar solicitação', message: `${error.message || error}` });
        }
    }
    /**
     * Obtém uma solicitação por ID
     * @param req
     * @param res
     */
    async getSolicitacaoById(req, res) {
        try {
            const id = req.params.id;
            const solicitacao = await this.solicitacoesService.getSolicitacaoById(id);
            if (!solicitacao) {
                return res.status(404).json({ success: false, error: 'Solicitação não encontrada.' });
            }
            return res.status(200).json({ success: true, solicitacao });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao obter solicitação por ID', message: `${error.message || error}` });
        }
    }
    async updateSolicitacao(req, res) {
        try {
            // validar o body da requisição
            const id = req.params.id;
            const body = update_solicitacoes_1.UpdateSchemaSolicitacao.parse(req.body);
            const atualizada = await this.solicitacoesService.updateSolicitacao(id, body);
            return res.status(200).json({ success: true, message: 'Solicitação atualizada com sucesso.' });
        }
        catch (error) {
            if (error.issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues });
            }
            return res.status(500).json({ success: false, error: 'Erro ao atualizar solicitação', message: `${error.message || error}` });
        }
    }
    async deleteSolicitacao(req, res) {
        try {
            const id = req.params.id;
            await this.solicitacoesService.deleteSolicitacao(id);
            return res.status(200).json({ success: true, message: 'Solicitação deletada com sucesso.' });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao deletar solicitação', message: `${error.message || error}` });
        }
    }
}
exports.SolicitacoesController = SolicitacoesController;
