## Objetivo
- Implementar endpoint filtrável por recesso que consolida, por servidor e por mês (Dez/Jan), dados de Escalas, Espelho Mensal e Solicitações, retornando: Nome, Total Horas, Setor, Avaliação Dezembro, Avaliação Janeiro, Status Dezembro, Status Janeiro.

## Modelos/Tabelas Envolvidos
- Funcionario (nome, matrícula)
- Escala (datas, relação com Lotacao e Recesso)
- Lotacao (setor/nome)
- Recesso (período e descrição)
- Solicitacao (criador/aprovador/status por escala)
- EspelhoMensal (espelho de ponto atual, total horas por `mes_ano`, `cpf`) — @@map("espelho_de_atual")
- sarh_funcionario (CPF, matrícula, setor) — tabela de RH para mapear CPF/Setor por matrícula

## Endpoint
- GET `/api/v1/dashboard/servidores-resumo`
- Query params:
  - `recessoId` (obrigatório)
  - `lotacaoId` (opcional)
  - `meses` (opcional CSV `YYYY-MM`; default: meses derivados do recesso)

## Saída
- `{ nome, matricula, setor, totalHoras, avaliacaoDezembro, avaliacaoJaneiro, statusDezembro, statusJaneiro }`
- `totalHoras`: soma dos meses alvo (formatado `HH:MM`)
- `avaliacao*`: nome do aprovador (Solicitacao.aprovador.nome) mais recente do mês
- `status*`: status do mês (APROVADA→VALIDADA, RECUSADA→REJEITADA, PENDENTE→PENDENTE)

## Passo a Passo Técnico
### 1) Derivar Meses do Recesso
- Buscar `Recesso` pelo `recessoId` e derivar meses alvo (tipicamente Dezembro e Janeiro) em `YYYY-MM` com base em `DataInicial` e `dataFinal`.

### 2) Carregar Escalas (filtradas)
- `escala.findMany({ where: { recessoId, lotacaoId? }, select: { id, dataEscala, recebePagamento, servidorId, servidorMatricula, lotacao: { select: { nome } } } })`
- Agrupar por servidor e por mês (`YYYY-MM`), retendo o Setor (Lotacao.nome) predominante.

### 3) Resolver Servidor (Nome/Matrícula)
- Para cada escala:
  - Se `servidorId` → `funcionario.findUnique` (nome/matrícula).
  - Senão, usar `servidorMatricula` e nome do prefixo de `Escala.nome` (parte antes de " - ").
  - Fallback: `Solicitacao.criador` por `escalaId`.

### 4) Mapear CPF/Setor via sarh_funcionario
- `sarh_funcionario` por `matricula` → obter `cpf` e `setor`.
- Se não encontrado, tentar por nome (case-insensitive) como fallback, com aviso.
- Setor final: preferir `Lotacao.nome`; se ausente, usar `sarh_funcionario.setor`.

### 5) Carregar Espelho por CPF + mes_ano
- Em lote: `espelhoMensal.findMany({ where: { cpf: { in: cpfs }, mesAno: { in: meses } }, select: { cpf, mesAno, totalHorasTrabalhadas, total_de_horas_devidas } })`
- Converter/somar horas dos meses alvo; formatar `HH:MM`.

### 6) Carregar Solicitações por Mês
- Para cada mês, com `escalaId` do mês:
  - `solicitacao.findMany({ where: { escalaId: { in: escalaIdsMes } }, select: { status, aprovador: { select: { nome } }, updatedAt } })`
- Escolher o registro mais recente do mês:
  - `status*`: map(APROVADA→VALIDADA, RECUSADA→REJEITADA, PENDENTE→PENDENTE)
  - `avaliacao*`: `aprovador.nome` (se não houver, `"N/D"`)

### 7) Montagem da Resposta
- Consolidar por servidor:
  - `nome`, `matricula`
  - `setor`
  - `totalHoras` (soma Dez/Jan)
  - `avaliacaoDezembro`, `avaliacaoJaneiro`
  - `statusDezembro`, `statusJaneiro`

### 8) Controller/Rotas
- `DashboardController.getResumoServidores`: validações (Zod) e chamada ao serviço.
- `routes/dashboard-routes.ts`: `GET /servidores-resumo`.
- Registrar em `routes/index.ts` (`routes.use('/dashboard', dashboardRoutes)`).

### 9) Validações e Edge Cases
- Sem escalas no recesso: não incluir servidor.
- Matrícula sem `sarh_funcionario`: `totalHoras = "00:00"`, avaliações `"N/D"`, status `"SEM DADOS"` para meses alvo; log de aviso.
- Meses sem espelho/solicitação: preencher com defaults.

### 10) Performance
- Consultas em lote (`in`) para `cpf`, `mes_ano`, `escalaId`.
- Índices importantes: `Escala(recessoId, lotacaoId)`, `sarh_funcionario(matricula, cpf)`, `EspelhoMensal(cpf, mesAno)`.

### 11) Testes
- Unit tests para agregação: fixtures de escalas (Dez/Jan), sarh_funcionario, espelho e solicitações.
- Casos: servidor sem cpf; múltiplas solicitações no mês; somente Dezembro com dados.

## Confirmação
- Validar o uso de `sarh_funcionario` para obter `cpf` (e setor) via matrícula e realizar junção com `EspelhoMensal`.
- Confirmar o mapeamento de status para os rótulos do exemplo e a derivação de `avaliacao*` pelo `aprovador.nome` mais recente do mês.