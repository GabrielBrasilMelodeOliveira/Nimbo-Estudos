import { OutlinedInput } from "@mui/material";

export function Input({
  min,
  max,
  step,
  maxLength,
  minLength,
  pattern,
  inputProps,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  return (
    <OutlinedInput
      size="small"
      {...props}
      inputProps={{
        min,
        max,
        step,
        maxLength,
        minLength,
        pattern,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
        ...inputProps,
      }}
    />
  );
}

export { SearchableSelect } from "./SearchableSelect.jsx";
