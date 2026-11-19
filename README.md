# Nimbo 5.9 — Gráficos e leitura de materiais

A versão **5.9.0** aparece no menu lateral. Para atualizar uma instalação Docker existente:

```bash
git pull --ff-only origin main
docker compose up -d --build
```

Recarregue a página após a reconstrução. Apenas `git pull` não substitui o frontend que já está no container. Os volumes existentes são preservados.

Nesta versão:

- Desempenho: “Questões por dia” na primeira linha inteira e “Tempo de estudo por dia” na segunda. Gráficos com linhas suaves, cores consistentes, grade discreta e barras arredondadas. Um registro isolado continua visível; os demais pontos aparecem ao interagir.
- Início: barras agrupadas para tempo de teoria e questões, com a quantidade de questões resolvidas em outro gráfico de linha.
- Flashcards: pergunta e resposta lado a lado no computador. No celular, adaptam-se em uma coluna. A resposta continua escondida até ser revelada.
- Materiais: PDF, imagens, visualização de DOCX com formatação e vídeos do YouTube dentro do Nimbo. Botão “Tela cheia” amplia a leitura; Escape retorna ao tamanho normal sem fechar o material. O player do YouTube também oferece tela cheia nativa.
- Links do YouTube (watch, youtu.be, shorts e live) são reconhecidos ao cadastrar. Vídeos com incorporação desativada pelo autor mantêm o acesso pelo link externo. Links de documentos em servidores que bloqueiam incorporação/CORS podem exigir enviar o arquivo para o Nimbo.
- A visualização DOCX acontece no navegador, sem enviar o documento para serviços de terceiros. O editor de texto existente fica recolhido e opcional; salvar uma edição simples continua preservando o arquivo original para download. A representação visual pode variar em documentos com recursos avançados do Word.

Recursos da versão 5.8 preservados:

- **Fechamento do dia** no Início e na Agenda: metas diárias editáveis, tempo/questões/assuntos realizados, atividades planejadas/concluídas/pendentes, histórico de 14 dias e reagendamento em lote. Pode incluir pendências anteriores e escolher a data de destino. A operação inteira é cancelada se uma atividade mudou, já foi concluída ou conflita com um estudo no destino.
- **Flashcards** com filtro pesquisável por disciplina, Espaço para revelar, teclas 1–4 para avaliar e Z para desfazer a última avaliação da sessão. Desfazer restaura o estado e o histórico FSRS anteriores; revisões feitas em outra aba são protegidas por uma revisão numérica. Atalhos ficam inativos ao digitar ou abrir diálogos.
- **Nimbo** com expressões, movimentos e falas para fome, cansaço, tristeza, irritação, morte, neutralidade, felicidade e marcos de constância. Respeita a preferência de reduzir movimentos do sistema. A voz é opcional.

### Regras de metas e do Nimbo

As metas diárias iniciais dividem por sete as metas semanais de minutos e assuntos, arredondando para cima (mínimo de um minuto). Edite em **Fechamento do dia → Editar metas diárias**, inclusive a meta de questões. Zero desativa uma medida; ao menos uma precisa ser positiva. Alterações valem para hoje e os próximos dias. Essas metas são independentes dos objetivos semanais/mensais da agenda depois de criadas.

O horário de referência é **America/Fortaleza**. O dia atual fica em aberto até meia-noite. Dias encerrados têm metas e resultados preservados; edições retroativas não reescrevem resultados já fechados. O servidor contabiliza dias de ausência na próxima consulta, sem depender de o navegador ficar aberto. A contagem de cuidado começa no primeiro acesso da versão nova ou na adoção, sem punir dias anteriores à atualização.

| Resultado | Estado do Nimbo |
| --- | --- |
| Todas as metas configuradas atingidas | Feliz; soma um dia à sequência |
| Algum progresso, sem completar tudo | Neutro, sem fome/cansaço; interrompe as sequências positiva e negativa |
| 1 dia encerrado sem progresso | Com fome |
| 2 dias consecutivos sem progresso | Cansado |
| 3 dias consecutivos sem progresso | Triste pela manhã, irritado à tarde |
| 4 dias consecutivos sem progresso | Morre; precisa de recomeço explícito |
| 3 / 7 / 14 / 30 dias de metas completas | Orgulhoso / empolgado / radiante / lendário |

