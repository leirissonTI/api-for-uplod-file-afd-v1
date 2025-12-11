"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = require("../config/prisma");
class DashboardService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    mesesDoRecesso(recesso) {
        const meses = new Set();
        const add = (d) => meses.add(`${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`);
        add(recesso.DataInicial);
        add(recesso.dataFinal);
        return Array.from(meses);
    }
    hhmm(totalHorasTrabalhadas) {
        const minutos = Math.round((totalHorasTrabalhadas.reduce((a, b) => a + b, 0)) * 60);
        const hh = Math.floor(minutos / 60);
        const mm = Math.abs(minutos % 60);
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    }
    async getResumoServidores(params) {
        const { recessoId } = params;
        const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { descricao: true, DataInicial: true, dataFinal: true } });
        if (!recesso)
            throw new Error(`Recesso ${recessoId} não encontrado.`);
        const mesesAlvo = params.meses ? params.meses.split(',').map(s => s.trim()) : this.mesesDoRecesso(recesso);
        const escalas = await this.prismaService.escala.findMany({
            where: { recessoId },
            select: { id: true, dataEscala: true, servidorId: true, servidorMatricula: true, lotacao: { select: { nome: true } } }
        });
        const mapPorServidor = new Map();
        const escalaIdsPorMes = new Map();
        for (const e of escalas) {
            const mes = `${String(e.dataEscala.getMonth() + 1).padStart(2, '0')}/${e.dataEscala.getFullYear()}`;
            if (!mesesAlvo.includes(mes))
                continue;
            let nome = '';
            let matricula = e.servidorMatricula || '';
            if (e.servidorId) {
                const f = await this.prismaService.funcionario.findUnique({ where: { id: e.servidorId }, select: { nome: true, matricula: true } });
                if (f) {
                    nome = f.nome;
                    matricula = f.matricula;
                }
            }
            if (!nome) {
                // tentar via funcionario pela matrícula
                if (matricula) {
                    const f = await this.prismaService.funcionario.findUnique({ where: { matricula }, select: { nome: true } });
                    if (f)
                        nome = f.nome;
                }
            }
            if (!nome)
                continue;
            const key = `${matricula || 'N/D'}|${nome}`;
            if (!mapPorServidor.has(key)) {
                mapPorServidor.set(key, { nome, matricula: matricula || 'N/D', setor: e.lotacao?.nome || 'N/D', meses: new Map() });
            }
            const entry = mapPorServidor.get(key);
            if (!entry.meses.has(mes))
                entry.meses.set(mes, { escalaIds: [], datas: [] });
            const bucket = entry.meses.get(mes);
            bucket.escalaIds.push(e.id);
            bucket.datas.push(e.dataEscala);
            if (!escalaIdsPorMes.has(mes))
                escalaIdsPorMes.set(mes, []);
            escalaIdsPorMes.get(mes).push(e.id);
        }
        // mapear CPF via sarh_funcionario
        const cpfsPorMatricula = new Map();
        const matriculas = Array.from(mapPorServidor.values()).map(v => v.matricula).filter(m => m && m !== 'N/D');
        if (matriculas.length) {
            // Monta lista segura de matrículas para IN
            const inList = matriculas.map(m => `'${m.replace(/'/g, "''")}'`).join(',');
            const query = `SELECT cpf, matricula, setor FROM sarh_funcionario WHERE matricula IN (${inList})`;
            const resultados = await this.prismaService.$queryRawUnsafe(query);
            for (const r of resultados) {
                cpfsPorMatricula.set(String(r.matricula), { cpf: String(r.cpf), setor: r.setor ? String(r.setor) : undefined });
            }
        }
        // carregar espelho mensal por cpf + meses
        const cpfs = Array.from(cpfsPorMatricula.values()).map(v => v.cpf);
        const mesesComZeroOuSemZero = (m) => {
            const [mm, yy] = m.split('/');
            return [`${mm.padStart(2, '0')}/${yy}`, `${Number(mm)}/${yy}`];
        };
        let espelhos = [];
        if (cpfs.length) {
            const alvoMeses = mesesAlvo.flatMap(m => mesesComZeroOuSemZero(m));
            espelhos = await this.prismaService.espelhoMensal.findMany({
                where: { cpf: { in: cpfs }, mesAno: { in: alvoMeses } },
                select: { cpf: true, mesAno: true, totalHorasTrabalhadas: true, totalHorasDevidas: true }
            });
        }
        // carregar solicitações por mês
        const solicitacoesPorMes = new Map();
        for (const mes of mesesAlvo) {
            const escalaIds = escalaIdsPorMes.get(mes) || [];
            if (!escalaIds.length)
                continue;
            const sol = await this.prismaService.solicitacao.findMany({
                where: { escalaId: { in: escalaIds } },
                select: { status: true, updatedAt: true, aprovador: { select: { nome: true } } }
            });
            solicitacoesPorMes.set(mes, sol.map(s => ({ status: s.status, aprovadorNome: s.aprovador?.nome, updatedAt: s.updatedAt || new Date(0) })));
        }
        const mapStatus = (s) => s === 'APROVADA' ? 'VALIDADA' : (s === 'RECUSADA' ? 'REJEITADA' : (s ? 'PENDENTE' : 'SEM DADOS'));
        const resultados = [];
        for (const [key, val] of mapPorServidor.entries()) {
            const cpf = cpfsPorMatricula.get(val.matricula || '')?.cpf;
            const horasAcumuladas = [];
            for (const mes of mesesAlvo) {
                if (cpf) {
                    const hs = espelhos.filter(e => e.cpf === cpf && e.mesAno.endsWith(mes)).map(e => e.totalHorasTrabalhadas);
                    horasAcumuladas.push(...hs);
                }
            }
            const totalHoras = this.hhmm(horasAcumuladas);
            const dez = mesesAlvo.find(m => m.startsWith('12/'));
            const jan = mesesAlvo.find(m => m.startsWith('01/'));
            const pickUltima = (mes) => {
                const arr = mes ? (solicitacoesPorMes.get(mes) || []) : [];
                if (!arr.length)
                    return { avaliacao: 'N/D', status: 'SEM DADOS' };
                arr.sort((a, b) => (a.updatedAt?.getTime() || 0) - (b.updatedAt?.getTime() || 0));
                const ultimo = arr[arr.length - 1];
                return { avaliacao: ultimo.aprovadorNome || 'N/D', status: mapStatus(ultimo.status) };
            };
            const dezRes = pickUltima(dez);
            const janRes = pickUltima(jan);
            resultados.push({
                nome: val.nome,
                matricula: val.matricula,
                setor: val.setor,
                totalHoras,
                avaliacaoDezembro: dezRes.avaliacao,
                avaliacaoJaneiro: janRes.avaliacao,
                statusDezembro: dezRes.status,
                statusJaneiro: janRes.status,
            });
        }
        return resultados;
    }
}
exports.DashboardService = DashboardService;
