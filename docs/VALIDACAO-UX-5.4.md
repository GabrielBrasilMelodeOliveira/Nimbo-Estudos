# Checklist de validação — Nimbo 5.4

Esta versão muda a interface React sem alterar o banco. Antes de atualizar, faça backup.

## Navegação

- [ ] Abrir Início → Estudar → Questões → Meu edital pela barra lateral.
- [ ] Expandir e recolher “Outras ferramentas” mesmo estando em uma página secundária.
- [ ] Usar Ctrl+K, buscar “materiais”, abrir com Enter e fechar com Esc.
- [ ] No celular, abrir e fechar o menu e verificar se o mascote não cobre os botões.

## Fluxos práticos

- [ ] No início, selecionar “Estudar este assunto” e verificar o assunto preenchido no cronômetro de teoria.
- [ ] Em Desempenho, expandir um assunto → “Praticar questões” e verificar o assunto no cronômetro e nos filtros.
- [ ] Em Meu edital, expandir um assunto → “Questões” ou “Registrar estudo” e verificar a seleção correta.
- [ ] Manter um cronômetro em andamento, navegar e confirmar que ele não troca de assunto automaticamente.
- [ ] Importar edital pela seção recolhível e salvar sem alterar registros existentes.
- [ ] Abrir filtros avançados de Questões, Edital e Caderno de erros; combinar filtros, limpar e verificar os totais.
- [ ] Criar/concluir uma atividade na Agenda; alternar mês/semana e editar pelo dia.
- [ ] Abrir PDF/DOCX ou link em Materiais; usar prints no Caderno de erros; criar um simulado.
- [ ] Em Revisões, alternar os três tipos de fila e concluir/reabrir uma revisão.
- [ ] Em Configurações, localizar “Gerenciar e limpar dados” (não execute a limpeza em um banco com dados reais).

## Layout / acessibilidade

- [ ] Conferir em 390px, 768px e desktop: sem sobreposição de botões ou corte de texto.
- [ ] Verificar foco visível, Tab nos formulários e Escape nas janelas.
- [ ] Validar as tabelas grandes por rolagem horizontal, sem esconder colunas de dados.
- [ ] Conferir modo com pouco movimento (`prefers-reduced-motion`).

## O que não foi validado neste ambiente

- Build Maven/Vite e execução do Docker; faltaram dependências npm para a compilação do frontend.
- Testes reais de navegador e regressão visual. Faça as checagens acima localmente.
