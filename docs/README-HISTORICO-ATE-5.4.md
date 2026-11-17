# Nimbo 5.4 — experiência de uso e navegação

**Tecnologia:** Java 21 + Spring Boot 3.5 + React 19 + Vite + PostgreSQL 17 + Docker Compose.

O Nimbo é um organizador pessoal e de preparação para concursos de TI e bancários. Instalações novas começam com o edital vazio para você importar o **conteúdo oficial**, sem tópicos de demonstração; bancos antigos mantêm todos os registros existentes. Inclui um personagem **original** SVG em 2.5D, que cresce com horas líquidas, questões, simulados, revisões e leitura de materiais. Não utiliza imagens, nomes ou APIs de franquias de jogos.

## Navegação no Nimbo 5.4

A navegação principal agora contém **Início, Agenda, Meu edital, Estudar e Questões**. Outras funcionalidades continuam acessíveis em **Outras ferramentas**: Revisões, Desempenho, Caderno de erros, Simulados, Materiais, Meu Nimbo e Configurações.

- **Início:** só o próximo assunto recomendado, quatro indicadores, compromissos de hoje, revisões pendentes e tempo dos últimos sete dias. Os relatórios completos ficam em **Desempenho**; não são repetidos no dashboard.
- **Foco contextual:** escolher **Praticar questões** na aba Desempenho, ou **Estudar/Questões** nos detalhes de Meu edital, abre a tela com o assunto pré-selecionado. O início também oferece esses atalhos. Caso já exista um cronômetro ativo, a seleção não altera a sessão em andamento.
- **Agenda:** mês e semana continuam disponíveis; alternar para semana a partir do mês corrente abre a semana atual.
- **Meu edital:** a planilha completa (revisões D+1/D+7/D+30, questões, tempo de teoria e de questões) foi mantida. **Importar edital** e os filtros avançados ficam recolhidos até você precisar deles.
- **Questões e Caderno de erros:** busca, disciplina e assunto ficam à vista; filtros detalhados de desempenho, datas e ordenação são expansíveis.
- **Estudar:** cronômetro e resumo da semana aparecem antes da edição do ciclo de matérias, que agora é opcional/recolhível.
- **Revisões:** foco na fila; informações explicativas ficam no item “Como funcionam as revisões?”.
- **Exclusão em massa:** não aparece mais misturada aos botões de estudo, cadastro e revisão. Continua acessível em **Outras ferramentas → Configurações → Gerenciar e limpar dados**, com confirmação digitada.
- **Busca de páginas:** clique em **Ir para...** no topo ou use **Ctrl+K**. Digite o nome da aba e clique nela; Enter abre o primeiro resultado.
- **Janelas e acessibilidade:** Escape fecha modais, Tab circula pelos controles do modal e o foco retorna ao botão anterior quando o modal é fechado. O Nimbo pode ser recolhido; em telas pequenas, começa recolhido quando não há preferência salva.

**Não há alteração de tabelas, rotas de API ou regras de pontuação nesta versão.** Os registros e volumes existentes permanecem compatíveis. O foco foi exclusivamente na apresentação e nos fluxos de navegação.

## Telas e funções preservadas

| Tela | Função |
| --- | --- |
| Início | Resumo do dia, próximo foco, revisões, agenda e evolução semanal |
| Agenda | Mês/semana, tarefas pessoais, acadêmicas, concurso, trabalho e saúde |
| Meu edital | Importação de edital PDF/DOCX e acompanhamento detalhado por assunto |
| Estudar | Cronômetro de teoria, ciclo de matérias e histórico de sessões |
| Questões | Cronômetro de questões, registros e análise por assunto |
| Desempenho | Prioridades, métricas, disciplinas, assuntos e gráficos avançados |
| Revisões | Fila agendada e checklists por prazo |
| Materiais | PDF, DOCX e imagens no PostgreSQL, links, prévias e editor limitado |
| Caderno de erros | Anotações e capturas da questão e resposta |
| Simulados | Aproveitamento e comparação com a meta |
| Meu Nimbo | Companheiro original, energia, XP e coleção |
| Configurações | Metas, concurso e limpeza segura de registros |

## Novo no 5.3 — cronômetros separados