Um dia parcialmente cumprido interrompe a contagem de faltas. Progresso hoje neutraliza fome e cansaço, mas não revive um Nimbo já morto. Carinho, conversa, brincadeira e descanso fortalecem o vínculo e não substituem metas. A coleção inteira acompanha as metas, inclusive os companheiros inativos. Recomeçar zera XP, vínculo e sequência daquela vida, preservando recorde, número de vidas, XP da vida anterior e todos os estudos. O estado é calculado no backend; trocar de aba ou recarregar a página não muda as regras.

Os recursos anteriores permanecem: cronômetro contínuo entre páginas, planejamento de duas disciplinas por dia, gráficos de acertos/erros e novos erros automaticamente vinculados aos flashcards.

Aplicação local para concursos e organização pessoal. **Java 21 / Spring Boot 3.5, React 19, PostgreSQL 17 e Docker Compose**. Esta atualização preserva os recursos e dados da versão 5.4 e modifica o backend, frontend e o esquema de dados.

## O que há de novo

### 1. Revisão adaptativa com quatro níveis

O Nimbo agora agendará **uma próxima revisão ativa por assunto**, em vez de fixar 24h, 7 dias e 30 dias em todos os casos.

| Nível escolhido após estudar ou revisar | Intervalo da próxima revisão |
| --- | ---: |
| 1 — Não assimilei | 48h (2 dias) |
| 2 — Assimilei, mas vou esquecer logo | 7 dias |
| 3 — Assimilei bem | 14 dias |
| 4 — Domino o conhecimento | 42 dias |

Como usar:

1. Em **Meu edital**, marque **Teoria** de um assunto. O Nimbo pede o nível de assimilação e agenda a revisão.
2. Em **Estudar**, ao finalizar uma sessão de teoria vinculada a um assunto, você pode avaliar o aprendizado ou fechar a janela se ainda não concluiu o conteúdo.
3. Em **Revisões**, clique **Revisar** ou **Reestudar** (nível 1); depois de revisar, escolha novamente seu nível. A revisão é concluída e outra é agendada com a nova data.
4. No **Meu edital**, a tabela exibe nível de assimilação, próxima revisão, quantidade histórica de revisões, acertos/erros e tempos líquidos.

Nível 4 **não apaga revisões futuras**. Nível 1 recomenda reestudar a teoria. As classificações são *autoavaliações* do aluno, não inferências automáticas da taxa de acerto.

**Migração automática das revisões antigas:** na primeira inicialização da versão 5.5, os registros concluídos de 1/7/30 dias são preservados como histórico. As revisões antigas ainda pendentes são canceladas logicamente (`cancelled_at`) e substituídas por uma única revisão. Se o assunto nunca teve nível definido, o Nimbo utiliza temporariamente **nível 2 (sete dias)**; você pode alterá-lo em Meu edital. A data de referência é a data de conclusão da teoria ou da última revisão concluída, escolhendo a mais recente. Revisões que já estejam atrasadas continuam aparecendo como atrasadas. Esta migração é executada apenas uma vez por assunto para não desfazer uma limpeza de revisões feita posteriormente.

### 2. Agenda semanal e mensal que se conecta aos estudos

A agenda continua com atividades **pessoais, acadêmicas, de concurso, trabalho e saúde**, mas passa a mostrar também:

- **Estudos planejados**: assunto do edital, teoria ou questões, minutos previstos, quantidade de questões prevista e data; o horário é opcional.
- **Revisões automáticas**: aparecem no calendário de acordo com o ciclo de assimilação, sem gerar cópias como atividades.
- **Estudos realmente feitos**: tempo de teoria, tempo de questões, quantidade de questões e assuntos vêm diretamente dos registros originais. Se você estudou sem ter planejado, o registro aparece como **Realizado** no dia.
- **Meta por período**: ao entrar em Semana ou Mês, clique num indicador ou em **Editar metas** para definir horas, questões e assuntos. O valor zero significa “não definido”. A tela apresenta **realizado / meta**.
- **Sugestões de estudo**: clique **Sugestões** para ver até cinco blocos sugeridos a partir da prioridade dos assuntos e da disponibilidade aparente dos dias. As sugestões **só são gravadas quando você as confirma** e podem ser editadas depois.
- **Planejado × realizado por atividade**: um bloco de 45 minutos de teoria apresenta o tempo efetivo daquele assunto no mesmo dia. Um bloco de questões também mostra quantas questões já foram registradas. Apenas dados reais atendem a meta.

