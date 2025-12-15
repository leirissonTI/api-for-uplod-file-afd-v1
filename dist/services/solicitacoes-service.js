"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacoesService = void 0;
const prisma_1 = require("../config/prisma");
const fs_1 = __importDefault(require("fs"));
class SolicitacoesService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    async getAllSolicitacoes() {
        try {
            console.log('[Solicitacao] Listando todas as solicitações');
            const solicitacoes = await this.prismaService.solicitacao.findMany({
                select: {
                    id: true,
                    status: true,
                    servidorMatricula: true,
                    nomeServidor: true,
                    nomeChefia: true,
                    lotacao: true,
                    dia: true,
                    entrada1: true,
                    saida1: true,
                    entrada2: true,
                    saida2: true,
                    opcao: true,
                    aprovador: { select: { nome: true } },
                    escala: {
                        select: {
                            id: true,
                            nome: true,
                            escalado: true,
                            servidorMatricula: true,
                            dataEscala: true,
                            recebePagamento: true,
                            lotacao: { select: { nome: true } },
                            recesso: { select: { descricao: true } },
                        }
                    }
                }
            });
            console.log(`[Solicitacao] Solicitações carregadas=${solicitacoes.length}`);
            return solicitacoes;
        }
        catch (error) {
            console.log(`[Erro] Falha ao listar solicitações: ${error.message || error}`);
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
    async importFromCsvBackup(filePath, recessoId) {
        const content = fs_1.default.readFileSync(filePath, { encoding: 'utf8' });
        const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (!lines.length)
            return { recebidos: 0, criados: 0, atualizados: 0, erros: [] };
        const delimiter = lines[0].includes(';') ? ';' : ',';
        const headers = lines[0].split(delimiter).map(h => h.trim().toUpperCase());
        const idx = (name) => headers.indexOf(name);
        const iMat = idx('MATRICULA');
        const iNome = idx('NOME');
        const iChefia = idx('NOME_CHEFIA');
        const iLot = idx('LOTACAO');
        const iDia = idx('DIA');
        const iE1 = idx('ENTRADA_1');
        const iS1 = idx('SAIDA_1');
        const iE2 = idx('ENTRADA_2');
        const iS2 = idx('SAIDA_2');
        const iOpc = idx('OPCAO');
        const iSta = idx('STATUS');
        const rows = lines.slice(1);
        const recebidos = rows.length;
        const erros = [];
        let criados = 0;
        let atualizados = 0;
        for (const line of rows) {
            try {
                const cols = line.split(delimiter).map(c => c.trim());
                const matricula = String(cols[iMat] || '').trim();
                const nomeServidor = String(cols[iNome] || '').trim();
                const nomeChefia = String(cols[iChefia] || '').trim();
                const lotacaoTxt = String(cols[iLot] || '').trim();
                const diaStr = String(cols[iDia] || '').trim();
                const e1 = String(cols[iE1] || '').trim();
                const s1 = String(cols[iS1] || '').trim();
                const e2 = String(cols[iE2] || '').trim();
                const s2 = String(cols[iS2] || '').trim();
                const opcaoRaw = String(cols[iOpc] || '').trim().toUpperCase();
                const statusRaw = String(cols[iSta] || '').trim().toUpperCase();
                if (!matricula || !diaStr)
                    continue;
                const dParts = diaStr.split('/');
                const dia = new Date(Number(dParts[2] || 0), Number(dParts[1] || 1) - 1, Number(dParts[0] || 1));
                const toTime = (base, hhmmss) => {
                    if (!hhmmss)
                        return undefined;
                    const m = hhmmss.match(/^(\d{2}):(\d{2}):(\d{2})$/);
                    if (!m)
                        return undefined;
                    const d = new Date(base);
                    d.setHours(Number(m[1] || 0));
                    d.setMinutes(Number(m[2] || 0));
                    d.setSeconds(Number(m[3] || 0));
                    d.setMilliseconds(0);
                    return d;
                };
                let status = 'PENDENTE';
                if (statusRaw === 'VALIDADA' || statusRaw === 'APROVADA')
                    status = 'APROVADA';
                else if (statusRaw === 'REJEITADA' || statusRaw === 'RECUSADA')
                    status = 'RECUSADA';
                else if (statusRaw === 'CANCELADA')
                    status = 'CANCELADA';
                const opcao = opcaoRaw === 'PAGAMENTO' ? 'PAGAMENTO' : (opcaoRaw === 'FOLGA' ? 'FOLGA' : null);
                let lotacaoId;
                if (lotacaoTxt) {
                    const l1 = await this.prismaService.lotacao.findFirst({ where: { OR: [{ nome: lotacaoTxt }, { codigo: lotacaoTxt }] }, select: { id: true } });
                    if (l1)
                        lotacaoId = l1.id;
                    else {
                        const l2 = await this.prismaService.lotacao.create({ data: { nome: lotacaoTxt, codigo: lotacaoTxt } });
                        lotacaoId = l2.id;
                    }
                }
                else {
                    lotacaoId = (await this.prismaService.lotacao.findFirst({ select: { id: true } }))?.id || (await this.prismaService.lotacao.create({ data: { nome: 'N/D' } })).id;
                }
                const func = await this.prismaService.funcionario.findUnique({ where: { matricula }, select: { id: true } });
                const servidorId = func ? func.id : (await this.prismaService.funcionario.create({ data: { nome: nomeServidor || 'N/D', matricula, role: 'USER' } })).id;
                const nomeEscala = `${nomeServidor || 'N/D'} - ${dia.toISOString().slice(0, 10)}`;
                let escala = await this.prismaService.escala.findFirst({ where: { nome: nomeEscala, recessoId }, select: { id: true } });
                if (!escala) {
                    escala = await this.prismaService.escala.create({ data: { nome: nomeEscala, lotacaoId: lotacaoId, recessoId, dataEscala: dia, recebePagamento: false, escalado: true, servidorId, servidorMatricula: matricula } });
                }
                const existente = await this.prismaService.solicitacao.findFirst({ where: { escalaId: escala.id, dia }, select: { id: true } });
                const payload = {
                    escalaId: escala.id,
                    criadorId: servidorId,
                    servidorMatricula: matricula,
                    nomeServidor,
                    nomeChefia: nomeChefia || undefined,
                    lotacao: lotacaoTxt || undefined,
                    dia,
                    entrada1: toTime(dia, e1),
                    saida1: toTime(dia, s1),
                    entrada2: toTime(dia, e2),
                    saida2: toTime(dia, s2),
                    opcao: opcao || undefined,
                    status,
                };
                if (existente) {
                    await this.prismaService.solicitacao.update({ where: { id: existente.id }, data: payload });
                    atualizados++;
                }
                else {
                    await this.prismaService.solicitacao.create({ data: payload });
                    criados++;
                }
            }
            catch (e) {
                erros.push(e?.message || String(e));
            }
        }
        return { recebidos, criados, atualizados, erros };
    }
}
exports.SolicitacoesService = SolicitacoesService;