- **Teoria:** em **Hora de focar**, use o cronômetro e selecione a disciplina e, preferencialmente, o assunto. Ao salvar, a sessão é classificada como `THEORY`.
- **Questões:** em **Questões**, selecione o assunto no painel **Foco em questões**, inicie e pause quantas vezes precisar e clique em **Registrar resultado**. Informe quantas questões resolveu e quantas acertou. O backend salva a sessão de tempo (`QUESTIONS`) e o bloco de resultados em uma única transação. Sem cronômetro, use **Registro manual** e informe minutos se quiser.
- O painel inicial, a aba **Análise** e a planilha **Meu edital** mostram **teoria / questões** separadamente. O total líquido é a soma dos dois. A visualização de sete dias usa verde para teoria e laranja para questões.
- As sessões anteriores à versão 5.3, sem classificação, são tratadas como **teoria**. Seus registros e volumes não são apagados; o Hibernate acrescenta as colunas `study_kind` e `focus_duration_seconds` no primeiro início da API.
- **Exclusão:** apagar um resultado de questões não apaga o tempo já estudado. Para remover esse tempo, exclua a sessão correspondente no histórico em **Hora de focar**. Isso evita perder horas de estudo ao corrigir um registro de desempenho.
- O cronômetro de questões é preservado nesta sessão do navegador ao mudar de aba; se você deixar o timer correndo, precisará pausá-lo manualmente. O tempo líquido contabilizado é o registrado quando você confirma o resultado.
- Os gráficos e a tabela analítica agora ficam na aba **Desempenho**, em vez de duplicados na página inicial.

## Atualização a partir do TrilhaMon 4.0

**IMPORTANTE: para manter os dados, atualize os arquivos da pasta atual do projeto `concurso-ti`; não instale uma cópia paralela num diretório com outro nome de projeto Compose.** O Docker nomeia os volumes por projeto. A mudança de nome visual para Nimbo **não muda** a identidade dos serviços no `docker-compose.yml` nem os volumes.

1. **Pare apenas o uso do site** enquanto atualiza e faça backup do PostgreSQL:

   ```powershell
   docker compose exec db sh -c "pg_dump -U concurso -d concurso_ti -Fc -f /tmp/nimbo-backup.dump"
   docker compose cp db:/tmp/nimbo-backup.dump ./nimbo-backup.dump
   ```

   Se a versão anterior não estiver rodando, use o backup que você já possui ou monte o volume com os dados antes de prosseguir.
2. Extraia o ZIP e copie os arquivos de `concurso-ti` por cima da pasta existente. Preserve os volumes.
3. Execute no PowerShell, dentro de `concurso-ti`:

   ```powershell
   docker compose up -d --build
   docker compose ps
   ```

4. Abra **http://localhost:3000**. Os dados anteriores continuam nas tabelas e volumes do Compose. Os Pokémon anteriormente cadastrados são **remapeados para variações originais de Nimbo**, mantendo **XP, nível, energia, vínculo e coleção**.

**Não execute `docker compose down -v`**, `docker volume prune` nem exclua o volume `uploads_data`. O antigo volume é mantido apenas para recuperar arquivos de versões anteriores. Os novos uploads ficam integralmente no PostgreSQL (tabelas `stored_assets`/`asset_blobs`).

## Instalação nova

É necessário **Docker Desktop** (Engine e Compose). Na pasta `concurso-ti`:

```powershell
docker compose up -d --build
```

- Site: **http://localhost:3000**
- API: **http://localhost:8080/api/health**
- Banco: PostgreSQL em `127.0.0.1:5432` (configuração local, consulte `docker-compose.yml`)

## Importar um edital em PDF ou DOCX

1. Em **Meu edital**, clique **Importar edital** e escolha o PDF/DOCX (até 20 MB).
2. O backend extrai o **texto selecionável** do PDF via Apache PDFBox ou o texto do DOCX via Apache POI.
3. Um parser local por regras identifica nomes de disciplinas e fragmenta a listagem de assuntos; a tela apresenta **prévia editável** por disciplina, com um assunto por linha.
4. **Confira e ajuste antes de confirmar.** Você pode renomear, remover ou acrescentar disciplinas e assuntos na prévia.
5. O sistema faz a mesclagem com o edital atual: adiciona novos itens e **não substitui nem reinicia assuntos que você já estudou**. Duplicatas por disciplina e título normalizados são ignoradas.
6. O arquivo original é armazenado no PostgreSQL e aparece no histórico, com opção de baixar.

**Limites importantes:** esta primeira versão não usa IA externa e **não possui OCR**. PDFs digitalizados como imagens e editais com layouts pouco convencionais podem exigir OCR externo, envio do anexo específico de conteúdo programático ou correção manual da prévia. A extração não é uma interpretação jurídica automática do edital. O parser limita a importação a 60 disciplinas e 350 assuntos por lote.

## Planejamento semanal

