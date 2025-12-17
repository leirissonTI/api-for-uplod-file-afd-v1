export interface AprovadorResumo {
  nome: string
}

export interface EscalaLotacaoResumo {
  nome: string
}

export interface EscalaRecessoResumo {
  descricao: string
}

export interface EscalaResumo {
  id: string
  nome: string
  escalado: boolean
  servidorMatricula: string | null
  dataEscala: string | Date
  recebePagamento: boolean
  lotacao: EscalaLotacaoResumo
  recesso: EscalaRecessoResumo
}

export type SolicitacaoStatus = 'PENDENTE' | 'APROVADA' | 'RECUSADA' | 'CANCELADA'
export type SolicitacaoOpcao = 'PAGAMENTO' | 'FOLGA' | null

export interface SolicitacaoIntegrada {
  id: string
  status: SolicitacaoStatus
  servidorMatricula: string
  nomeServidor: string
  nomeChefia: string
  lotacao: string
  dia: string | Date
  entrada1: string | null
  saida1: string | null
  entrada2: string | null
  saida2: string | null
  opcao: SolicitacaoOpcao
  aprovador: AprovadorResumo | null
  escala: EscalaResumo
  primeiraEntrada: string | null
  primeiraSaida: string | null
  segundaEntrada: string | null
  segundaSaida: string | null
}
