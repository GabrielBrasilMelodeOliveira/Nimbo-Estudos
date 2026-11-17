import { Button } from "@mui/material";
import { rankOptions } from "../utils/pageDefinitions.jsx";
export function Ratings({ value, onChange, label, description }) {
  return (
    <div className="rating-field">
      <div>
        <strong>{label}</strong>
        <small>{description}</small>
      </div>
      <div className="rating-options">
        {rankOptions.map((n) => (
          <Button
            key={n}
            type="button"
            className={Number(value) === n ? "selected" : ""}
            onClick={() => onChange(n)}
            aria-pressed={Number(value) === n}
          >
            {n}
          </Button>
        ))}
      </div>
    </div>
  );
}
