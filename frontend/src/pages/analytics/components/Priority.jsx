import { Flame } from "lucide-react";
import { scoreColor } from "../utils/pageDefinitions.jsx";
export function Priority({ value }) {
  const label = value >= 70 ? "Alta" : value >= 45 ? "Média" : "Baixa";
  return (
    <span
      className="priority-chip"
      style={{
        "--priority-color": scoreColor(value),
      }}
      title={`Índice de prioridade: ${Math.round(value || 0)} de 100`}
    >
      <Flame size={14} /> {label}
    </span>
  );
}
