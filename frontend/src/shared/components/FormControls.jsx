import { OutlinedInput, Select } from "@mui/material";

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

export function NativeSelect({
  children,
  inputProps,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  return (
    <Select
      native
      size="small"
      {...props}
      inputProps={{
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
        ...inputProps,
      }}
    >
      {children}
    </Select>
  );
}