**Regra de confiabilidade:** um plano com assunto vinculado **não pode ser marcado manualmente como concluído**. Ele é realizado pelo cronômetro e pelo registro de questões. Tarefas pessoais e atividades livres continuam com checkbox manual. O sistema impede dois blocos com **mesmo assunto, mesmo tipo e mesma data**, para não contar a mesma sessão em dois planos diferentes. Um registro de questões com cronômetro soma a duração uma única vez, a partir de `study_sessions`.

**Distinção importante:** uma sessão sem assunto registrado entra nas horas totais do período, mas não é distribuída artificialmente entre os tópicos do edital. A agenda indica tempos e resultados conforme foram registrados; não cria horas fictícias.

## Atualizar sua instalação sem perder os dados

**Use a mesma pasta `concurso-ti` que já contém seus volumes.** O nome da pasta pode afetar o nome do projeto Docker Compose, portanto não inicie uma instalação paralela em outra pasta esperando encontrar seus dados anteriores automaticamente.

Na pasta anterior, com o PostgreSQL rodando, faça primeiro um backup:

```powershell
docker compose exec db sh -c "pg_dump -U concurso -d concurso_ti -Fc -f /tmp/nimbo-backup.dump"
docker compose cp db:/tmp/nimbo-backup.dump ./nimbo-backup-antes-5.5.dump
```

Depois copie o conteúdo da pasta `concurso-ti` deste ZIP **sobre o código anterior**, substituindo os arquivos. Em seguida:

```powershell
docker compose up -d --build
docker compose ps
docker compose logs --tail=80 api
```

Abra **http://localhost:3000**. A API também responde em `http://localhost:8080/api/health`.

**NÃO execute `docker compose down -v`, `docker volume prune` nem apague os volumes** `postgres_data` e `uploads_data`. O banco preserva assuntos, questões, estudos, anexos, simulados e o Nimbo.

### O que muda no PostgreSQL

Hibernate (configurado com `ddl-auto: update` para uso pessoal local) adiciona:

- `topics.assimilation_level` e `topics.review_schedule_initialized`;
- `review_tasks.assimilation_level` e `review_tasks.cancelled_at`;
- `agenda_items.topic_id`, `agenda_items.study_kind` e `agenda_items.target_questions`;
- nova tabela `period_goals` (metas semanais/mensais);
- `daily_goal_settings` e `daily_goal_days` para metas diárias e resultados encerrados;
- campos de cuidado, sequências, morte e vidas anteriores em `pet_companions`;
- `error_notes.flashcard_undo_state` para desfazer a última avaliação do cartão.

Os registros antigos permanecem. Para um ambiente de produção ou hospedagem pública, serão necessárias migrações versionadas e autenticação; esta instalação foi projetada para uso local individual.

## Instalação do zero

Com Docker Desktop instalado e rodando, abra o terminal na pasta `concurso-ti`:

```powershell
docker compose up -d --build
```

Acesse **http://localhost:3000**. O edital começa vazio para você importar seu próprio documento PDF/DOCX ou cadastrar disciplinas e assuntos manualmente.

## Rotas adicionais da API

- `GET/PUT /api/daily-progress`: resultado de hoje e metas `{ "targetMinutes":60, "targetQuestions":20, "targetTopics":1 }`.
- `POST /api/agenda/reschedule`: `{ "scheduledDate":"AAAA-MM-DD", "items":[{ "id":1, "expectedVersion":0 }] }`.
- `POST /api/flashcards/{id}/undo`: `{ "expectedRevision":1 }` restaura a avaliação anterior uma única vez.
- `POST /api/pet/{id}/restart`: inicia uma nova vida apenas para um Nimbo morto.

