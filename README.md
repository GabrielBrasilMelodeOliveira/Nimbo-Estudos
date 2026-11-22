# Nimbo 5.15.0 — A toca do Nimbo e planejamento editável

A versão **5.15.0** aparece no menu lateral. Para atualizar uma instalação Docker existente:

```bash
git pull --ff-only origin main
docker compose up -d --build
docker compose logs api
```

Recarregue a página após a reconstrução. Apenas `git pull` não substitui o frontend que já está no container. Os volumes existentes são preservados.

Nesta versão:

- **Agenda editável:** botões explícitos para alterar as disciplinas, retirar uma delas ou limpar o planejamento de um dia, nas visões semanal e mensal. O seletor permite pesquisar e limpar a seleção. Remover do dia preserva disciplinas, assuntos e histórico.
- **Painel do Nimbo simplificado:** coruja, XP de estudo, uma fala contextual e três barras com três ações. Voz do computador, chat, incentivo por clique e métricas duplicadas foram removidos. Falas da coruja apontam revisões vencidas, disciplinas planejadas e outros próximos passos reais, com atalhos para estudá-los.
- **Dois tipos de progresso:** XP de estudo continua sendo a única forma de subir nível/classe. Treinar e completar o descanso rendem pontos de cuidado e títulos cosméticos próprios, sem gerar XP de estudo.
- **Treino de 30 minutos:** óculos e livro animados, progresso confirmado no servidor a cada 15 segundos, recompensa única de 20 pontos e preparo cheio. A aba precisa permanecer visível; fechar, minimizar, trocar para outro site ou perder conexão pausa a contagem. Voltar retoma o tempo já confirmado. Recarregar e abrir várias abas não multiplicam a recompensa.
- **Pizza:** animação de 12 segundos, saciedade cheia e +25 de energia. Intervalo de quatro horas entre refeições.
- **Sono de oito horas:** liberado após treinar e comer desde o último sono. Continua offline, preserva as barras enquanto dorme e termina com energia cheia, saciedade mínima de 60%, preparo mínimo de 70% e +10 pontos. Treino/sono concluídos geram aviso de sucesso e comemoração.
- **Desafio vital:** saciedade cai 4 pontos/h, energia 3 e preparo 2 enquanto o companheiro está ativo e acordado, inclusive offline. O recomendado é manter as três em pelo menos 35%. Uma barra zerada inicia uma crise de 12 horas; recuperar todas para acima de zero ou iniciar o sono encerra a crise. Sem recuperação, a vida termina. Companheiros em reserva preservam os sinais vitais.
- **Regras diárias mantidas para toda a coleção:** 1 dia encerrado sem progresso dá fome; 2, cansaço; 3, tristeza pela manhã/irritação à tarde; o 4º causa morte. Cuidados não substituem estudo, e estudo não preenche barras de cuidado. Recomeçar preserva estudos, aparência, recordes e pontos de cuidado, mas reinicia o XP daquela vida.
- **Recompensas de cuidado:** títulos em 30, 100, 300 e 600 pontos, exibidos em Meu Nimbo, além do histórico de ciclos completos. O próximo treino fica disponível oito horas após concluir o anterior.

As novas colunas de sinais vitais e temporizadores são adicionadas a `pet_companions`, inclusive nos schemas de outras contas. As barras de companheiros existentes começam em 80% no primeiro acesso; não há desgaste vital retroativo. O histórico de metas e XP existente permanece. O horário dos fechamentos continua sendo America/Fortaleza.

A implementação fica em `companions/services/PetVitalCare.java`; os acessórios animados usam a mesma arte vetorial editável de `shared/components/pet/`. Nenhuma imagem externa nova ou serviço de voz foi adicionado. As rotas autenticadas são `POST /api/pet/interact` com `TRAIN`, `FEED` ou `REST`, e `POST /api/pet/{id}/presence` com `{ "present": true|false }`; o cliente nunca envia a quantidade de tempo a conceder. Todas as operações usam o bloqueio transacional diário da conta para evitar recompensas duplicadas.

Recursos da versão 5.14.0 preservados:

