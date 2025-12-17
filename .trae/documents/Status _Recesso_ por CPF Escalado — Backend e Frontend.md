## Escopo e Decisões
- Apenas CPFs escalados no recesso recebem status: `statusRecesso = 'RECESSO'`.
- Adicionar filtro opcional por setor (`SIGLA`) no endpoint.
- Incluir `statusRecesso` nas exportações (CSV/PDF) do dashboard.

## Backend — Implementação
1. Endpoint de Status
- `GET /api/v1/dashboard/status-recesso?recessoId=<id>&setor=<SIGLA?>`
- Retorna somente escalados com `{ cpf, matricula, nome, setor, statusRecesso: 'RECESSO' }`.
- Fontes:
  - `Escala` por `recessoId` no período do recesso
  - Resolve CPF: `servidorMatricula` → `sarh_funcionario.CPF`; fallback via `Solicitacao`/`Funcionario`.
- Filtro `setor` (SIGLA) aplicado na junção com `sarh_funcionario`.

2. Resumo de Servidores
- `GET /api/v1/dashboard/servidores-resumo?recessoId=<id>&meses=...`
- Acrescentar `statusRecesso` (somente para escalados; omitir para os não escalados).
- Manter somas de horas (fallback via `EspelhoDiario`).

3. Exportações
- Acrescentar `statusRecesso` às estruturas retornadas para que o frontend inclua nas exportações CSV/PDF.
- Para CSV/JSON do frontend, garantir chave presente no payload do resumo.

4. Validações
- Zod: `recessoId` obrigatório; `setor` opcional (SIGLA).
- Respostas padronizadas `{ success, message, data }`.

## Frontend — Ajustes
- Mostrar badge "Recesso" nas listas (resumo, frequências, status por setor).
- Filtros por `setor` e por presença de `statusRecesso`.
- Exportar CSV/PDF incluindo coluna `statusRecesso`.

## Edge Cases
- Escalas sem `servidorMatricula`: resolver via `Solicitacao`/`Funcionario`.
- Datas fora do intervalo do recesso: ignorar.
- CPFs não resolvidos: resultado não inclui status.

## Testes
- Unit: resolução de CPF, filtro por `SIGLA`, marcação de status.
- Integração: endpoints entregando somente escalados, com filtro e `statusRecesso` preenchido.
- E2E: exibição de badge e inclusão nas exportações.

Confirmação: iniciarei a implementação dos endpoints, atualização do resumo e suporte a exportações com `statusRecesso` conforme definido.