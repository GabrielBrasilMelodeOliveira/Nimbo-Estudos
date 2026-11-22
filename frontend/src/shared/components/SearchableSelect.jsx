import { Children, isValidElement, useEffect, useMemo, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";

function readOptions(children, group = "") {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child)) return [];
    if (child.type === "optgroup")
      return readOptions(child.props.children, child.props.label);
    if (child.props.value === undefined)
      return readOptions(child.props.children, group);
    return [
      {
        value: String(child.props.value),
        label: Children.toArray(child.props.children).join(""),
        disabled: Boolean(child.props.disabled),
        group,
      },
    ];
  });
}

/** Keeps the same value/onChange contract as form fields while allowing text search. */
export function SearchableSelect({
  children,
  value = "",
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  allowClear = false,
  name,
  inputProps,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  fullWidth = true,
  size = "small",
  ...props
}) {
  // Keep option/value identities stable during background refreshes (e.g. flashcard countdown).
  const optionSnapshot = JSON.stringify(readOptions(children));
  const options = useMemo(() => JSON.parse(optionSnapshot), [optionSnapshot]);
  const selected =
    options.find((option) => option.value === String(value)) || null;
  const inputReference = useRef(null);
  useEffect(() => {
    inputReference.current?.setCustomValidity(
      required && !selected?.value ? "Selecione uma opção válida." : "",
    );
  }, [required, selected?.value]);
  return (
    <Autocomplete
      {...props}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      options={options}
      value={selected}
      disableClearable={!allowClear}
      clearText="Limpar seleção"
      getOptionLabel={(option) => option.label}
      getOptionKey={(option) => option.value}
      getOptionDisabled={(option) => option.disabled}
      isOptionEqualToValue={(option, current) => option.value === current.value}
      {...(options.some((option) => option.group)
        ? { groupBy: (option) => option.group }
        : {})}
      onChange={(_, option) =>
        onChange?.({ target: { name, value: option?.value ?? "" } })
      }
      noOptionsText="Nenhuma opção encontrada"
      openText="Mostrar opções"
      closeText="Fechar opções"
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          label={label}
          placeholder={placeholder}
          required={required}
          inputRef={inputReference}
          name={name}
          slotProps={{
            ...parameters.slotProps,
            htmlInput: {
              ...parameters.slotProps.htmlInput,
              ...inputProps,
              "aria-label": ariaLabel,
              "aria-describedby": ariaDescribedBy,
            },
          }}
        />
      )}
    />
  );
}
