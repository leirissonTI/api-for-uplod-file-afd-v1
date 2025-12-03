import { Request, Response } from "express";
import { LotacaoService } from "../services/lotacao-service";
import { CreateLotacaoDto } from "../dtos/lotacao/create-lotacao.dto";
import { PatchLotacaoDto } from "../dtos/lotacao/patch-lotacao.dto";



export class LotacaoController {
    constructor(private lotacaoService: LotacaoService) { }
    /**
     * Retorna todas as lotações.
     * @returns {Promise<LotacaoEntity[]>} Uma promessa que resolve para um array de entidades de lotação.
     * @throws {Error} Se ocorrer um erro ao buscar todas as lotações.
     */
    async getAllLotacao(req: Request, res: Response) {
        try {
            const lotacoes = await this.lotacaoService.getAllLotacao()
            return res.status(200).json({
                success: true,
                message: 'Lotações resgatadas com sucesso.',
                data: lotacoes
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar todas as lotações.',
                message: `${error.message || error}`
            })
        }
    }
    /**
     * Retorna uma lotação pelo ID.
     * @param id O ID da lotação a ser buscada.
     * @returns {Promise<LotacaoEntity | null>} Uma promessa que resolve para a entidade de lotação correspondente ao ID, ou null se não for encontrada.
     * @throws {Error} Se ocorrer um erro ao buscar a lotação por ID.
     */
    async getLotacaoById(id: string) {
        try {
            return  await this.lotacaoService.getLotacaoById(id)
        } catch (error) {
            throw new Error(`Erro ao buscar lotação por ID. ${error}`)
        }
    }

    async createLotacao(req: Request, res: Response) {
        try {
            const lotacao = req.body as CreateLotacaoDto
            const lotacaoCriada = await this.lotacaoService.createLotacao(lotacao)
            return res.status(201).json({
                success: true,
                message: 'Lotação criada com sucesso.',
                data: lotacaoCriada
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao criar lotação.',
                message: `${error.message || error}`
            })
        }
    }

    async updateLotacao(req: Request, res: Response) {
        try {
            const id = req.params.id
            const lotacao = req.body as PatchLotacaoDto
            const lotacaoAtualizada = await this.lotacaoService.updateLotacao(id, lotacao)
            return res.status(200).json({
                success: true,
                message: 'Lotação atualizada com sucesso.',
                data: lotacaoAtualizada
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao atualizar lotação.',
                message: `${error.message || error}`
            })
        }
    }

    async deleteLotacao(req: Request, res: Response) {
        try {
            const id = req.params.id
            await this.lotacaoService.deleteLotacao(id)
            return res.status(200).json({
                success: true,
                message: 'Lotação deletada com sucesso.'
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao deletar lotação.',
                message: `${error.message || error}`
            })
        }
    }
}