- Crie atividades em **Minha semana** clicando em **Nova atividade** ou no `+` de cada dia.
- Atribua área: Pessoal, Acadêmico, Concurso, Trabalho ou Saúde.
- Configure prioridade, horário opcional, duração estimada, data e notas.
- Marque **Repetir toda semana depois de concluir** para gerar automaticamente a próxima ocorrência quando terminar a atual.
- Conclua ou reabra tarefas; o dashboard mostra a agenda de hoje.
- A agenda fica no PostgreSQL na tabela `agenda_items`.

## Companheiro Nimbo (arte original)

Nimbo é criado com **SVG em camadas, gradientes, sombras e animações CSS** (estética 2.5D) e funciona sem baixar sprites. Fica em um painel recolhível no canto da tela. Tem estados normal/feliz/cansado/triste, reação ao carinho, brincadeira, descanso e respostas de diálogo **local baseadas em regras**. Não há IA generativa ou reconhecimento de voz; a leitura opcional das respostas usa o recurso de voz do navegador. `prefers-reduced-motion` é respeitado.

XP é dado por atividades reais de estudo e não por cliques repetidos no personagem. A energia pode diminuir com erros e inatividade, enquanto XP/evoluções permanecem. A forma máxima é liberada no nível 13, dando acesso à próxima variação do Nimbo.

## Verificação local

```powershell
# Ver containers
docker compose ps
# Ver logs
docker compose logs --tail=100 api
docker compose logs --tail=100 web
```

Para executar os testes do Java com Maven de forma correta (sem depender do seu computador):

```powershell
docker run --rm -v "${PWD}/backend:/app" -w /app maven:3.9-eclipse-temurin-21 mvn test
```

O `Dockerfile` do backend utiliza `mvn -q -DskipTests package`, que ainda **compila os testes**. Os testes incluídos cobrem regras de questões/revisões, interação do Nimbo, extração de edital e repetição semanal.

## Restrições e segurança

- **Uso local de uma pessoa**, sem login nem autorização por usuário. Não publique a porta do banco/API na internet sem adicionar autenticação, backup automatizado e controle de acesso.
- `ddl-auto:update` é adequado ao MVP local, mas antes de produção use migrações versionadas (ex.: Flyway).
- Os uploads ocupam espaço no PostgreSQL. Faça backup periódico; guarde cópia do `.sql` fora da pasta do projeto.
- Links continuam externos; arquivos PDF/DOCX e prints ficam no banco. O editor DOCX preserva o texto, **não** toda a formatação do documento original. A edição do PDF acrescenta páginas de anotações, sem mudar a diagramação original.

## Pesquisa de referências

Leia [docs/REFERENCIAS-E-DECISOES.md](docs/REFERENCIAS-E-DECISOES.md): Estudaqui, Aprovado, EstudaHub, Todoist e Notion inspiraram decisões de usabilidade (sem copiar interface/código).


## Novidades da versão 5.1

### Exclusão em massa com confirmação

Em **Preferências → Gerenciar e limpar dados**, expanda as opções de manutenção. Há operações independentes para **edital completo** (disciplinas + assuntos), **todos os assuntos** mantendo as disciplinas, questões, caderno de erros, sessões, revisões, simulados, biblioteca, agenda ou tudo em conjunto. Cada ação mostra o escopo e exige digitar `EXCLUIR`, exatamente em maiúsculas. Há também atalhos de limpeza dentro das abas correspondentes.

- A limpeza do **edital** apaga os registros dependentes (questões, revisões, horas e erros vinculados), mas **mantém a biblioteca**, apenas desvinculando os materiais dos assuntos. Os simulados e a agenda são mantidos.
- A limpeza de **questões**, por exemplo, não apaga o edital nem o caderno de erros.
- **Zerar estudos e agenda** apaga todos os registros de organização e estudo, mas **mantém o mascote, as preferências e os blobs originais de arquivos** no PostgreSQL, para evitar perda acidental de anexos. Os materiais deixam de aparecer na biblioteca.
- A exclusão ocorre em transação PostgreSQL (tudo ou nada), **não tem lixeira** e **não reverte o XP** acumulado. Faça backup antes.
- Por ser um sistema local sem autenticação, **não publique a API na internet** com esses endpoints destrutivos habilitados.

### Filtros e métricas

A aba **Questões** agora filtra por disciplina, assunto, faixa de aproveitamento, data inicial/final, busca textual e ordenação. As métricas e o desempenho por assunto usam os blocos **filtrados** (não os registros ocultos pelo filtro).

O **Caderno de erros** possui filtros combináveis por disciplina, assunto, data, erros recorrentes e prints disponíveis; cartões e contadores acompanham as seleções. O botão **Limpar filtros** restaura a visão completa.