- **Cadastro e login:** nome, e-mail e senha, com telas MUI, confirmação de senha, mostrar/ocultar senha e opção de sair no perfil.
- **Dados por conta no PostgreSQL:** disciplinas, assuntos, agenda, metas, sessões, questões, revisões, flashcards, erros, materiais, anexos e companheiros ficam separados. A limpeza de dados também se limita à conta conectada.
- **Primeira conta preserva o histórico existente:** copie o valor `NIMBO_SETUP_KEY` dos logs da API e informe a chave no primeiro cadastro. Ela é necessária para assumir os dados antigos e deixa de valer depois desse cadastro. As próximas contas começam vazias e não pedem a chave.
- **Sessões persistidas no banco:** senha com BCrypt, cookie HTTP-only e SameSite, proteção CSRF, limite de tentativas e renovação do identificador ao entrar. O login expira após 12 horas de inatividade. A saída invalida a sessão.
- **Troca de conta:** conteúdo privado só é carregado após autenticação; abas antigas são atualizadas e requisições da conta anterior são rejeitadas. Posição do Nimbo, menu lateral e rascunho do cronômetro ficam separados por conta neste navegador. Ao sair, o cronômetro pausa e seu tempo pode ser retomado na mesma aba ao entrar novamente.
- **Coruja sem recortes vazios:** anatomia contínua atrás das asas, pescoço, barriga e junções das pernas. As partes móveis se sobrepõem ao respirar, olhar, acenar e executar os gestos de cada classe; desenho, acessórios e cores aprovados foram mantidos.

### Primeiro acesso e armazenamento

O cadastro inicial exige a chave dos logs mesmo em uma instalação vazia. Se a API reiniciar antes desse cadastro, uma nova chave é gerada. Opcionalmente, configure `NIMBO_SETUP_KEY` no ambiente da API para fixar a chave até a criação da primeira conta. Não há envio ou recuperação de senha por e-mail nesta versão.

As tabelas `nimbo_accounts`, `nimbo_installation`, `nimbo_sessions` e `nimbo_sessions_attributes` ficam em `public`. A primeira conta utiliza as tabelas de estudos existentes em `public`; cada conta adicional recebe um schema PostgreSQL `nimbo_<id>`, com tabelas, sequências e chaves estrangeiras próprias. A API escolhe o schema pela sessão autenticada, nunca pelo conteúdo enviado pelo navegador. Os arquivos também são consultados no schema da conta antes de serem entregues.

No início da API, o modelo JPA atualiza a base existente e `AccountSchemaService` adiciona tabelas/colunas/chaves estrangeiras ausentes nos schemas das outras contas. Alterações destrutivas, mudanças de tipos e de índices existentes exigem migração explícita em uma versão futura. O usuário do banco precisa poder criar schemas. Um backup completo do banco deve incluir **todos os schemas**, além do volume de anexos antigos.

O frontend usa `/api` na mesma origem. O proxy do Vite e o Nginx do Docker já encaminham essas chamadas. Em uma hospedagem pública, configure HTTPS e um proxy confiável; o cookie recebe `Secure` nas requisições HTTPS. A instalação Docker continua vinculada ao endereço local por padrão.

### API de acesso

- `GET /api/auth/session`: usuário atual (ou `null`), token CSRF e indicação de configuração inicial.
- `POST /api/auth/register`: `{ "name":"Nome", "email":"nome@exemplo.com", "password":"senha-com-10-ou-mais-caracteres", "setupKey":"somente-no-primeiro-cadastro" }`.
- `POST /api/auth/login`: `{ "email":"nome@exemplo.com", "password":"sua-senha" }`.
- `POST /api/auth/logout`: invalida a sessão. Chamadas de escrita exigem o cabeçalho `X-CSRF-TOKEN` recebido em `/session`; após login/cadastro, consulte `/session` novamente para receber o novo token. Cookies devem acompanhar as chamadas.
- As demais rotas, inclusive uploads, prévias e `/api/health`, exigem login. O cliente envia `X-Nimbo-Account` para impedir gravações de abas que ainda pertencem à conta anterior; URLs de arquivos usam o parâmetro `account` com a mesma finalidade.

Recursos da versão 5.13.1 preservados:

- Pálpebras na cor das penas, inclusive nos estados de cansaço e morte.
- Equipamentos finais de Guerreiro e Patrulheiro baseados nas referências: armadura azul/prata, capa vermelha e escudo com brasão; traje verde, aljava e arco recurvo/tensionado.

Recursos da versão 5.13.0 preservados:

