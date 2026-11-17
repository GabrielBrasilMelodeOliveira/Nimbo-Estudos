# Nimbo 5.5 — 16/11/2026

- Substituído 1/7/30 dias por revisão adaptativa de assimilação 1–4 (2/7/14/42 dias), com uma próxima revisão por assunto, reclassificação e histórico preservado.
- Migradas revisões antigas pendentes por cancelamento lógico idempotente; assuntos anteriores sem classificação recebem nível 2 inicial.
- Agenda semanal/mensal agora cruza blocos de estudo e revisões com registros reais de teoria e questões.
- Metas independentes por semana e mês persistidas no PostgreSQL: minutos, questões e assuntos.
- Sugestões de plano de estudo exigem confirmação; tarefas pessoais permanecem manuais.
- Atualizados testes de lógica e inclusão de casos novos de revisão e planejamento.

---

# Nimbo 5.4 — usabilidade e navegação

- Simplificadas as cinco opções de navegação principal e agrupadas as demais em “Outras ferramentas”.
- Adicionada busca de páginas (Ctrl+K) e aprimorados teclado e foco em janelas.
- Dashboard substituído por visão de ação: próximo estudo, quatro indicadores, agenda, revisões e tempo semanal; análises detalhadas continuam na aba Desempenho.
- Seleção de assunto mantida ao abrir Questões ou Estudar a partir de recomendações e da planilha do edital.
- Importação de edital, edição do ciclo e filtros avançados agora são seções recolhíveis.
- Retiradas as ações de exclusão em massa das telas diárias; disponíveis em Configurações.
- Revisões e agenda com menos blocos explicativos repetidos.
- Biblioteca, análise de prioridades, tabelas e formulários com tipografia e espaçamento padronizados.
- Não alteradas entidades, migrations, regras de cálculo ou armazenamento no PostgreSQL.

## 5.3 — Cronômetro de questões e interface enxuta
- Novo cronômetro de questões, com pausa e registro de resultado + duração na mesma transação.
- Inclusão de minutos manuais nos registros de questões.
- Sessões categorizadas `THEORY` / `QUESTIONS`, compatíveis com dados antigos.
- Separação de tempo de teoria e questões no dashboard, análise e planilha do edital.
- Dashboard extenso recolhível, textos redundantes removidos e controles de foco compactos.
- Testes de cálculo de duração por assunto e de gravação no backend adicionados.

# Alterações do Nimbo

## 5.2 — Planilha integrada e revisão visual
- Planilha de assunto vinculada às questões, estudo líquido e três revisões com marcação individual.
- Filtros, ordenação, paginação, edição direta e detalhe expandido para cada tópico.
- Grid dos cartões da biblioteca e análise, controles de prioridade e foco corrigidos.
- Leitor de materiais e prints do caderno de erros com apresentação padronizada.
- Explicação do gráfico de tempo dos últimos sete dias.
- Agregação testada com `node --test` sem depender do backend.

# Registro de versões

## 5.1 — Interface, análises e agenda

- Painel principal com gráficos de conclusão por disciplina, teoria/resumo/conclusão, acertos/erros por assunto, revisões, questões diárias, tabela completa e filtros.
- Filtros dinâmicos em Questões e Caderno de erros com métricas reativas.
- Agenda mensal compacta com janela diária e alternância com a semana detalhada.
- Exclusão em massa por categoria e total, com confirmação digitada e operação transacional.
- Revisão transversal de tipografia, espaçamentos, cartões, indicadores, modais, formulários, filtros e responsividade (`refinement.css`).
- Testes unitários do controle de exclusão e aviso de backup.

## 5.0 — Organização, edital e mascote original

- Importador PDF/DOCX com revisão manual, agenda semanal, Nimbo original, dashboard inicial.
