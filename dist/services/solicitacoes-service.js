"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacoesService = void 0;
const prisma_1 = require("../config/prisma");
class SolicitacoesService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    async getAllSolicitacoes() {
        try {
            return await this.prismaService.solicitacao.findMany();
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas as solicitações. ${error}`);
        }
    }
    async getSolicitacaoById(id) {
        try {
            return await this.prismaService.solicitacao.findUnique({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao buscar solicitação por ID. ${error}`);
        }
    }
    async createSolicitacao(solicitacao) {
        try {
            const { chefeMatricula, ...rest } = solicitacao;
            // Se aprovadorId não foi enviado e chefeMatricula foi informado, resolver pelo chefe
            if (!rest.aprovadorId && chefeMatricula) {
                const chefe = await this.prismaService.funcionario.findUnique({ where: { matricula: chefeMatricula }, select: { id: true } });
                if (!chefe)
                    throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`);
                rest.aprovadorId = chefe.id;
            }
            return this.prismaService.solicitacao.create({ data: rest });
        }
        catch (error) {
            throw new Error(`Erro ao criar solicitação. ${error}`);
        }
    }
    async updateSolicitacao(id, solicitacao) {
        try {
            return this.prismaService.solicitacao.update({
                where: {
                    id
                },
                data: solicitacao
            });
        }
        catch (error) {
            throw new Error(`Erro ao atualizar solicitação. ${error}`);
        }
    }
    async deleteSolicitacao(id) {
        try {
            return this.prismaService.solicitacao.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao deletar solicitação. ${error}`);
        }
    }
}
exports.SolicitacoesService = SolicitacoesService;