- **Base refeita a partir da imagem enviada:** contorno em três quartos, olhos, bico, penas, cachecol e bolsa reproduzidos em uma grade de pixels com cores editáveis. A silhueta original permanece reconhecível nos três caminhos.
- **Sete poses diferentes por caminho:** viajante em repouso, aprendiz lendo e posturas próprias de guarda, combate, comando e ascensão. As asas, cabeça e pés são articulados separadamente. Guerreiro, Mago e Patrulheiro possuem equipamentos e poses próprios a partir da terceira etapa.
- **Armaduras com evolução visível:** peitoral na terceira classe, ombreiras e manto na quarta, detalhes dourados na quinta, proteção de comandante na sexta e ornamentos/aura na última. Espada e escudo, cajado e runas, arco e aljava distinguem os caminhos sem esconder os olhos.
- **Gestos variados com intervalos diferentes:** olhar, limpar penas, espreguiçar, dar um passo, ajustar o cachecol e acenar; leitura para o aprendiz e gestos de espada/escudo, conjuração/cajado e arco/vigilância nas classes avançadas. A sequência percorre as ações disponíveis antes de repetir e evita repetir o último gesto ao iniciar outra sequência. Fome, tristeza, cansaço e raiva têm repertórios próprios. Animações são pausadas fora da área visível, com a aba oculta ou com movimento reduzido; a coruja morta permanece imóvel.
- Personalizações, XP, classes conquistadas, regras de metas e recuperação da bolinha continuam preservados. Esta atualização é visual e não exige migração de dados.

Recursos da versão 5.12 preservados:

- **Coruja em pixel art de 16 bits**, inspirada na referência enviada: olhos grandes, penas com sombras, cachecol, asas e bolsa. A arte em camadas permite mudar cores e equipamentos sem perder as expressões e animações. Ela respira, pisca, olha para os lados e movimenta as asas mesmo em repouso. Os humores e as sequências de metas continuam visíveis; na morte, fica imóvel e sem cor. Movimento reduzido do dispositivo é respeitado.
- **Meu Nimbo → Personalizar coruja:** escolha Guerreiro, Mago ou Patrulheiro; cores das penas, olhos e cachecol/equipamentos; acessório da classe, nenhum, óculos, chapéu, capuz ou coroa; bolsa, capa ou nenhum acessório no corpo. Os seletores permitem digitar para procurar. Veja a prévia das sete evoluções e dos humores antes de salvar. A prévia não altera o XP ou o humor real. Há um botão para restaurar o visual azul original.
- **Personalização persistida por companheiro:** trocar o caminho ou os acessórios mantém XP, vínculo, vida, humor e dados de estudo. As colunas de aparência são opcionais e adicionadas à tabela existente. Companheiros antigos recebem valores visuais padrão sem recriação de registros. Reiniciar uma vida preserva os acessórios, mas continua zerando o XP daquela vida conforme as regras anteriores.
- **Bolinha recuperável:** renderizada acima da barra lateral, em uma camada própria, com a posição limitada à área visível do conteúdo. Posições antigas atrás do menu são corrigidas ao abrir a página; abrir/recolher o menu e redimensionar a janela reajusta os limites. “Recuperar companheiro”, no menu e em Meu Nimbo, recolhe o painel e traz a bolinha para o canto inferior direito. Ela continua visível durante o cronômetro de estudo; em telas pequenas, a bolinha fica acima dele para não cobrir seus botões.
- XP, coleção, regras de metas e desbloqueio de outro companheiro no nível 13 são preservados. Só estudos, questões e revisões concedem XP; personalização é cosmética.

| Etapa | XP total | Guerreiro | Mago | Patrulheiro |
| --- | ---: | --- | --- | --- |
| 1 | 0 | Coruja Viajante | Coruja Viajante | Coruja Viajante |
| 2 | 200 | Aprendiz | Aprendiz | Aprendiz |
| 3 | 400 | Soldado | Mago | Batedor |
| 4 | 800 | Guardião da Vigília | Guardião das Runas | Sentinela do Bosque |
| 5 | 1.200 | Mestre de Batalha | Mestre Arcano | Mestre Rastreador |
| 6 | 2.400 | Comandante da Aurora | Arquimago da Aurora | Guardião do Horizonte |
| 7 | 4.000 | Lenda da Constância | Lenda da Constância | Lenda da Constância |

A progressão é definida em `backend/src/main/java/br/com/concursoti/companions/types/CompanionClass.java`; a personalização usa `PUT /api/pet/{id}/appearance`. O sprite e as opções de aparência ficam em `frontend/src/shared/components/pet/`. A avaliação dos conjuntos gratuitos e a documentação da arte em camadas baseada na referência enviada estão em [ASSETS.md](frontend/src/shared/components/pet/ASSETS.md).

Recursos da versão 5.10.2 preservados:

