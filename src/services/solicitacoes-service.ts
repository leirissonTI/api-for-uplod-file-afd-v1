import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateSolicitacaoDto } from "../dtos/solicitacoes/create-solicitacoes.dto";
import { UpdateSolicitacaoDto } from "../dtos/solicitacoes/update-solicitacoes";



export class SolicitacoesService {
    constructor(private prismaService: PrismaClient = prisma) { }

    async getAllSolicitacoes(){
        try {
            return await this.prismaService.solicitacao.findMany()
        } catch (error) {
            throw new Error(`Erro ao buscar todas as solicitações. ${error}`)
        }
    }

    async createSolicitacao(solicitacao: CreateSolicitacaoDto) {
        try {
            return this.prismaService.solicitacao.create({
                data: solicitacao
            })
        } catch (error) {
            throw new Error(`Erro ao criar solicitação. ${error}`)
        }
    }

    async updateSolicitacao(id: string, solicitacao: UpdateSolicitacaoDto) {
        try {
            return this.prismaService.solicitacao.update({
                where: {
                    id
                },
                data: solicitacao
            })
        } catch (error) {
            throw new Error(`Erro ao atualizar solicitação. ${error}`)
        }
    }


}