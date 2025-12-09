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
            const rows = await this.prismaService.escala.findMany({
                select: {
                    id: true,
                    nome: true,
                    lotacaoId: true,
                    dataEscala: true,
                    recebePagamento: true,
                    escalado: true,
                    createdAt: true,
                    updatedAt: true,
                    recessoId: true,
                },
                orderBy: [{ dataEscala: 'asc' }, { nome: 'asc' }],
            });
            return rows.map(r => ({
                id: r.id,
                nome: r.nome,
                lotacaoId: r.lotacaoId,
                dataEscala: r.dataEscala,
                recebePagamento: r.recebePagamento,
                escalado: r.escalado,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt ?? null,
                recessoId: r.recessoId,
            }));
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas as escalas. ${error.message || error}`);
        }
    }
    async getResumoEscalaServidor(params) {
        const { recessoId, servidorId, servidorMatricula } = params;
        const servidor = servidorId
            ? await this.prismaService.funcionario.findUnique({ where: { id: servidorId } })
            : await this.prismaService.funcionario.findUnique({ where: { matricula: String(servidorMatricula) } });
        if (!servidor)
            throw new Error('Servidor não encontrado');
        const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { descricao: true } });
        if (!recesso)
            throw new Error('Recesso não encontrado');
        const registros = await this.prismaService.solicitacao.findMany({
            where: {
                criadorId: servidor.id,
                escala: { recessoId }
            },
            select: {
                escala: {
                    select: {
                        dataEscala: true,
                        recebePagamento: true,
                        recessoId: true,
                    }
                }
            }
        });
        const todasDatas = registros.map(r => r.escala.dataEscala).filter(Boolean).sort((a, b) => a.getTime() - b.getTime());
        const datasPagamento = registros.filter(r => r.escala.recebePagamento).map(r => r.escala.dataEscala).sort((a, b) => a.getTime() - b.getTime());
        const datasFolga = registros.filter(r => !r.escala.recebePagamento).map(r => r.escala.dataEscala).sort((a, b) => a.getTime() - b.getTime());
        const format = (d) => {
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            return `${dd}/${mm}`;
        };
        const agruparPorMes = (datas) => {
            const grupos = {};
            for (const d of datas) {
                const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                if (!grupos[chave])
                    grupos[chave] = [];
                grupos[chave].push(d);
            }
            return Object.values(grupos).map(arr => {
                arr.sort((a, b) => a.getTime() - b.getTime());
                const ini = arr[0];
                const fim = arr[arr.length - 1];
                return `${format(ini)} a ${format(fim)}`;
            });
        };
        const periodoEscalado = agruparPorMes(todasDatas);
        const preferenciaPagamento = agruparPorMes(datasPagamento);
        const preferenciaFolga = agruparPorMes(datasFolga);
        return {
            matricula: servidor.matricula,
            nome: servidor.nome,
            recesso: recesso.descricao,
            periodoEscalado,
            preferenciaFolga,
            preferenciaPagamento,
        };
    }
    async getEscalasPorRecessoDescricao(descricao) {
        const rows = await this.prismaService.escala.findMany({
            where: {
                recesso: {
                    descricao: { equals: descricao, mode: 'insensitive' }
                }
            },
            select: {
                id: true,
                nome: true,
                lotacaoId: true,
                dataEscala: true,
                recebePagamento: true,
                escalado: true,
                createdAt: true,
                updatedAt: true,
                recessoId: true,
                recesso: { select: { DataInicial: true, dataFinal: true } },
            },
            orderBy: [{ dataEscala: 'asc' }, { nome: 'asc' }],
        });
        const businessDaysBetween = (start, end) => {
            const fmt = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
            const dates = [];
            const cur = new Date(start);
            cur.setHours(0, 0, 0, 0);
            const stop = new Date(end);
            stop.setHours(0, 0, 0, 0);
            while (cur <= stop) {
                const day = cur.getDay(); // 0=Sun ... 6=Sat
                if (day !== 0 && day !== 6) {
                    dates.push(fmt(cur));
                }
                cur.setDate(cur.getDate() + 1);
            }
            return dates;
        };
        return rows.map(r => ({
            id: r.id,
            nome: r.nome,
            lotacaoId: r.lotacaoId,
            dataEscala: r.dataEscala,
            recebePagamento: r.recebePagamento,
            escalado: r.escalado,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt ?? null,
            recessoId: r.recessoId,
            label: businessDaysBetween(r.recesso.DataInicial, r.recesso.dataFinal),
        }));
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
        const { nome, lotacaoId, recessoId, dataEscala, diasEscala, receberPagamento, escalado, servidorId, servidorMatricula, chefeId, chefeMatricula, motivo } = data;
        const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true, DataInicial: true, dataFinal: true } });
        if (!recesso)
            throw new Error(`Recesso ${recessoId} não encontrado.`);
        const lotacao = await this.prismaService.lotacao.findUnique({ where: { id: lotacaoId }, select: { id: true } });
        if (!lotacao)
            throw new Error(`Lotação ${lotacaoId} não encontrada.`);
        const datas = [];
        if (diasEscala && diasEscala.length > 0) {
            for (const d of diasEscala) {
                const v = d instanceof Date ? d : new Date(d);
                if (!(v instanceof Date) || isNaN(v.getTime()))
                    throw new Error('diasEscala contém data inválida');
                datas.push(v);
            }
        }
        else if (dataEscala) {
            const v = dataEscala instanceof Date ? dataEscala : new Date(dataEscala);
            if (!(v instanceof Date) || isNaN(v.getTime()))
                throw new Error('dataEscala inválida. Use uma data ISO válida (YYYY-MM-DD).');
            datas.push(v);
        }
        else {
            throw new Error('Informe dataEscala ou diasEscala');
        }
        let criadorIdFinal = servidorId || null;
        if (!criadorIdFinal && servidorMatricula) {
            const srv = await this.prismaService.funcionario.findUnique({ where: { matricula: servidorMatricula }, select: { id: true } });
            if (!srv)
                throw new Error(`Servidor com matrícula ${servidorMatricula} não encontrado.`);
            criadorIdFinal = srv.id;
        }
        let aprovadorIdFinal = chefeId || null;
        if (!aprovadorIdFinal && chefeMatricula) {
            const ch = await this.prismaService.funcionario.findUnique({ where: { matricula: chefeMatricula }, select: { id: true } });
            if (!ch)
                throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`);
            aprovadorIdFinal = ch.id;
        }
        const resultados = [];
        for (const dt of datas) {
            if (dt < recesso.DataInicial || dt > recesso.dataFinal) {
                resultados.push({ erro: `Data fora do período do recesso: ${dt.toISOString().slice(0, 10)}` });
                continue;
            }
            const nomeFinal = `${nome} - ${dt.toISOString().slice(0, 10)}`;
            try {
                const escala = await this.prismaService.escala.create({
                    data: {
                        nome: nomeFinal,
                        lotacaoId,
                        recessoId,
                        dataEscala: dt,
                        recebePagamento: !!receberPagamento,
                        escalado: !!escalado,
                    }
                });
                if (criadorIdFinal) {
                    await this.prismaService.solicitacao.create({
                        data: {
                            escalaId: escala.id,
                            criadorId: criadorIdFinal,
                            aprovadorId: aprovadorIdFinal || null,
                            motivo: motivo || undefined,
                        }
                    });
                }
                resultados.push({ criada: escala });
            }
            catch (error) {
                if (error.code === 'P2002') {
                    resultados.push({ skip: true });
                    continue;
                }
                resultados.push({ erro: error.message });
            }
        }
        const created = resultados.filter(r => r.criada).length;
        const skipped = resultados.filter(r => r.skip).length;
        const erros = resultados.filter(r => r.erro).map(r => r.erro);
        return { created, skipped, erros, escalas: resultados.filter(r => r.criada).map(r => r.criada) };
    }
    async updateEscala(id, data) {
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
            return await this.prismaService.escala.update({
                where: { id },
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
            throw new Error(`Erro ao atualizar escala. ${error.message}`);
        }
    }
    async deleteEscala(id) {
        try {
            return await this.prismaService.escala.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(`Erro ao deletar escala. ${error}`);
        }
    }
}
exports.EscalaService = EscalaService;
