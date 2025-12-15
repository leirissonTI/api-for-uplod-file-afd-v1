## Recesso

* CRUD completo de recesso com validação de datas

* `createRecesso` normaliza ano e período; `updateRecesso` atualiza datas e campos

* Rotas registradas sob `/api/v1/recesso/*`

## Escala

* Criação e associação ao recesso; checagem de duplicidade por `nome+recessoId`

* Preenchimento de vínculo de servidor por `servidorId` ou `servidorMatricula`

* Geração automática de `Solicitacao` por dia para cada escala

* Rotas sob `/api/v1/escala/*`

## Solicitações

* Modelo com campos de frequência diária: `dia`, `entrada1/2`, `saida1/2`, `servidorMatricula`, `nomeServidor`, `nomeChefia`, `lotacao`, `opcao`, `status`

* CRUD de solicitações: listar (`/solicitacoes/all`), criar, atualizar (inclui `status`) e deletar

* Resolução de `aprovadorId` por `chefeMatricula` ao criar

## Integração com EspelhoDiario

* Importação automática de frequências a partir do `EspelhoDiario` via CPF (resolvido por `sarh_funcionario`):

  * Serviço `FrequenciaService.importarDoEspelho`

  * Converte `HH:MM` do espelho para `DateTime` em `Solicitacao`

  * Cria/atualiza `Solicitacao` por dia e `Escala` se necessário

* Endpoint `POST /api/v1/frequencias/importar`

## Dashboard

* Resumo por recesso: horas totais (EspelhoMensal), avaliação/estado de dezembro e janeiro, por servidor

* Join dedicado `Escala × EspelhoDiario × SARH` com identificadores corretos

* Rotas: `/api/v1/dashboard/servidores-resumo` e `/api/v1/dashboard/escala-espelho-join`

## Acesso a SARH

* Modelo `sarh_funcionario` com chave composta (introspecção), acessado via consultas raw com identificadores entre aspas

* Mapeamento de CPF por matrícula para cruzar com `EspelhoDiario` e `EspelhoMensal`

## Normalizações e Logs

* Normalização de nomes (`primeiraEntrada`), manutenção de `@map` conforme banco

* Logs de rastreabilidade em criação de escala/solicitação, vinculação ao espelho e listagens

## Validação Técnica

* Build e validações do Prisma ok

* `db pull` funcionando com mapeamentos, sem erros de schema

