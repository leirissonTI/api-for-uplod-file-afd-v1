import { PrismaClient } from "../generated/prisma";
import { prisma } from "../config/prisma";
import { TRecesso } from "../types/TRecesso";
import { CreateRecessoDto } from "../dtos/create-recesso.dto";
import { TIdRecessoDto } from "../dtos/id-recesso.dto";
import { TUpdateRecessoDto } from "../dtos/update-recesso.dto";




export class RecessoService {
    constructor(private prismaService: PrismaClient = prisma) { }

    private mapToTRecesso(model: any): TRecesso {
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
        }
    }

    /**
     * Obtém todos os recessos do banco de dados.
     * @returns Uma promessa que resolve para um array de recessos.
     */
    async getAllRecesso(): Promise<TRecesso[]> {
        const itens = await this.prismaService.recesso.findMany(
            {
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
    async createRecesso(recesso: CreateRecessoDto) {
        const {
            descricao,
            processoSei,
            abertoParaFrequencia,
            data_inicio,
            data_fim,
        } = recesso

        try {
            await this.prismaService.recesso.create({
                data: {
                    ano: new Date(`${recesso.ano}-01-01T00:00:00.000Z`),
                    descricao,
                    processoSei,
                    abertoParaFrequencia,
                    DataInicial: data_inicio,
                    dataFinal: data_fim,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao criar recesso. ${error.message}`)
        }
    }


    /**
     * Obtém um recesso pelo ID.
     * @param id - O ID do recesso a ser obtido.
     * @returns Uma promessa que resolve para o recesso encontrado ou null se não for encontrado.
     */
    async getRecessoById(data: TIdRecessoDto): Promise<TRecesso | null> {
        const { id } = data
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(id)

        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${id} não foi encontrado.`)
        }
        return this.mapToTRecesso(oRecessoExiste)
    }

    /**
     * Atualiza um recesso existente no banco de dados.
     * @param id - O ID do recesso a ser atualizado.
     * @param recesso - Os dados atualizados do recesso.
     * @returns Uma promessa que resolve para o recesso atualizado.
     */
    async updateRecesso(data: TIdRecessoDto, recesso: TUpdateRecessoDto) {
        const { id } = data
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(id)
        const {
            ano,
            descricao,
            processoSei,
            abertoParaFrequencia,
            data_inicio,
            data_fim,
        } = recesso
        const dataFormatada = new Date(`${ano}-01-01T00:00:00.000Z`).toISOString()
        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${id} não foi encontrado.`)
        }


        try {
            return await this.prismaService.recesso.update({
                where: {
                    id: oRecessoExiste.id,
                },
                data: {
                    ano: dataFormatada,
                    descricao,
                    processoSei,
                    abertoParaFrequencia,
                    DataInicial: data_inicio,
                    dataFinal: data_fim,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao atualizar processo Sei do recesso com ID ${id}. ${error.message}`)
        }
    }

    async deleteUmRecesso(id: TIdRecessoDto) {
        const { id: idRecesso } = id
        // verifica se o recesso existe
        const oRecessoExiste = await this.verificaSeRecessoExiste(idRecesso)

        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${idRecesso} não foi encontrado.`)
        }
        try {
            await this.prismaService.recesso.delete({
                where: {
                    id: oRecessoExiste.id,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao deletar recesso com ID ${idRecesso}. ${error.message}`)
        }
    }

    /**
     * Verifica se um recesso existe com o ID fornecido.
     * @param id - O ID do recesso a ser verificado.
     * @returns Uma promessa que resolve para o recesso encontrado ou null se não for encontrado.
     */
    private async verificaSeRecessoExiste(id: string): Promise<any | null> {
        return await this.prismaService.recesso.findUnique({
            where: {
                id,
            }
        })
    }

    async criarSolicitacaoPorMatriculaChefe(params: { escalaId: string; criadorId: string; chefeMatricula: string; motivo?: string }) {
        const { escalaId, criadorId, chefeMatricula, motivo } = params
        try {
            const chefe = await this.prismaService.funcionario.findUnique({
                where: { matricula: chefeMatricula },
                select: { id: true, role: true }
            })
            if (!chefe) {
                throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`)
            }
            const solicitacao = await this.prismaService.solicitacao.create({
                data: {
                    escalaId,
                    criadorId,
                    aprovadorId: chefe.id,
                    motivo: motivo ?? null,
                }
            })
            return solicitacao
        } catch (error: any) {
            throw new Error(`Erro ao criar solicitação por matrícula do chefe. ${error.message}`)
        }
    }

    async criarEscalaParaRecesso(params: { recessoId: string; nome: string; lotacaoId: string; dataEscala: Date | string; recebePagamento?: boolean; escalado?: boolean }) {
        const { recessoId, nome, lotacaoId, dataEscala, recebePagamento, escalado } = params
        try {
            const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true } })
            if (!recesso) throw new Error(`Recesso ${recessoId} não encontrado.`)
            const lotacao = await this.prismaService.lotacao.findUnique({ where: { id: lotacaoId }, select: { id: true } })
            if (!lotacao) throw new Error(`Lotação ${lotacaoId} não encontrada.`)
            const dataValida = (dataEscala instanceof Date) ? dataEscala : new Date(dataEscala)
            if (!(dataValida instanceof Date) || isNaN(dataValida.getTime())) {
                throw new Error('dataEscala inválida. Use uma data ISO válida (YYYY-MM-DD).')
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
            })
            return escala
        } catch (error: any) {
            throw new Error(`Erro ao criar escala para recesso. ${error.message}`)
        }
    }

    async associarEscalaAoRecesso(params: { escalaId: string; recessoId: string }) {
        const { escalaId, recessoId } = params
        try {
            const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true } })
            if (!recesso) throw new Error(`Recesso ${recessoId} não encontrado.`)
            const escalaExiste = await this.prismaService.escala.findUnique({ where: { id: escalaId }, select: { id: true } })
            if (!escalaExiste) throw new Error(`Escala ${escalaId} não encontrada.`)
            const escala = await this.prismaService.escala.update({
                where: { id: escalaId },
                data: { recessoId }
            })
            return escala
        } catch (error: any) {
            throw new Error(`Erro ao associar escala ao recesso. ${error.message}`)
        }
    }



}
