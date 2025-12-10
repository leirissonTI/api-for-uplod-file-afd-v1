"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecessoService = void 0;
const prisma_1 = require("../config/prisma");
const date_utils_1 = require("../utils/date-utils");
class RecessoService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    mapToTRecesso(model) {
        return {
            id: model.id,
            ano: model.ano,
            descricao: model.descricao,
            processoSei: model.processoSei,
            abertoParaFrequencia: model.abertoParaFrequencia,
            data_inicio: model.DataInicial,
            data_fim: model.dataFinal,
            created_at: model.createdAt,
            updated_at: model.updatedAt,
        };
    }
    /**
     * Obtém todos os recessos do banco de dados.
     * @returns Uma promessa que resolve para um array de recessos.
     */
    async getAllRecesso() {
        const itens = await this.prismaService.recesso.findMany({
            orderBy: {
                ano: 'asc',
            }
        });
        return itens.map((i) => this.mapToTRecesso(i));
    }
    /**
     * Cria um novo recesso no banco de dados.
     * @param recesso - Os dados do recesso a ser criado.
     * @returns Uma promessa que resolve para o recesso criado.
     */
    async createRecesso(recesso) {
        const { descricao, processoSei, abertoParaFrequencia, data_inicio, data_fim, } = recesso;
        try {
            const anoStart = (0, date_utils_1.toStartOfYear)(recesso.ano);
            if (!anoStart)
                throw new Error('ano inválido. Envie um ano (YYYY) ou uma data válida.');
            const di = (0, date_utils_1.parseDateInput)(data_inicio);
            const df = (0, date_utils_1.parseDateInput)(data_fim);
            if (!di || !df)
                throw new Error('data_inicio ou data_fim inválidos.');
            await this.prismaService.recesso.create({
                data: {
                    ano: anoStart,
                    descricao,
                    processoSei,
                    abertoParaFrequencia,
                    DataInicial: di,
                    dataFinal: df,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao criar recesso. ${error.message}`);
        }
    }
    /**
     * Obtém um recesso pelo ID.
     * @param id - O ID do recesso a ser obtido.
     * @returns Uma promessa que resolve para o recesso encontrado ou null se não for encontrado.
     */
    async getRecessoById(data) {
        const { id } = data;
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(id);
        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${id} não foi encontrado.`);
        }
        return this.mapToTRecesso(oRecessoExiste);
    }
    /**
     * Atualiza um recesso existente no banco de dados.
     * @param id - O ID do recesso a ser atualizado.
     * @param recesso - Os dados atualizados do recesso.
     * @returns Uma promessa que resolve para o recesso atualizado.
     */
    async updateRecesso(data, recesso) {
        const { id } = data;
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(id);
        const { ano, descricao, processoSei, abertoParaFrequencia, data_inicio, data_fim, } = recesso;
        const anoStart = (0, date_utils_1.toStartOfYear)(ano);
        if (!anoStart)
            throw new Error('ano inválido ao atualizar recesso.');
        const di = (0, date_utils_1.parseDateInput)(data_inicio);
        const df = (0, date_utils_1.parseDateInput)(data_fim);
        if (!di || !df)
            throw new Error('data_inicio ou data_fim inválidos ao atualizar recesso.');
        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${id} não foi encontrado.`);
        }
        try {
            return await this.prismaService.recesso.update({
                where: {
                    id: oRecessoExiste.id,
                },
                data: {
                    ano: anoStart,
                    descricao,
                    processoSei,
                    abertoParaFrequencia,
                    DataInicial: di,
                    dataFinal: df,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao atualizar processo Sei do recesso com ID ${id}. ${error.message}`);
        }
    }
    async deleteUmRecesso(id) {
        const { id: idRecesso } = id;
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(idRecesso);
        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${idRecesso} não foi encontrado.`);
        }
        try {
            await this.prismaService.recesso.delete({
                where: {
                    id: oRecessoExiste.id,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao deletar recesso com ID ${idRecesso}. ${error.message}`);
        }
    }
    /**
     * Verifica se um recesso existe com o ID fornecido.
     * @param id - O ID do recesso a ser verificado.
     * @returns Uma promessa que resolve para o recesso encontrado ou null se não for encontrado.
     */
    async verificaSeRecessoExiste(id) {
        return await this.prismaService.recesso.findUnique({
            where: {
                id,
            }
        });
    }
    async criarSolicitacaoPorMatriculaChefe(params) {
        const { escalaId, criadorId, chefeMatricula, motivo } = params;
        try {
            const chefe = await this.prismaService.funcionario.findUnique({
                where: { matricula: chefeMatricula },
                select: { id: true, role: true }
            });
            if (!chefe) {
                throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`);
            }
            const solicitacao = await this.prismaService.solicitacao.create({
                data: {
                    escalaId,
                    criadorId,
                    aprovadorId: chefe.id,
                    motivo: motivo ?? null,
                }
            });
            return solicitacao;
        }
        catch (error) {
            throw new Error(`Erro ao criar solicitação por matrícula do chefe. ${error.message}`);
        }
    }
    async criarEscalaParaRecesso(params) {
        const { recessoId, nome, lotacaoId, dataEscala, recebePagamento, escalado } = params;
        try {
            const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true } });
            if (!recesso)
                throw new Error(`Recesso ${recessoId} não encontrado.`);
            const lotacao = await this.prismaService.lotacao.findUnique({ where: { id: lotacaoId }, select: { id: true } });
            if (!lotacao)
                throw new Error(`Lotação ${lotacaoId} não encontrada.`);
            const dataValida = (dataEscala instanceof Date) ? dataEscala : new Date(dataEscala);
            if (!(dataValida instanceof Date) || isNaN(dataValida.getTime())) {
                throw new Error('dataEscala inválida. Use uma data ISO válida (YYYY-MM-DD).');
            }
            const escala = await this.prismaService.escala.create({
                data: {
                    nome,
                    lotacaoId,
                    recessoId,
                    dataEscala: dataValida,
                    recebePagamento: recebePagamento ?? false,
                    escalado: escalado ?? false,
                }
            });
            return escala;
        }
        catch (error) {
            throw new Error(`Erro ao criar escala para recesso. ${error.message}`);
        }
    }
    async associarEscalaAoRecesso(params) {
        const { escalaId, recessoId } = params;
        try {
            const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true } });
            if (!recesso)
                throw new Error(`Recesso ${recessoId} não encontrado.`);
            const escalaExiste = await this.prismaService.escala.findUnique({ where: { id: escalaId }, select: { id: true } });
            if (!escalaExiste)
                throw new Error(`Escala ${escalaId} não encontrada.`);
            const escala = await this.prismaService.escala.update({
                where: { id: escalaId },
                data: { recessoId }
            });
            return escala;
        }
        catch (error) {
            throw new Error(`Erro ao associar escala ao recesso. ${error.message}`);
        }
    }
}
exports.RecessoService = RecessoService;
