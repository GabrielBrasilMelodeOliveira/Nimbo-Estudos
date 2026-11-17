export const TODAY = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
};
export function dateBR(date) {
  if (!date) return "—";
  const [y, m, d] = date.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}
export function weekday(date) {
  return ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"][
    new Date(`${date}T12:00:00`).getDay()
  ];
}
export function percentage(correct, total) {
  return total ? (correct * 100) / total : 0;
}
export function fmtPercent(n) {
  return `${Number(n || 0).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}
export function fmtHours(seconds) {
  const safe = Math.max(0, Math.floor(seconds || 0));
  if (safe > 0 && safe < 60) return `${safe}s`;
  const mins = Math.floor(safe / 60);
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;
}
export function fmtTimer(seconds) {
  const s = Math.floor(seconds || 0);
  return `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
export const statusLabels = {
  NOT_STARTED: "A iniciar",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluído",
};
export const masteryLabels = {
  WEAK: "Fraco",
  MEDIUM: "Médio",
  STRONG: "Forte",
};
export const materialLabels = {
  PDF: "PDF / apostila",
  DOCX: "Word / DOCX",
  IMAGE: "Imagem",
  VIDEO: "Videoaula",
  QUESTIONS: "Plataforma de questões",
  DRIVE: "Google Drive",
  COURSE: "Curso",
  OTHER: "Outro",
};
export function topicStats(data) {
  const byTopic = new Map();
  for (const q of data.questions || []) {
    const old = byTopic.get(q.topic.id) || { total: 0, correct: 0 };
    old.total += q.total;
    old.correct += q.correct;
    byTopic.set(q.topic.id, old);
  }
  return byTopic;
}
