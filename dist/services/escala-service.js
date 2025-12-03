"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalaService = void 0;
const prisma_1 = require("../config/prisma");
class EscalaService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    /**
     * Retorna todas as escalas.
     * @returns Uma promessa que resolve para um array de escalas.
     * @throws {Error} Se ocorrer um erro ao buscar as escalas.
     */
    async getAllEscalas() {
        try {
            return await this.prismaService.escala.findMany();
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas as escalas. ${error}`);
        }
    }
    /**
    * Retorna uma escala pelo ID.
    * @param id - O ID da escala a ser retornada.
    * @returns Uma promessa que resolve para a escala encontrada ou null se não for encontrada.
    * @throws {Error} Se ocorrer um erro ao buscar a escala.
    */
    async getEscalaById(id) {
        try {
            return await this.prismaService.escala.findUnique({
                where: {
                    id,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao buscar escala com ID ${id}. ${error}`);
        }
    }
    /**
     * Cria uma nova escala.
     * @param data - Os dados da escala a ser criada.
     * @returns Uma promessa que resolve para a escala criada.
     */
    async createEscalaServidor(data) {
        const { nome, lotacaoId, recessoId, dataEscala, receberPagamento, escalado } = data;
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
        try {
            return await this.prismaService.escala.create({
                data: {
                    nome,
                    lotacaoId,
                    recessoId,
                    dataEscala: dataValida,
                    recebePagamento: receberPagamento ?? false,
                    escalado: escalado ?? false,
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error(`Escala com nome "${nome}" já existe para o recesso informado.`);
            }
            throw new Error(`Erro ao criar escala. ${error.message}`);
        }
    }
}
exports.EscalaService = EscalaService;
