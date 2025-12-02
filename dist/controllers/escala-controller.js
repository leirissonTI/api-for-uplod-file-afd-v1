"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalaController = void 0;
class EscalaController {
    escalaService;
    constructor(escalaService) {
        this.escalaService = escalaService;
    }
    /**
     * Retorna todas as escalas.
     * @returns Uma promessa que resolve para um array de escalas.
     * @throws {Error} Se ocorrer um erro ao buscar as escalas.
     */
    async getAllEscalas(_, response) {
        try {
            const escalas = await this.escalaService.getAllEscalas();
            response.status(200).json({
                success: true,
                message: `Todos as escalas foram resgatadas com sucesso.`,
                data: escalas
            });
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas as escalas. ${error}`);
        }
    }
}
exports.EscalaController = EscalaController;