- Cards e painéis usam `Paper` do MUI, inclusive os indicadores e cards legados do Início, Edital, Questões, Caderno de erros, Materiais, Simulados, Agenda, Configurações e coleção do Nimbo. Sombra neutra e discreta dá profundidade sem alterar a cor branca do fundo. O padrão é ajustável em `frontend/src/shared/theme/surfaceStyles.js`.
- Flashcards próprios aceitam imagem na pergunta e na resposta, selecionada no dispositivo ou colada com Ctrl+V/⌘V. É possível usar texto, imagem ou ambos em cada lado. PNG/JPG/WEBP até 20 MB, com pré-visualização, troca e remoção. O envio precisa terminar antes de salvar; as imagens são armazenadas pelo mesmo serviço de anexos do caderno de erros. A imagem da resposta só aparece na revisão depois de revelada.
- Editar as imagens preserva o agendamento FSRS. A atualização adiciona duas colunas opcionais à tabela de cartões pessoais e mantém os cartões antigos.
- Bordas de cards, painéis, filtros e separadores em cinza neutro `#D0D0D0`, definido em `designColors.border`. Destaques de foco e erros de formulário continuam visíveis.
- Seções de página com respiro de 24 px; o grupo de filtros, indicadores e anotações do caderno recebeu espaçamento próprio.
- Os dois gráficos de “Estudo nos últimos 7 dias” dividem igualmente a largura disponível no computador e ficam empilhados em telas menores.

Recursos da versão 5.10.1 preservados:

- Indicadores de fechamento do dia, registros e metas concluídas seguem a paleta ativa. Verde/vermelho permanecem nas métricas de acertos e erros.
- “Por assunto”, em Questões, usa colunas alinhadas para acertos, erros, barras e percentuais, com disposição adaptada a telas menores.
- Barra lateral MUI sem rolagem horizontal. O botão de recolher/expandir alterna entre menu completo e ícones com dicas; a preferência é lembrada. A área de conteúdo aproveita o espaço liberado. No celular, permanece um menu sobreposto, com fechamento por botão, Escape ou toque fora.

Recursos da versão 5.10 preservados:

- **Flashcards próprios:** botão “Novo flashcard”, pergunta/resposta lado a lado e disciplina/assunto opcionais. Em “Meus flashcards”, edite ou exclua os cartões criados. Usam a mesma revisão FSRS, atalhos e desfazer dos erros vinculados, sem criar uma anotação no caderno. Editar preserva o agendamento e invalida a avaliação pendente de desfazer. Excluir remove somente aquele cartão pessoal e seu histórico.
- **Históricos de Estudar e Questões:** rolagem vertical com cabeçalho fixo, navegação por teclado e filtros “Por dia”, “Últimos 7 dias”, “Último mês” (30 dias incluindo hoje) e “Todo o histórico”. Na aba Questões, o período também atualiza as métricas e combina com os filtros de assunto, disciplina, acertos e datas personalizadas.
- **Nimbo recolhido:** bolinha arrastável com mouse ou toque, posição lembrada entre acessos e limitada ao espaço da tela. Clique para expandir; as setas do teclado também movem a bolinha quando ela está focada. Um arraste não abre o painel.
- **Cores centralizadas:** quatro paletas prontas, com a azul solicitada ativa e fundo branco em todas as páginas. Botões, campos, menu e gráficos usam os mesmos tokens. Acertos/erros preservam verde/vermelho para manter o significado das métricas.

### Como mudar as cores

Edite **`frontend/src/shared/theme/designColors.js`**. Troque `activePaletteName` por `ocean`, `forest`, `violet` ou `terracotta`, ou edite as quatro cores de uma paleta. A paleta `ocean` começa com:

| Papel | Cor |
| --- | --- |
| `dark` — texto e menu | `#1B262C` |
| `primary` — ações principais | `#0F4C75` |
| `accent` — destaques e séries de gráficos | `#3282B8` |
| `light` — superfícies e realces | `#BBE1FA` |
| `siteBackground` — fundo fixo | `#FFFFFF` |

As variações suaves são calculadas a partir da paleta; as bordas estruturais usam cinza neutro independente da paleta. As cores semânticas de sucesso, erro e atenção também estão nesse arquivo, em `statusColors`. A arte dos mascotes e cores de disciplinas já escolhidas pelo usuário permanecem próprias. Depois de alterar o arquivo, reconstrua o frontend (ou execute `docker compose up -d --build`).

A atualização cria a tabela `manual_flashcards` automaticamente pelo mecanismo de esquema já usado no projeto. As colunas e os agendamentos de revisão dos erros existentes são preservados. Limpar apenas o edital ou os assuntos mantém os cartões pessoais, retirando suas associações; “Excluir tudo” também exclui os cartões pessoais.

Recursos da versão 5.9 preservados:

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

Abra **http://localhost:3000**. A API também responde em `http://localhost:8080/api/health` após autenticação.

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

Os registros antigos permanecem e são atribuídos à primeira conta mediante a chave de configuração. A autenticação e a separação entre contas estão incluídas; migrações destrutivas futuras devem ser versionadas.

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
