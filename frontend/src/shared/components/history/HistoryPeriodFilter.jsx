import {
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export default function HistoryPeriodFilter({
  period,
  setPeriod,
  selectedDay,
  setSelectedDay,
}) {
  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, flexWrap: "wrap", gap: 1 }}
      >
        <ToggleButtonGroup
          exclusive
          value={period}
          onChange={(_, value) => value && setPeriod(value)}
          aria-label="Período do histórico"
          size="small"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton value="day">Por dia</ToggleButton>
          <ToggleButton value="week">Últimos 7 dias</ToggleButton>
          <ToggleButton value="month">Último mês</ToggleButton>
          <ToggleButton value="all">Todo o histórico</ToggleButton>
        </ToggleButtonGroup>
        {period === "day" && (
          <TextField
            label="Dia do histórico"
            type="date"
            value={selectedDay}
            onChange={(event) =>
              event.target.value && setSelectedDay(event.target.value)
            }
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ width: { xs: "100%", sm: 200 } }}
          />
        )}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {period === "month"
          ? "Últimos 30 dias, incluindo hoje."
          : period === "week"
            ? "Últimos 7 dias, incluindo hoje."
            : period === "custom"
              ? "Intervalo personalizado definido nos filtros de data."
              : period === "day"
                ? "Registros do dia selecionado."
                : "Todos os registros salvos."}
      </Typography>
    </Stack>
  );
}