O dashboard inicial acrescenta:

1. **Cobertura por disciplina** e avanço de teoria/resumo/conclusão.
2. **Acertos e erros por assunto** (até oito assuntos com mais erros).
3. **Revisões atrasadas, de hoje, futuras e concluídas**, com distribuição dos próximos 7 dias.
4. **Questões diárias dos últimos 14 dias**, separando acertos e erros.
5. **Tabela filtrável de todos os assuntos**, com domínio, status, revisão, prioridade e desempenho.

Esses indicadores usam registros atuais das APIs já existentes. Se ainda não houver questões, aparece `—` em vez de apresentar `0%` como desempenho medido.

### Agenda mensal ou semanal

Abra **Minha semana**. O modo **Mês** mostra um calendário compacto com até duas atividades resumidas por dia e indicador quando houver mais. Clique em um dia para abrir o **modal diário**, concluir, editar ou adicionar compromissos. O modo **Semana** preserva os sete cartões detalhados da versão anterior. A barra superior permite navegar pelo período e filtrar por área.

### Interface e legibilidade

A folha `frontend/src/refinement.css` é carregada **após** `styles.css` e `studio.css`: corrige a hierarquia tipográfica, os tamanhos mínimos de fonte/controles, os espaçamentos entre rótulos e valores, o layout de tabelas, cartões, indicadores, formulários e modais. Usa ajustes responsivos para telas menores e preserva a identidade verde do Nimbo.

### Instalar sem perder dados

Na **mesma pasta** `concurso-ti` que usa os volumes existentes do Compose:

```powershell
# Faça backup do banco antes, com os serviços antigos funcionando:
docker compose exec db sh -c "pg_dump -U concurso -d concurso_ti -Fc -f /tmp/nimbo-backup.dump"
docker compose cp db:/tmp/nimbo-backup.dump ./nimbo-backup.dump

# Copie os arquivos novos sobre a instalação existente e então:
docker compose up -d --build
docker compose ps
```

**Nunca execute `docker compose down -v`.** Teste a aplicação em `http://localhost:3000`, principalmente o dashboard, os filtros combinados, a exclusão de um conjunto de dados de teste e a alternância entre Mês/Semana.


## Atualização 5.2 — auditoria visual e nova planilha do edital

### Acompanhamento do edital

O menu **Meu edital** agora exibe uma tabela detalhada, com rolagem horizontal e primeira coluna fixa. Cada assunto reúne:

- Disciplina, nome do assunto, situação atual, domínio, teoria estudada e resumo concluído.
- **Três revisões independentes:** 24 horas, 7 dias e 30 dias, com data prevista e marcação de conclusão/reabertura. O agendamento acontece quando a teoria é concluída.
- **Questões, acertos, erros e percentual de acerto** calculados a partir dos registros em **Questões**.
- **Tempo líquido do assunto**, calculado a partir de **Hora de focar** e registros manuais que tenham o assunto selecionado. Sessões lançadas sem assunto específico são contabilizadas nos totais gerais, **não** são distribuídas artificialmente entre os assuntos.
- Indicador de 0 a 6 etapas (teoria, resumo, revisões 24h/7d/30d e status concluído).
- Filtros combináveis (texto, disciplina, situação, domínio, revisões), ordenação, paginação, edição em linha e detalhes expandíveis.

Os registros são os mesmos que já existem no PostgreSQL: `topics`, `question_records`, `study_sessions` e `review_tasks`. A versão 5.2 **não cria tabelas novas nem exige migração** e **não modifica** os registros de estudo ao atualizar o site.

### Ajustes na interface

- Indicadores de **Biblioteca** organizados horizontalmente em cartões responsivos, com rótulos e números separados.
- **Análise e prioridades** com quatro indicadores em uma grade horizontal, radar de disciplinas e botão de ajuste padronizado.
- Recomendação de foco com título e descrição em linhas distintas.
- Biblioteca, editor de documentos e capturas do caderno de erros padronizados.
- Tipografia mais legível (principalmente tabelas, filtros, legendas e botões).
- Gráfico **Tempo líquido — últimos 7 dias** com texto explicativo, total no período e zero sem barra fictícia.

### Validação e limites

- `cd frontend && npm run test:logic` testa os agregados da planilha sem dependências externas.
- Não execute `docker compose down -v`: preserva os dados do PostgreSQL.
- Não foi possível fazer o build completo Vite neste ambiente porque o registry npm não estava acessível. A versão precisa ser construída/testada no seu Docker.
- Leitura de PDF, DOCX, captura de telas e demais módulos anteriores continuam no projeto, sem mudança de endpoint.
