import { Button } from "@mui/material";
import { ProgressBar } from "../../../shared/components/UI.jsx";
export function GoalStat({ label, actual, target, onClick, unit = "" }) {
  return (
    <Button
      type="button"
      className="n55-goal-stat"
      onClick={onClick}
      title="Ajustar metas"
    >
      <span>{label}</span>
      <strong>
        {actual}
        {target > 0 ? ` / ${target}` : ""}
        {unit}
      </strong>
      {target > 0 ? (
        <ProgressBar
          value={Math.min(100, (100 * actual) / target)}
          height={5}
        />
      ) : (
        <small>Definir meta</small>
      )}
    </Button>
  );
}
