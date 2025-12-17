## Objetivo

Adicionar logs detalhados e estruturados ao método `getAllSolicitacoes()` para identificar onde horários não estão sendo preenchidos e onde a integração com `EspelhoDiario` falha.

## Estratégia de Logging

* Nível `info` para contagens e marcos

* Nível `debug` para dados por item (condensados)

* Nível `warn` para ausências (CPF/dados do espelho)

* Nível `error` para exceções/parsing

* Carimbo de tempo em cada log

## Pontos de Log e Mensagens

1. Início do método

* Log: `[getAllSolicitacoes] start ts=<Date.now()>`

1. Carregamento de solicitações

* Após o fetch: `[getAllSolicitacoes] solicitacoesBrutas.count=<n>`

* Primeiro/último `dia` (se existirem): `[getAllSolicitacoes] range.dia=<min>..<max>`

1. Coleta de matrículas e resolução de CPFs (se houver)

* `[getAllSolicitacoes] matriculas.unique.count=<n>`

* Após consulta ao SARH: `[getAllSolicitacoes] cpf.resolvidos=<n> faltantes=<m>`

* Para faltantes: `warn` por amostragem (máx 5): `[SARH] cpf.missing matricula=<mat>`

1. Preparação de datas e meses alvo

* `[getAllSolicitacoes] datas.unique.count=<n> cpfs.usados.count=<n>`

* Falha de parsing de data para `dataStr`: `error` com `id/matricula/dia`

1. Busca batelada de espelhos

* Antes de iniciar batches: `[Espelho] batching cpfsBatches=<x> datasBatches=<y>`

* Por batch: `[Espelho] batch idx=<i> cpfs=<n> datas=<m>`

* Após `Promise.all`: `[Espelho] rows.total=<k>`

1. Índice de pontos (`Map<cpf|data, horários>`)

* `[Index] keys.count=<n>`

1. Integração por solicitação

* Para cada item:

  * `[Merge] id=<id> mat=<mat> cpf=<cpf||N/D> data=<DD/MM/YYYY>`

  * Se não encontrou ponto: `warn` `[Merge] missing espelho cpf=<cpf> data=<dataStr>`

  * Contagem de campos preenchidos: `[Merge] filled.count=<c>`

1. Formatação `HH:mm`

* Após enriquecer: `[Format] done entries=<n>`

1. Retorno

* `[getAllSolicitacoes] end total=<n> filled.total=<sum>`

1. Captura de exceções

* `catch(e)`: `[getAllSolicitacoes] error msg=<e.message> stack=<e.stack?>`

## Inserção de Logs no Fluxo

* Logo no início/fim do método

* Após cada operação assíncrona (`findMany`, `queryRawUnsafe`, `Promise.all`)

* Dentro dos loops críticos (com limitação de logs por item para não inundar, ex.: logar apenas os primeiros 100 itens com `debug`)

## Métricas Adicionais

* Tempo de execução por etapa (usar `const t0 = Date.now()` e `Date.now() - t0`)

* Tamanho de chunks usados

* Percentual de solicitações com horários preenchidos

## Exemplo de Instrumentação (esqueleto)

```ts
const ts = () => new Date().toISOString()
console.info(`[getAllSolicitacoes] start ts=${ts()}`)
const solicitacoesBrutas = await prisma.solicitacao.findMany({ ... })
console.info(`[getAllSolicitacoes] solicitacoesBrutas.count=${solicitacoesBrutas.length}`)

// montar cpfsPorMatricula (se aplicável)
console.info(`[getAllSolicitacoes] matriculas.unique.count=${matriculas.size}`)
console.info(`[getAllSolicitacoes] cpf.resolvidos=${cpfPorMatricula.size} faltantes=${matriculas.size - cpfPorMatricula.size}`)

// preparar datas
console.info(`[getAllSolicitacoes] datas.unique.count=${datasSet.size} cpfs.usados.count=${cpfsUsados.size}`)

// buscar espelhos
console.info(`[Espelho] batching cpfsBatches=${numBatchCpfs} datasBatches=${numBatchDatas}`)
const pontos_diariosResolvidos = (await Promise.all(pontos_diarios)).flat()
console.info(`[Espelho] rows.total=${pontos_diariosResolvidos.length}`)

// índice
console.info(`[Index] keys.count=${pontosMap.size}`)

let totalFilled = 0
const resultado = solicitacoesBrutas.map((s, i) => {
  const cpf = cpfPorMatricula.get(s.servidorMatricula || '')
  const dataStr = /* DD/MM/YYYY */
  const p = cpf ? pontosMap.get(`${cpf}|${dataStr}`) : undefined
  let filled = 0
  /* preencher campos */
  totalFilled += filled
  if (i < 100) console.debug(`[Merge] id=${s.id} mat=${s.servidorMatricula} cpf=${cpf||'N/D'} data=${dataStr} filled=${filled}`)
  if (!p) console.warn(`[Merge] missing espelho cpf=${cpf||'N/D'} data=${dataStr}`)
  return enriched
})
console.info(`[Format] done entries=${resultado.length}`)
console.info(`[getAllSolicitacoes] end total=${resultado.length} filled.total=${totalFilled} ts=${ts()}`)
```

## Resultado Esperado

* Visibilidade completa de cada etapa

* Identificação rápida de gargalos (faltando CPF, data não encontrada no espelho, parsing inválido)

* Base para otimizações

