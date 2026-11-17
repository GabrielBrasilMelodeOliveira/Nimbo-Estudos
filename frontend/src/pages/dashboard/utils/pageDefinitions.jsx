export const area = {
  PERSONAL: "Pessoal",
  ACADEMIC: "Faculdade",
  STUDY: "Concurso",
  WORK: "Trabalho",
  HEALTH: "Saúde",
};
export const priorityLabel = (n) =>
  n >= 70
    ? "Prioridade alta"
    : n >= 45
      ? "Prioridade média"
      : "Próxima sugestão";
