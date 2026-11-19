import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import { Plus } from "lucide-react";
import { TODAY, dateBR } from "../../../shared/utils/utils.js";
import { parseDate } from "../../../shared/utils/plannerMetrics.js";
import { WD } from "../utils/pageDefinitions.jsx";

export function WeekBoard({
  dates,
  working,
  itemsForDay,
  renderDay,
  renderPlan,
  onDrop,
  onAdd,
}) {
  const [dragOverDay, setDragOverDay] = useState(null);
  return (
    <Box
      sx={{ overflowX: "auto", pb: 1 }}
      role="region"
      tabIndex={0}
      aria-label="Quadro semanal"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(7, minmax(180px, 1fr))",
            lg: "repeat(7, minmax(0, 1fr))",
          },
          gap: 1,
          p: 1.5,
        }}
      >
        {dates.map((day, index) => (
          <Paper
            component="section"
            variant="outlined"
            key={day}
            data-agenda-day={day}
            onDragOver={(event) => {
              if (
                !working &&
                event.dataTransfer.types.includes("application/x-nimbo-agenda")
              ) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setDragOverDay(day);
              }
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setDragOverDay(null);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setDragOverDay(null);
              const id = event.dataTransfer.getData(
                "application/x-nimbo-agenda",
              );
              if (id && !working) onDrop(id, day);
            }}
            sx={{
              p: 1,
              minHeight: 280,
              minWidth: 0,
              bgcolor:
                dragOverDay === day
                  ? "action.selected"
                  : day === TODAY()
                    ? "#edf5ef"
                    : "#f7f9f7",
              borderColor: dragOverDay === day ? "primary.main" : "divider",
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <Typography variant="subtitle2">
                {WD[index]} {parseDate(day).getDate()}
              </Typography>
              <Chip label={itemsForDay(day).length} size="small" />
              <IconButton
                sx={{ ml: "auto" }}
                disabled={working}
                aria-label={`Adicionar atividade em ${dateBR(day)}`}
                onClick={() => onAdd(day, true)}
              >
                <Plus size={18} />
              </IconButton>
            </Stack>
            {renderPlan?.(day)}
            {renderDay(day)}
            {!itemsForDay(day).length && (
              <Button
                fullWidth
                size="small"
                disabled={working}
                sx={{ mt: 1 }}
                onClick={() => onAdd(day, true)}
              >
                Planejar atividade
              </Button>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
