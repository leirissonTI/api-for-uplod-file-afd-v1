## Objetivo
- Atualizar o fluxo de aprovação de escala para registrar e vincular informações de frequência diária dentro do modelo `Solicitacao`, garantindo relações com `Escala`, `sarh_funcionario` e `EspelhoDiario`.

## Campos de Frequência (Solicitacao)
- Novos atributos obrigatórios mapeados:
  - `matricula` (String)
  - `nome` (String)
  - `nomeChefia` (String)
  - `lotacao` (String)
  - `dia` (DateTime) — data do dia da frequência (derivada da data da escala)
  - `entrada1` (String, formato HH:MM ou "-")
  - `saida1` (String)
  - `entrada2` (String)
  - `saida2` (String)
  - `opcao` (Enum: FOLGA | PAGAMENTO)
  - `status` (SolicitacaoStatus já existente)
- Relacionamento adicional:
  - `espelhoDiarioId` (Int?) e `espelhoDiario` (relation) — vincula ao registro de `EspelhoDiario` do dia.

## Relacionamentos e Integração
- `Solicitacao` → `Escala`: já existente; mantém `onDelete: Cascade`.
- `Solicitacao` → `Funcionario` (criador/aprovador): já existente.
- `Solicitacao` → `EspelhoDiario`: novo relation via `espelhoDiarioId`.
- `sarh_funcionario`: tabela externa (sem chave única, @@ignore). Usaremos consultas raw para obter `cpf`/setor a partir da `matricula` e cruzar com `EspelhoMensal/EspelhoDiario`.

## Fontes e Junções
- `Escala`: `dataEscala`, `lotacao.nome`, `servidorId`/`servidorMatricula` para popular `matricula`, `nome` e `lotacao`.
- `Funcionario`: resolve `nome` do servidor e do chefe por `id`/`matricula`.
- `sarh_funcionario`: via raw SQL (`SELECT cpf, matricula, lotacao FROM sarh_funcionario WHERE matricula IN (...)`) para obter `cpf` e `lotacao` (fallback).
- `EspelhoDiario`: localizar por `cpf` + `mesAno` + `diaDoMes` (derivados de `dia`). Se existir, setar `espelhoDiarioId` e opcionalmente preencher `entrada1/saida1/entrada2/saida2`.

## Fluxo de Criação/Atualização
1. Quando criar escala (uma ou várias datas):
   - Para cada `dataEscala` dentro do período do recesso, criar `Solicitacao` preenchendo campos de frequência:
     - `matricula`, `nome` (servidor), `nomeChefia` (chefe), `lotacao` (da escala), `dia` (date), `opcao` (derivada dos arrays por dia ou do flag global), `status` default `PENDENTE`.
   - Tentar resolver `cpf` via `sarh_funcionario` para buscar `EspelhoDiario` do dia:
     - Se encontrado, vincular `espelhoDiarioId` e opcionalmente copiar entradas/saídas.
2. Endpoint de ajuste manual da frequência (opcional):
   - `PATCH /solicitacoes/:id/frequencia` com payload `{entrada1, saida1, entrada2, saida2, opcao, status}` para correções.

## DTOs/Validação
- Criar `createFrequenciaSolicitacao.dto.ts`/`updateFrequenciaSolicitacao.dto.ts` com Zod:
  - Validação de formatos `HH:MM` ou "-".
  - `opcao` como enum (`FOLGA` | `PAGAMENTO`).
  - `dia` como Date coerced.

## Consultas Auxiliares
- Funções utilitárias:
  - Normalização de data para `mesAno` (`MM/YYYY`) e `diaDoMes` (`DD`).
  - Mapeamento de matrícula→cpf (cache simples por requisição).

## Atualizações nos Serviços
- `EscalaService.createEscalaServidor`:
  - Popular novos campos de frequência na `Solicitacao` criada.
  - Resolver `cpf` e vincular `EspelhoDiario` quando disponível.
- `SolicitacoesService` (novo ou existente):
  - Métodos para atualização de frequência, mudança de `status` e auditoria.

## Segurança/Integridade
- Garantir que `dia` pertence ao período do recesso da `Escala` vinculada.
- Se não encontrar `sarh_funcionario` para a matrícula, registrar `matricula/nome/lotacao` e prosseguir sem `espelhoDiarioId`.
- Logs para casos sem correspondência de `cpf` ou `EspelhoDiario`.

## Desempenho
- Consultas em lote para `sarh_funcionario` e `EspelhoDiario` (por conjunto de matrículas/dias).
- Índices já presentes em `Escala` e `Solicitacao`; avaliar índice em `EspelhoDiario (cpf, mesAno, diaDoMes)` se necessário.

## Testes
- Criar cenários de:
  - Criação de escala com múltiplos dias, gerando solicitações com frequência.
  - Vinculação correta ao `EspelhoDiario` quando `cpf` existe.
  - Fallback quando não há `sarh_funcionario` ou `EspelhoDiario`.
  - Atualização de frequência via endpoint e transição de `status`.

## Entregáveis
- Schema Prisma atualizado com campos e relação a `EspelhoDiario` em `Solicitacao`.
- Serviços ajustados para criação automática de frequência.
- DTOs de validação Zod.
- (Opcional) Endpoint para ajuste de frequência.

## Confirmação
- Confirmar que a coleta de entradas/saídas deve vir do `EspelhoDiario` quando existir; caso contrário, ficam vazias ou "-" até ajuste.
- Confirmar se o endpoint de ajuste manual deve ser implementado nesta entrega ou em etapa posterior.