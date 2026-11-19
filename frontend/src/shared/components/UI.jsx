import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Stack,
  Typography,
  Paper,
  Chip,
  LinearProgress,
  Alert,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { X, Trash2, Inbox, Maximize2, Minimize2 } from "lucide-react";
import { masteryLabels, statusLabels, fmtPercent } from "../utils/utils.js";

export function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide = false,
  fullScreen = false,
  onToggleFullScreen,
}) {
  return (
    <Dialog
      open
      onClose={(event, reason) => {
        if (fullScreen && reason === "escapeKeyDown" && onToggleFullScreen)
          onToggleFullScreen();
        else onClose(event, reason);
      }}
      fullWidth
      fullScreen={fullScreen}
      maxWidth={wide ? "lg" : "sm"}
      aria-label={title}
    >
      <DialogTitle component="div">
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            sx={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}
          >
            {title}
          </Typography>
          {onToggleFullScreen && (
            <IconButton
              onClick={onToggleFullScreen}
              aria-label={fullScreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {fullScreen ? <Minimize2 /> : <Maximize2 />}
            </IconButton>
          )}
          <IconButton onClick={onClose} aria-label="Fechar">
            <X />
          </IconButton>
        </Stack>
        {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
export function Field({ label, hint, children }) {
  return (
    <FormControl component="label" fullWidth sx={{ gap: 1, my: 1 }}>
      <FormLabel component="span">{label}</FormLabel>
      {children}
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
export function PrimaryButton({
  children,
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <Button variant="contained" disabled={loading || disabled} {...props}>
      {children}
    </Button>
  );
}
export function SubtleButton({ children, ...props }) {
  return (
    <Button variant="outlined" {...props}>
      {children}
    </Button>
  );
}
export function DeleteButton({ onClick, label = "Excluir" }) {
  return (
    <IconButton
      color="error"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <Trash2 size={16} />
    </IconButton>
  );
}
export function Panel({ title, subtitle, action, children, className = "" }) {
  return (
    <Paper
      component="section"
      className={className}
      variant="outlined"
      sx={{ p: 3 }}
    >
      <Stack
        direction="row"

        sx={{
          mb: 2,
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Stack>
          <Typography variant="h6">{title}</Typography>
          {subtitle && (
            <Typography color="text.secondary">{subtitle}</Typography>
          )}
        </Stack>
        {action}
      </Stack>
      {children}
    </Paper>
  );
}
export function Empty({
  title = "Nada por aqui ainda",
  description = "Comece adicionando um registro.",
  icon: Icon = Inbox,
  action,
}) {
  return (
    <Stack spacing={2} sx={{ p: 4, alignItems: "center" }}>
      <Icon size={23} />
      <Typography variant="h6">{title}</Typography>
      <Typography color="text.secondary">{description}</Typography>
      {action}
    </Stack>
  );
}
export function TopicSelect({
  topics,
  value,
  onChange,
  placeholder = "Selecione um assunto",
  required = true,
  disabled = false,
}) {
  const options = [...topics].sort((firstTopic, secondTopic) =>
    (firstTopic.discipline?.name || "").localeCompare(
      secondTopic.discipline?.name || "",
      "pt-BR",
    ),
  );
  return (
    <Autocomplete
      fullWidth
      size="small"
      options={options}
      value={
        options.find((topic) => String(topic.id) === String(value)) || null
      }
      onChange={(_, topic) => onChange(topic ? String(topic.id) : "")}
      getOptionLabel={(topic) => topic.title}
      getOptionKey={(topic) => topic.id}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      groupBy={(topic) => topic.discipline?.name || "Sem disciplina"}
      filterOptions={createFilterOptions({
        stringify: (topic) => `${topic.title} ${topic.discipline?.name || ""}`,
      })}
      disabled={disabled}
      noOptionsText="Nenhum assunto encontrado"
      clearText="Limpar assunto"
      openText="Mostrar assuntos"
      closeText="Fechar assuntos"
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          required={required}
          placeholder={placeholder}
          slotProps={{
            ...parameters.slotProps,
            htmlInput: {
              ...parameters.slotProps.htmlInput,
              "aria-label": placeholder,
            },
          }}
        />
      )}
    />
  );
}
export function MasteryPill({ value }) {
  return <Chip size="small" label={masteryLabels[value] || "Fraco"} />;
}
export function StatusPill({ value }) {
  return <Chip size="small" label={statusLabels[value] || "A iniciar"} />;
}
export function AccuracyTag({ correct, total }) {
  const percentage = total ? (correct * 100) / total : 0;
  return (
    <Chip
      size="small"
      color={
        percentage >= 80 ? "success" : percentage >= 60 ? "warning" : "error"
      }
      label={fmtPercent(percentage)}
    />
  );
}
export function ProgressBar({ value, height = 7, color }) {
  return (
    <LinearProgress
      variant="determinate"
      value={Math.max(0, Math.min(100, value || 0))}
      sx={{
        height,
        borderRadius: 1,
        ...(color
          ? { "& .MuiLinearProgress-bar": { backgroundColor: color } }
          : {}),
      }}
    />
  );
}
export function Tip({ children }) {
  return <Alert severity="info">{children}</Alert>;
}
export function SectionIntro({ kicker, title, description, action }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
    >
      <Stack>
        {kicker && <Typography variant="overline">{kicker}</Typography>}
        <Typography variant="h5">{title}</Typography>
        {description && (
          <Typography color="text.secondary">{description}</Typography>
        )}
      </Stack>
      {action}
    </Stack>
  );
}
