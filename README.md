# Nimbo 5.5 — Revisões por assimilação e agenda integrada

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
- nova tabela `period_goals` (metas semanais/mensais).

Os registros antigos permanecem. Para um ambiente de produção ou hospedagem pública, serão necessárias migrações versionadas e autenticação; esta instalação foi projetada para uso local individual.

## Instalação do zero

Com Docker Desktop instalado e rodando, abra o terminal na pasta `concurso-ti`:

```powershell
docker compose up -d --build
```

Acesse **http://localhost:3000**. O edital começa vazio para você importar seu próprio documento PDF/DOCX ou cadastrar disciplinas e assuntos manualmente.

## Rotas adicionais da API

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
