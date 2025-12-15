## Pendências Funcionais
- Disponibilizar mês da frequência (status=2) com `dataDispon` e bloqueio de edição
- Validar mês (status=3) com `avaliadorId` e `dataAvaliacao`; impedir reabertura
- Reabrir mês (status volta para 1) se não estiver validado; limpar `dataDispon`
- Regras de chefia: impedir autoaprovação; chefia obrigatória antes de disponibilizar; travar alteração de chefia se dez e jan validados
- Exclusão: bloquear exclusão de frequência quando algum mês estiver validado

## Modelagem (mínima para avançar)
- Manter em `Solicitacao` a frequência diária por dia (já integrado ao Espelho)
- Adicionar tabela `Frequencia` com controle por mês:
  - `id`, `recessoId`, `servidorId|servidorMatricula`, `chefiaId|chefeMatricula`
  - `statusDez` (1/2/3), `statusJan` (1/2/3)
  - `dataDisponDez`, `dataDisponJan`, `dataAvalDez`, `dataAvalJan`
  - `avaliadorDezId`, `avaliadorJanId`
- Alternativa: se preferir evitar nova tabela, manter controle por mês em `Solicitacao` agregando por servidor/mês, mas a entidade dedicada (Frequencia) simplifica as transições e auditoria

## Endpoints
- Área Comum
  - `POST /frequencias/importar` (implementado): importar do EspelhoDiario
  - `POST /frequencias/:id/disponibilizar?mes=12|01`: fecha mês para avaliação
  - `POST /frequencias/:id/reabrir?mes=12|01`: reabre mês, se permitido
- Chefia
  - `GET /avaliacoes?recessoId`: listar pendências por recesso
  - `POST /avaliacoes/:frequenciaId/validar?mes=12|01`: valida mês
- Administração
  - `GET /admin/frequencias/painel?recessoId`: agregações por status
  - `GET /admin/frequencias/export?recessoId&mes&opcao`: exportação CSV/Excel

## Regras e Validações
- Disponibilizar mês
  - Chefia definida e servidor ≠ chefia
  - Status atual do mês deve ser 1
  - Atualizar `dataDispon(Mês)` e `status(Mês)=2`; bloquear edição de eventos daquele mês
- Validar mês
  - Permitido apenas quando `status(Mês)=2`
  - Gravar `avaliadorId`, `dataAval(Mês)` e `status(Mês)=3`
  - Impedir reabertura e edição
- Reabrir mês
  - Permitido apenas quando `status(Mês)≠3`
  - Limpar `dataDispon(Mês)` e voltar `status(Mês)=1`
- Chefia
  - Bloquear alteração de chefia quando ambos `statusDez=3` e `statusJan=3`
- Exclusão
  - Impedir `DELETE /frequencias/:id` quando algum mês estiver `status=3`

## Cálculo de Horas
- Evento diário: somar períodos; caso especial `entrada1→saida2`
- Agregação por mês: total minutos, total em dobro, folga vs pagamento, sobra
- Persistir totais por evento para evitar recomputes; recalcular agregados ao disponibilizar

## Autorização
- Área Comum: usuário autenticado (LDAP) com sessão `area_comum`
- Chefia/Admin: `role` `CHEFE`/`ADMIN` (ou claims `admin_sepag/admin_secap`)
- Middleware de autorização nos endpoints de `avaliacoes` e admin

## Relatórios
- Painel por recesso: em aberto, disponibilizadas, aguardando avaliação, avaliadas, sem chefia
- Export: inclui avaliador, status do mês, opção (folga/pagamento) e totais
- PDF por mês/servidor: cabeçalho, eventos, totais, assinatura de chefia

## Técnicos
- Mapear CPF via `sarh_funcionario` (raw com identificadores entre aspas) e cruzar com `EspelhoDiario`
- Índices recomendados: `EspelhoDiario(cpf, mesAno, diaDoMes)`, `Solicitacao(escalaId, dia)`, `Frequencia(recessoId, servidorId)`
- Logs: manter rastreabilidade em importação, disponibilização, validação

## Fases
- Fase 1: criar `Frequencia`, importar e listar; disponibilizar/reabrir
- Fase 2: validar mês por chefia, bloquear edição, auditoria
- Fase 3: painéis, exportação e PDFs; reforço de autorização

## Confirmação
- Confirmar uso de entidade `Frequencia` para status por mês e vínculos de chefia/avaliador
- Confirmar bloqueios e transições conforme regras (1→2→3) e a origem dos dados de eventos do `EspelhoDiario`