- `POST /api/topics/{id}/assimilate` com `{ "level": 1|2|3|4 }`: reavaliação da assimilação e reagendamento do assunto cuja teoria está concluída.
- `PATCH /api/reviews/{id}/complete` com `{ "level": 1|2|3|4 }`: conclui revisão e cria uma única próxima revisão.
- `GET /api/agenda/goals`: metas salvas.
- `PUT /api/agenda/goals`: salva `{ "periodType":"WEEK"|"MONTH", "periodStart":"AAAA-MM-DD", "targetMinutes":600, "targetQuestions":100, "targetTopics":5 }`. Semana inicia na segunda-feira e mês no dia 1.
- `POST/PUT /api/agenda`: opcionalmente recebe `topicId`, `studyKind:"THEORY"|"QUESTIONS"`, `targetQuestions` para vincular uma atividade de concurso a resultados reais.

## Verificações e limitações

- Sintaxe dos arquivos Java (via parser do JDK 21) analisada.
- Sintaxe JavaScript/JSX (via parser TypeScript) e CSS (tinycss2) analisada.
- **7 testes de regras de cálculo do frontend passaram** (`cd frontend; npm run test:logic`).
- Há testes Java novos para revisão, metas e migração, mas **não foi possível executar Maven nem o build Vite completo neste ambiente** porque as dependências de Maven/npm não estavam disponíveis e o acesso à rede estava bloqueado. A primeira compilação e a verificação visual ainda precisam acontecer no Docker do usuário.

Veja `docs/VALIDACAO-5.5.md` para uma sequência de testes após a atualização. Documentação anterior: `docs/README-HISTORICO-ATE-5.4.md`.

## Organização do código

O frontend usa React e Material UI. `src/shared` reúne componentes reutilizados, serviços HTTP, utilitários e tema. `src/pages/<pagina>` contém a página, seus hooks, componentes e utilitários locais quando necessários. As regras visuais existentes são mantidas em CSS-in-JS no `GlobalStyles` do MUI. Os gráficos de cobertura e prioridades usam MUI X Charts.

O backend é um monólito modular. Cada funcionalidade possui seus pacotes de controllers, services, entities e repositories. Os controllers extraídos delegam os casos de uso aos services, com injeção pelo construtor. Os módulos ainda compartilham relacionamentos JPA e algumas dependências de persistência entre funcionalidades.

Classes e componentes usam PascalCase. Funções e variáveis usam camelCase. Para formatar o frontend, execute `npm run format` em `frontend`. Para validar, execute `npm run build`, `npm run test:logic` e `mvn test` em `backend`, usando JDK 21.


### Agenda e revisões dos erros

A agenda permite concluir e reabrir atividades e blocos de estudo, mover pendências entre dias pela alça de arrastar ou pelo menu Mover, buscar atividades e filtrar pendentes/concluídas. Prioridade e atraso aparecem nos cartões. A conclusão manual é persistida e não cria registros de tempo ou questões. O quadro semanal tem rolagem horizontal para manter os títulos legíveis em telas menores.

Em Desempenho, as disciplinas podem ser comparadas por cobertura, taxa de acerto, horas estudadas e prioridade. Os detalhes e ajustes ficam na disciplina selecionada.

Em Caderno de erros → Flashcards, cada erro existente vira um cartão. A pergunta usa a pegadinha e a resposta usa a explicação correta, incluindo as imagens cadastradas. O backend usa Java-FSRS 1.0.0, com retenção desejada de 90%, aprendizagem em 1 e 10 minutos e reaprendizagem em 10 minutos. Os parâmetros são os padrões da biblioteca. A variação aleatória dos intervalos está desativada. Estado e histórico são persistidos junto ao erro, e avaliações concorrentes são rejeitadas. O otimizador automático de parâmetros do Anki não faz parte desta implementação.

Os novos campos são adicionados pela configuração existente `ddl-auto: update`. Validação do frontend inclui `npm run test:ui`, `npm run test:logic` e `npm run build`.
