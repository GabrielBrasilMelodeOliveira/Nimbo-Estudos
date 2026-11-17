import { useState } from "react";
import {
  Box,
  Paper,
  Checkbox,
  Typography,
  IconButton,
  Chip,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { GripVertical, Pencil, Play, CalendarArrowUp } from "lucide-react";
import { CATEGORIES } from "../utils/pageDefinitions.jsx";
import { TODAY, fmtHours, dateBR } from "../../../shared/utils/utils.js";

export function AgendaCard({
  item,
  progress,
  completed,
  working,
  dates,
  onComplete,
  onEdit,
  onStart,
  onMove,
}) {
  const [moveAnchor, setMoveAnchor] = useState(null);
  const overdue = !completed && item.scheduledDate < TODAY();
  return (
    <Paper
      variant="outlined"
      data-agenda-id={item.id}
      sx={{
        p: 1.5,
        minWidth: 0,
        borderColor: overdue ? "warning.main" : "divider",
        bgcolor: completed ? "action.hover" : "background.paper",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 0.5 }}>
        <Checkbox
          size="small"
          checked={completed}
          disabled={working}
          onChange={(event) => onComplete(item, event.target.checked)}
          slotProps={{
            input: {
              "aria-label": `${completed ? "Reabrir" : "Concluir"} ${item.title}`,
            },
          }}
          sx={{ p: 0.5, mt: -0.5, ml: -0.5 }}
        />
        <Typography
          component="h3"
          variant="subtitle2"
          sx={{
            flex: 1,
            minWidth: 0,
            overflowWrap: "break-word",
            wordBreak: "normal",
            lineHeight: 1.5,
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {item.title}
        </Typography>
        <Tooltip title="Arrastar para outro dia">
          <Box
            component="span"
            draggable={!completed && !working}
            onDragStart={(event) => {
              event.dataTransfer.setData(
                "application/x-nimbo-agenda",
                String(item.id),
              );
              event.dataTransfer.effectAllowed = "move";
            }}
            sx={{
              cursor: completed ? "default" : "grab",
              color: "text.secondary",
              flexShrink: 0,
              display: "flex",
              p: 0.25,
            }}
            aria-label={`Arrastar ${item.title}`}
          >
            <GripVertical size={18} />
          </Box>
        </Tooltip>
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.75 }}
      >
        {CATEGORIES[item.category]?.name}
        {item.startTime ? ` · ${item.startTime.slice(0, 5)}` : ""} ·{" "}
        {item.durationMinutes} min
      </Typography>
      {progress && (
        <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
          Registrado {fmtHours(progress.seconds)}
          {progress.targetQuestions > 0
            ? ` · ${progress.questions}/${progress.targetQuestions} questões`
            : ""}
        </Typography>
      )}
      <Stack
        direction="row"
        sx={{ gap: 0.5, mt: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        {item.priority === 3 && (
          <Chip
            label="Alta prioridade"
            size="small"
            color="warning"
            variant="outlined"
          />
        )}
        {overdue && <Chip label="Atrasado" size="small" color="warning" />}
        {completed && (
          <Chip
            label="Concluído"
            size="small"
            color="success"
            variant="outlined"
          />
        )}
        <Box sx={{ ml: "auto", display: "flex" }}>
          {item.topic && (
            <IconButton
              aria-label={`Iniciar ${item.title}`}
              onClick={() => onStart(item)}
            >
              <Play size={16} />
            </IconButton>
          )}
          <IconButton
            disabled={working || completed}
            aria-label={`Mover ${item.title}`}
            onClick={(event) => setMoveAnchor(event.currentTarget)}
          >
            <CalendarArrowUp size={16} />
          </IconButton>
          <IconButton
            disabled={working}
            aria-label={`Editar ${item.title}`}
            onClick={() => onEdit(item)}
          >
            <Pencil size={16} />
          </IconButton>
        </Box>
      </Stack>
      <Menu
        anchorEl={moveAnchor}
        open={Boolean(moveAnchor)}
        onClose={() => setMoveAnchor(null)}
      >
        {dates.map((day) => (
          <MenuItem
            key={day}
            disabled={day === item.scheduledDate}
            onClick={() => {
              setMoveAnchor(null);
              onMove(item, day);
            }}
          >
            {dateBR(day)}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}
