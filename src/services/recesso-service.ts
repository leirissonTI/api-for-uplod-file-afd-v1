import { PrismaClient } from "@prisma/client";
import { TRecesso } from "../types/TRecesso";
import { CreateRecessoDto } from "../dtos/create-recesso.dto";
import { TIdRecessoDto } from "../dtos/id-recesso.dto";
import { TUpdateRecessoDto } from "../dtos/update-recesso.dto";




export class RecessoService {
    constructor(private prismaService: PrismaClient) { }

    /**
     * Obtém todos os recessos do banco de dados.
     * @returns Uma promessa que resolve para um array de recessos.
     */
    async getAllRecesso(): Promise<TRecesso[]> {
        return await this.prismaService.recesso.findMany()
    }

    /**
     * Cria um novo recesso no banco de dados.
     * @param recesso - Os dados do recesso a ser criado.
     * @returns Uma promessa que resolve para o recesso criado.
     */
    async createRecesso(recesso: CreateRecessoDto) {
        const {
            ano,
            descricao,
            processoSei,
            abertoParaFrequencia,
            data_inicio,
            data_fim,
        } = recesso

        try {
            await this.prismaService.recesso.create({
                data: {
                    ano,
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
        return oRecessoExiste
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

        if (!oRecessoExiste) {
            throw new Error(`Recesso com ID ${id} não foi encontrado.`)
        }
        try {
            await this.prismaService.recesso.update({
                where: {
                    id: oRecessoExiste.id,
                },
                data: {
                    ano,
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
    private async verificaSeRecessoExiste(id: string): Promise<TRecesso | null> {
        return await this.prismaService.recesso.findUnique({
            where: {
                id,
            }
        })
    }



}