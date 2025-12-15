## Contexto e Objetivos
- Atender às novas funcionalidades do frontend integrando `/api/v1` e incluir automação da importação de frequências sem interação manual recorrente.
- Entrega com UX consistente, validações robustas e observabilidade de processos automáticos.

## Escopo e Suposições
- Frontend (ex.: React/TypeScript) consumindo a API atual; sem alterar backend neste ciclo.
- Automação inicialmente em client (foreground) com controles de concorrência e retomada; job server-side fica como melhoria futura.
- Base URL via `.env` (ex.: `VITE_API_BASE_URL`).

## Arquitetura Frontend
- **Camadas**: `features/*`, `services/api`, `store`, `hooks`, `pages`, `components`, `utils`, `tests`.
- **Cliente HTTP**: interceptors, mapeamento de erros, cancelamento, backoff em falhas.
- **Tipagens**: modelos para requests/respostas com parse seguro.

## Backlog de Funcionalidades
1. **Configuração de Ambiente**
   - `.env.example` com `VITE_API_BASE_URL`; documentação de variáveis.
   - `services/api.ts` com base URL e interceptors; padrão `{ success, message, data }`.
2. **AFD — Upload e Visualização**
   - Upload (`POST /afd-registros/upload`) com validação de tipos; resultados com métricas.
   - Filtros por tipo (`GET /afd-registros/:tipo`) e CPF (`GET /afd-registros/cpf/:cpf`).
   - Persistência (`POST /afd-registros/salvar`) com confirmação.
3. **Frequências — Automação de Importação (Client-side)**
   - **Tela de Configuração**: selecionar `recessoId` (de `GET /recesso/all`) e escopo de servidores (`GET /servidor/all` ou busca por nome).
   - **Orquestrador de Jobs**: executar lote de chamadas `POST /frequencias/importar` por `servidorMatricula` com:
     - Concorrência limitada (ex.: 3–5 simultâneas) e fila.
     - Backoff exponencial e reintentos em falhas transitórias.
     - Retomada: persistir progresso (localStorage) para continuar após refresh.
     - Idempotência: confiar na lógica do service ("criadas"/"atualizadas").
   - **Gatilhos Automáticos**:
     - Ao concluir `POST /sarh/importar-csv`, sugerir/importar automaticamente os servidores afetados.
     - Ao abrir a tela de servidor, auto-checar e importar se recesso estiver `abertoParaFrequencia`.
   - **Feedback e Observabilidade**: barra de progresso, resumo por servidor/dia (`{ criadas, atualizadas, semEspelho }`), logs de erro e relatório exportável (CSV).
   - **Controles de Segurança**: limitações de taxa, pausa/retomar, cancelar lote.
4. **Espelho de Ponto**
   - Geração (`POST /espelho/gerar-espelho/:cpf/:mesAno`) com validações fortes.
   - Resgates (`GET /espelho/resgatar-espelho-mes/diario-mes`) e visualização; export CSV/PDF.
5. **Servidores**
   - CRUD, busca (`/servidor/search`) e importação em lote (`/servidor/create/bulk`).
6. **Lotação**
   - CRUD e busca (`/lotacao/*`).
7. **Escala**
   - Criação/edição/remover; "by-names"; resumo (`/escala/resumo/:recessoId/:matricula`).
8. **Solicitações**
   - CRUD com formulário contextual; status e vínculo com escala/espelho.
9. **Dashboard**
   - Resumos (`/dashboard/servidores-resumo`, `/dashboard/escala-espelho-join`) com filtros e gráficos simples.
10. **SARH**
   - Importar CSV com feedback; listagem/paginação/busca de funcionários.
11. **UX e Acessibilidade**
   - Navegação, `empty states`, skeletons, responsividade, acessibilidade.
12. **Observabilidade e Qualidade**
   - Logger cliente, captura de exceções, métricas de uso.

## Integrações de API (Mapeamento)
- **Frequências Automação**: usa `POST /frequencias/importar` iterando por `servidorMatricula` e `recessoId`; estados coletados e agregados no frontend.
- **Listagens auxiliares**: `GET /recesso/all`, `GET /servidor/all/search` para seleção.
- **Gatilho SARH**: escutar resultado de `POST /sarh/importar-csv` para iniciar job de importação.

## Segurança e Configuração
- `.env.example`: `VITE_API_BASE_URL`, `VITE_APP_ENV`, `VITE_LOG_LEVEL`.
- CORS: evitar `credentials` no frontend se não houver cookies; revisar origens no backend quando for a produção.
- Planejar auth (JWT) posteriormente; preparar guards e armazenamento de token.

## Testes e Validação
- Unit: orquestrador de jobs, utils de backoff/fila.
- Integração: MSW simulando respostas e erros; verificar retomada via storage.
- E2E: cenários de automação (iniciar, pausar, retomar; gatilho após SARH). 
- QA: arquivos grandes, timeouts, falhas parciais.

## Critérios de Aceite — Automação
- Configurar e iniciar lote por recesso e conjunto de servidores.
- Concorrência controlada, backoff e retomada funcionando.
- Resumo final consolidado com totais por servidor e geral.
- Gatilho após import SARH disponível e funcional.

## Perguntas para Alinhamento (Automação)
1. A automação deve cobrir todos os servidores ou um subconjunto (lotação/chefia)?
2. Qual limite de concorrência aceitável para o backend (ex.: 3–5 chamadas simultâneas)?
3. Precisamos de execução completamente background (PWA/Service Worker) ou o modo foreground é suficiente?
4. Os gatilhos (após SARH ou ao abrir página do servidor) são desejados?
5. Há janela de manutenção/horário preferencial para rodar a automação?

Confirma esta abordagem de automação no frontend? Posso priorizar e detalhar a épico de automação para iniciar a implementação.