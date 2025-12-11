export type TDashboardServidorResumoItem = {
  nome: string
  matricula: string
  setor: string
  totalHoras: string
  avaliacaoDezembro: string
  avaliacaoJaneiro: string
  statusDezembro: string
  statusJaneiro: string
}

export type TApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type TDashboardServidorResumoResponse = TApiResponse<TDashboardServidorResumoItem[]>
