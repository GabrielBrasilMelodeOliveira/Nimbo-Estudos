import { Button } from "@mui/material";
import { Check } from "lucide-react";
export function StepBox({ checked, onChange, disabled = false, label, title }) {
  return (
    <Button
      type="button"
      className={`study-check ${checked ? "is-checked" : ""}`}
      aria-label={label}
      aria-pressed={checked}
      title={title || label}
      disabled={disabled}
      onClick={onChange}
    >
      <span className="study-check-square">
        {checked && <Check size={15} strokeWidth={3} />}
      </span>
      <span className="study-check-text">{checked ? "Feito" : "Pendente"}</span>
    </Button>
  );
}
