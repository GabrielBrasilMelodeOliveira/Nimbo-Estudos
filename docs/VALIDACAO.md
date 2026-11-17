# Verificação — Nimbo 5.3

## Validado neste ambiente
- `node --test frontend/tests/*.test.js`: 3 testes aprovados. Inclui agregação de tempo de teoria/questões por assunto e compatibilidade com registros antigos.
- Análise sintática do frontend com parser TypeScript: 23 arquivos JavaScript/JSX sem erros.
- Análise sintática das folhas CSS com PostCSS: 5 arquivos sem erros.
- Arquivos e integridade do pacote ZIP verificados.
- Testes Java adicionados para resultado + tempo, tipo `QUESTIONS` e compatibilidade de legado.

## Pendente na máquina do usuário
- Compilação Maven e execução dos testes do backend (Maven não está disponível neste ambiente).
- Compilação Vite/React e teste visual, porque o npm não alcança o registro para instalar dependências aqui.
- Validação ponta a ponta com PostgreSQL: adicionar sessão de questões, ver os tempos separados no dashboard e editar/excluir um registro.

## Checklist funcional
1. Em **Questões**, escolher um assunto, iniciar cronômetro, pausar, continuar e **Registrar resultado**.
2. Confirmar que o bloco aparece com tempo e que o histórico em **Hora de focar** contém uma sessão do tipo Questões.
3. Registrar uma sessão de teoria; conferir os dois tempos separados no dashboard e na planilha **Meu edital**.
4. Usar filtros dinâmicos e confirmar que os totais dos registros acompanham os filtros.
5. Abrir o grupo **Análise detalhada** na página inicial, verificando os gráficos mantidos.
6. Conferir que as sessões antigas permanecem no tempo de teoria.
7. Fazer backup do banco e verificar que a atualização não reinicia seus dados.

As horas no edital só são atribuídas a um assunto se a sessão estiver ligada àquele assunto. O total da disciplina pode incluir sessões sem assunto.
