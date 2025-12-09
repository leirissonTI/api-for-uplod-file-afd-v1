import { PrismaClient } from "../generated/prisma";
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

    async getSolicitacaoById(id: string){
        try {
            return await this.prismaService.solicitacao.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(`Erro ao buscar solicitação por ID. ${error}`)
        }
    }

    async createSolicitacao(solicitacao: CreateSolicitacaoDto) {
        try {
            const { chefeMatricula, ...rest } = solicitacao as any
            // Se aprovadorId não foi enviado e chefeMatricula foi informado, resolver pelo chefe
            if (!rest.aprovadorId && chefeMatricula) {
                const chefe = await this.prismaService.funcionario.findUnique({ where: { matricula: chefeMatricula }, select: { id: true } })
                if (!chefe) throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`)
                rest.aprovadorId = chefe.id
            }
            return this.prismaService.solicitacao.create({ data: rest })
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

    async deleteSolicitacao(id: string) {
        try {
            return this.prismaService.solicitacao.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(`Erro ao deletar solicitação. ${error}`)
        }
    }

}
