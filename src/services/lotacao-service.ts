import { PrismaClient } from "../generated/prisma";
import { prisma } from "../config/prisma";
import { CreateLotacaoDto } from "../dtos/lotacao/create-lotacao.dto";
import { PatchLotacaoDto } from "../dtos/lotacao/patch-lotacao.dto";




export class LotacaoService {
    constructor(private prismaService: PrismaClient = prisma) { }

    /**
     * Retorna todas as lotações.
     * @returns {Promise<LotacaoEntity[]>} Uma promessa que resolve para um array de entidades de lotação.
     * @throws {Error} Se ocorrer um erro ao buscar todas as lotações.
     */
    async getAllLotacao() {
        try {
            return  await this.prismaService.lotacao.findMany()
        } catch (error) {
            throw new Error(`Erro ao buscar todas as lotações. ${error}`)
        }
    }

    async buscarPorNome(nome: string) {
        try {
            return await this.prismaService.lotacao.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' as any } }
            })
        } catch (error: any) {
            throw new Error(`Erro ao buscar lotação por nome. ${error.message || error}`)
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
            return  await this.prismaService.lotacao.findUnique({
                where: {
                    id,
                }
            })
        } catch (error) {
            throw new Error(`Erro ao buscar lotação por ID. ${error}`)
        }
    }


    /**
     * Cria uma nova lotação.
     * @param lotacao A entidade de lotação a ser criada.
     * @returns {Promise<LotacaoEntity>} Uma promessa que resolve para a entidade de lotação criada.
     * @throws {Error} Se ocorrer um erro ao criar a lotação.
     */

    async createLotacao(lotacao: CreateLotacaoDto) {
        try {
            return  await this.prismaService.lotacao.create({
                data: lotacao
            })
        } catch (error) {
            throw new Error(`Erro ao criar lotação. ${error}`)
        }
    }

    async updateLotacao(id: string, lotacao: PatchLotacaoDto) {
        try {
            return  await this.prismaService.lotacao.update({
                where: {
                    id,
                },
                data: lotacao
            })
        } catch (error) {
            throw new Error(`Erro ao atualizar lotação. ${error}`)
        }
    }

    async deleteLotacao(id: string) {
        try {
            await this.prismaService.lotacao.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            throw new Error(`Erro ao deletar lotação. ${error}`)
        }
    }

    async importLotacoesFromSarh(): Promise<{ recebidos: number; criados: number; atualizados: number; ignorados: number; erros: string[] }>{
        try {
            const rows = await this.prismaService.$queryRawUnsafe<Array<{ SIGLA: string | null; LOTACAO: string | null }>>(
                'SELECT DISTINCT "SIGLA","LOTACAO" FROM "sarh_funcionario" WHERE "SIGLA" IS NOT NULL AND "LOTACAO" IS NOT NULL'
            )
            const recebidos = rows.length
            const map: Map<string, { nome: string; codigo: string }> = new Map()
            for (const r of rows) {
                const nome = String(r.LOTACAO || '').trim()
                const codigo = String(r.SIGLA || '').trim()
                if (!nome || !codigo) continue
                if (!map.has(nome)) map.set(nome, { nome, codigo })
            }
            const erros: string[] = []
            let criados = 0
            let atualizados = 0
            const ignorados = recebidos - map.size
            for (const item of map.values()) {
                try {
                    const exists = await this.prismaService.lotacao.findUnique({ where: { nome: item.nome } })
                    if (exists) {
                        await this.prismaService.lotacao.update({ where: { id: exists.id }, data: { codigo: item.codigo } })
                        atualizados++
                    } else {
                        await this.prismaService.lotacao.create({ data: { nome: item.nome, codigo: item.codigo } })
                        criados++
                    }
                } catch (e: any) {
                    erros.push(e?.message || String(e))
                }
            }
            return { recebidos, criados, atualizados, ignorados, erros }
        } catch (error: any) {
            throw new Error(`Erro ao importar lotações do SARH. ${error.message || error}`)
        }
    }
    
    
}
