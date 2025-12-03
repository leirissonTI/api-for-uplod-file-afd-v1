"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotacaoController = void 0;
class LotacaoController {
    lotacaoService;
    constructor(lotacaoService) {
        this.lotacaoService = lotacaoService;
    }
    /**
     * Retorna todas as lotações.
     * @returns {Promise<LotacaoEntity[]>} Uma promessa que resolve para um array de entidades de lotação.
     * @throws {Error} Se ocorrer um erro ao buscar todas as lotações.
     */
    async getAllLotacao(req, res) {
        try {
            const lotacoes = await this.lotacaoService.getAllLotacao();
            return res.status(200).json({
                success: true,
                message: 'Lotações resgatadas com sucesso.',
                data: lotacoes
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar todas as lotações.',
                message: `${error.message || error}`
            });
        }
    }
    /**
     * Retorna uma lotação pelo ID.
     * @param id O ID da lotação a ser buscada.
     * @returns {Promise<LotacaoEntity | null>} Uma promessa que resolve para a entidade de lotação correspondente ao ID, ou null se não for encontrada.
     * @throws {Error} Se ocorrer um erro ao buscar a lotação por ID.
     */
    async getLotacaoById(id) {
        try {
            return await this.lotacaoService.getLotacaoById(id);
        }
        catch (error) {
            throw new Error(`Erro ao buscar lotação por ID. ${error}`);
        }
    }
    async createLotacao(req, res) {
        try {
            const lotacao = req.body;
            const lotacaoCriada = await this.lotacaoService.createLotacao(lotacao);
            return res.status(201).json({
                success: true,
                message: 'Lotação criada com sucesso.',
                data: lotacaoCriada
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao criar lotação.',
                message: `${error.message || error}`
            });
        }
    }
    async updateLotacao(req, res) {
        try {
            const id = req.params.id;
            const lotacao = req.body;
            const lotacaoAtualizada = await this.lotacaoService.updateLotacao(id, lotacao);
            return res.status(200).json({
                success: true,
                message: 'Lotação atualizada com sucesso.',
                data: lotacaoAtualizada
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao atualizar lotação.',
                message: `${error.message || error}`
            });
        }
    }
    async deleteLotacao(req, res) {
        try {
            const id = req.params.id;
            await this.lotacaoService.deleteLotacao(id);
            return res.status(200).json({
                success: true,
                message: 'Lotação deletada com sucesso.'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao deletar lotação.',
                message: `${error.message || error}`
            });
        }
    }
}
exports.LotacaoController = LotacaoController;
