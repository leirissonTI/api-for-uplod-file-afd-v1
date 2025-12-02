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
            const escala = await this.prismaService.escala.findMany();
            return escala;
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
    async create(data) {
        return await this.prismaService.escala.create({
            data,
        });
    }
}
exports.EscalaService = EscalaService;
