## Validação do Estado Atual
- Recesso: implementado (CRUD, datas início/fim) e usado nas escalas.
- Escalas: vinculadas ao recesso; solicitações por dia são geradas com campos de frequência básicos.
- Solicitações: possuem `status`, `aprovadorId` e vínculo a `Escala`; campos de frequência (matricula, nome, chefia, lotação, dia, entradas/saídas, opcao) já presentes; relação opcional ao `EspelhoDiario`.
- Dashboard: resumo por recesso e JOIN Escala×Espelho; SARH usado via raw.
- Perfis: `Role` enum com `USER`, `CHEFE`, `ADMIN`; perfis específicos `admin_sepag/admin_secap` podem ser modelados como roles adicionais ou claims.

## Modelo de Dados (Proposto)
### Novas Entidades
- Frequencia:
  - Campos: `id`, `recessoId`, `servidorId|servidorMatricula`, `chefiaId|chefeMatricula`, `statusDez` (1/2/3), `statusJan` (1/2/3), `dataDisponDez`, `dataDisponJan`, `dataAvalDez`, `dataAvalJan`, `avaliadorDezId`, `avaliadorJanId`, `totalDobroDez`, `totalDobroJan`, `sobraHorasDez`, `sobraHorasJan`, audit.
  - Relações: `Recesso`, `Funcionario` (servidor/avaliadores).
- Evento (diário por Frequencia):
  - Campos: `id`, `frequenciaId`, `data`, `entrada1`, `saida1`, `entrada2`, `saida2`, `opcao` (1=folga, 0=pagamento), `totalMinutos`, `totalMinutosDobro`.
- Avaliacao (por mês):
  - Campos: `id`, `frequenciaId`, `mes` (`12`/`1`), `avaliadorId`, `dataDispon`, `dataAvaliacao`, `status` (1/2/3), observações.
  - Alternativa: manter em `Frequencia` (campos separados para dez/jan) se preferir simplicidade.
- Status (auxiliar):
  - Tabela de referência para códigos 1/2/3 e descrições exibidas em relatórios.

### Integração com Existentes
- Reuso de `Recesso` e `Funcionario` (Servidor/Chefia/Avaliadores).
- SARH: continuar via raw para obter `cpf/setor` quando necessário.
- EspelhoDiario: vínculo opcional por dia para enriquecer Eventos.

## Endpoints
### Área Comum (Servidor)
- `POST /frequencias` cria frequência para um recesso (valida que não exista uma ativa para o servidor).
- `GET /frequencias?recessoId` lista frequências do servidor no recesso.
- `POST /frequencias/:id/eventos` adiciona/atualiza eventos diários.
- `POST /frequencias/:id/disponibilizar?mes=12|01` fecha mês para avaliação; grava `dataDispon` e status=2.
- `POST /frequencias/:id/reabrir?mes=12|01` reabre mês (se status≠3); limpa `dataDispon` e volta status=1.
- `GET /frequencias/:id/pdf?mes=12|01` gera PDF do mês.

### Chefia (Avaliador)
- `GET /avaliacoes?recessoId` lista frequências pendentes por recesso.
- `POST /avaliacoes/:frequenciaId/validar?mes=12|01` valida mês (status=3); grava avaliador e `dataAvaliacao`.

### Administração (Secap/Sepag)
- Painel: `GET /admin/frequencias/painel?recessoId` com agregações por status.
- Exportação: `GET /admin/frequencias/export?recessoId&mes&opcao` (Excel/CSV) incluindo avaliador e status do mês.
- Gestão: CRUD de recesso, servidores, escalas; já existentes.

## Regras de Negócio (Aplicação)
- Status do mês (1 aberto, 2 disponibilizada, 3 validada):
  - Disponibilizar: requer chefia definida; bloqueia edição de eventos do mês.
  - Validar: apenas status=2; grava avaliador e data; não permite reabrir.
  - Reabrir: permitido apenas se status≠3; limpa `dataDispon`.
- Chefia:
  - Obrigatória para disponibilizar/validar; servidor ≠ chefia.
  - Alteração de chefia bloqueada se ambos meses (dez e jan) estão validados.
- Exclusão:
  - Bloquear `DELETE /frequencias/:id` se qualquer mês estiver `status=3`.
- Períodos de recesso:
  - Construir datas de dezembro/janeiro automaticamente via `Recesso.DataInicial`/`dataFinal`.

## Cálculos de Horas
- Por Evento:
  - total = soma `(entrada1→saida1)` + `(entrada2→saida2)`; se só `entrada1` e `saida2`, total=`entrada1→saida2`.
  - total em dobro = `total * 2`.
- Por Frequencia/mês:
  - Folga vs Pagamento: acumular minutos por `opcao` (1 folga, 0 pagamento).
  - Sobra: `folgaMin - (pagamentoMin - totalDobroMin)` normalizando valores acima de 24h.
- Persistir `totalMinutos` e `totalMinutosDobro` nos Eventos para evitar recomputes; agregações calculadas no serviço.

## Autenticação e Perfis
- LDAP: manter autenticação existente.
- Autorização:
  - Área Comum: requer sessão `area_comum` e servidor cadastrado.
  - Chefia: `role` `CHEFE` ou claim de chefia; valida que `servidor ≠ chefia`.
  - Administração: `role` `ADMIN` ou claims `admin_sepag/admin_secap` (adicionar ao enum ou armazenar no perfil).

## Implementação Técnica
- Modelagem:
  - Criar `Frequencia`, `Evento` e `Avaliacao` (ou consolidar avaliadores/datas dentro de `Frequencia`).
  - Criar `Status` como tabela de referência.
- Serviços:
  - `FrequenciaService`: criar/editar, disponibilizar, reabrir, cálculos por mês; gerar PDF.
  - `AvaliacaoService`: listar pendências e validar mês (auditar avaliador e data).
  - `EventoService`: CRUD diário e agregação por mês.
- Controllers/Rotas:
  - Área comum, chefia e admin conforme endpoints acima; validação com Zod.
- Validações:
  - Checar período de recesso para cada `Evento.data`.
  - Bloquear operações com base em status e perfil.
- Auditoria:
  - Registrar logs e tabela `SolicitacaoHistorico`/`FrequenciaHistorico` para transições (opcional).

## Relatórios e Exportações
- Painel: agregações por recesso e mês com status 1/2/3 e sem chefia.
- Export: planilha com filtros (recesso, mês, `opcao`) e colunas incluindo avaliador e status.
- PDFs: gerar por mês/servidor usando template (cabecalho, tabela de eventos, totais, assinatura da chefia).

## Migração e Transição
- Fase 1: criar tabelas `Frequencia` e `Evento` e migrar dados das `Solicitacao` existentes para `Eventos`.
- Fase 2: criar fluxos de disponibilização/validação por mês e integração com chefia.
- Fase 3: relatórios, exportações e PDFs.
- Manter `Solicitacao` apenas como registro de workflow legado ou descontinuar após transição.

## Testes
- Unit: cálculos de horas (pares e casos especiais), transições de status, bloqueios por perfil.
- Integração: criação de frequências, criação/edição de eventos, disponibilização, validação e reabertura.
- E2E: fluxo completo servidor→chefia→admin por recesso e meses (dez/jan).

## Observações
- SARH segue acessado via raw; se necessário, criar VIEW com chave primária para mapear CPF/MATRICULA formalmente.
- Perfis `admin_sepag/admin_secap` podem ser adicionados ao `Role` ou tratados como claims externas (config LDAP).