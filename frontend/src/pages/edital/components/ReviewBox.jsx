import { Button } from "@mui/material";
import { dateBR } from "../../../shared/utils/utils.js";
import { localDate } from "../../../shared/utils/editalMetrics.js";
export function ReviewBox({ task, openReview, theoryDone }) {
  if (!task)
    return (
      <span className="review-blank">
        {theoryDone ? "Sem revisão" : "Após teoria"}
      </span>
    );
  const overdue = task.dueDate <= localDate();
  return (
    <Button
      type="button"
      className={`review-check ${overdue ? "is-overdue" : ""}`}
      onClick={() => openReview(task)}
      title="Concluir e reagendar após avaliar o aprendizado"
    >
      <span>{dateBR(task.dueDate)}</span>
      <small>{overdue ? "Revisar" : `${task.intervalDays} dias`}</small>
    </Button>
  );
}
