# Referências de produto (pesquisa: novembro de 2026)

O Nimbo não reproduz interfaces, imagens ou dados dos produtos abaixo. Usamos os padrões gerais de usabilidade e organização:

- Estudaqui — https://www.estudaqui.com/ — ciclo ponderado por peso e dificuldade, horas líquidas, metas e revisões.
- Aprovado — https://aprovadoapp.com/pt/ajuda — histórico de tempo, disciplina, ciclo e análise do progresso.
- EstudaHub — https://estudahub.com.br/ — experiência de importar edital e refletir a verticalização no estudo.
- Todoist — https://www.todoist.com/pt-BR/help/todoist/get-started/plan-your-week-with-the-upcoming-view-OKOg1mR8 — visão semanal, tarefas e reagendamento.
- Notion Student Planner — https://www.notion.com/pt/templates/student-planner-867 — separação entre rotina, estudos, objetivos e revisão da semana.

## Decisões de produto

1. Página inicial somente com ações e métricas essenciais: foco, agenda, edital, acertos, horas e revisões.
2. Calendário semanal único para cinco contextos, com tarefas pontuais e repetição semanal.
3. Importação local do PDF/DOCX em duas fases: prévia editável e confirmação; sem API externa nem promessa de OCR/IA.
4. Preservação de dados: histórico de estudo, arquivos e atividades no PostgreSQL. Importação mescla assuntos por nome canônico e não elimina progresso.
5. Um companheiro original próprio, Nimbo, renderizado com SVG em camadas (2.5D), respeitando `prefers-reduced-motion`.
6. Animações não são recompensa por permanecer clicando: XP vem do estudo, questões, revisões e materiais. Interações sociais alteram vínculo e energia, com limites.
