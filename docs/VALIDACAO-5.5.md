# Checklist de verificação — Nimbo 5.5

Antes dos testes: backup do PostgreSQL, iniciar API e frontend com `docker compose up -d --build`.

## Revisões

- [ ] Marcar a teoria de um assunto novo abre a avaliação 1–4.
- [ ] Escolher 1 agenda **uma** revisão para D+2.
- [ ] Escolher 2/3/4 agenda **uma** revisão para D+7/D+14/D+42.
- [ ] Concluir a revisão com outro nível mantém a antiga concluída e cria uma nova data.
- [ ] A tabela Meu edital apresenta apenas a próxima revisão ativa.
- [ ] As revisões históricas de 24h/7d/30d permanecem no histórico e as antigas pendentes não aparecem duplicadas.
- [ ] Nível 1 é destacado como necessidade de reestudar.
- [ ] Reabrir a última revisão cancela a próxima. Reabrir uma revisão anterior à última concluída é proibido.
- [ ] Remover as revisões em Configurações e reiniciar não recria revisões indevidas em assuntos já migrados.

## Planejamento

- [ ] Semana lista os sete dias e mostra as revisões previstas.
- [ ] Mês lista o calendário compacto; clicar no dia abre os detalhes.
- [ ] Metas semanais e mensais são persistidas e mantidas após reiniciar o site.
- [ ] Adicionar compromisso pessoal e concluir manualmente funciona.
- [ ] Adicionar estudo vinculado a um assunto e tipo de tempo funciona.
- [ ] Não é possível duplicar assunto/tipo/data em dois blocos planejados.
- [ ] Ao registrar teoria no cronômetro, minutos aparecem no plano correspondente.
- [ ] Ao registrar questões, quantidade de questões e minutos aparecem no bloco correspondente.
- [ ] Um registro sem plano aparece como **Realizado** no dia.
- [ ] Um registro sem assunto aparece como estudo geral e não é atribuído arbitrariamente a um tópico.
- [ ] Um bloco vinculado não pode ser concluído pelo checkbox manual.
- [ ] As sugestões de estudo não aparecem como compromissos até serem confirmadas.
- [ ] Trocar semana/mês preserva as atividades anteriores.
- [ ] Reagendar um bloco muda apenas o plano, sem modificar as sessões históricas.
- [ ] Excluir assunto vinculado à agenda não deixa referências quebradas no banco.

## Verificação técnica

- [ ] `docker compose ps` apresenta `api`, `web` e `db` em execução.
- [ ] `docker compose logs api` não exibe erro de inicialização/migração.
- [ ] `http://localhost:8080/api/health` retorna `{"status":"ok"}`.
- [ ] Site legível em desktop e celular; rolagem horizontal controlada na grade semanal.
- [ ] Dados anteriores e arquivos enviados ainda estão disponíveis.
