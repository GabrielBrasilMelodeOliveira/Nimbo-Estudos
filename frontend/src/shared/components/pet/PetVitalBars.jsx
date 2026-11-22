import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BookOpen, Moon, Pizza } from "lucide-react";

export default function PetVitalBars({
  pet,
  action,
  working = false,
  readOnly = false,
}) {
  const vitals = pet?.vitals;
  if (!vitals) return null;
  const controls = [
    {
      label: "Preparo",
      value: vitals.readiness,
      button: "Treinar",
      type: "TRAIN",
      allowed: vitals.canTrain,
      hint: vitals.trainHint,
      Icon: BookOpen,
      message: "Treino iniciado. São 30 minutos com o Nimbo visível na aba.",
    },
    {
      label: "Saciedade",
      value: vitals.satiety,
      button: "Comer",
      type: "FEED",
      allowed: vitals.canEat,
      hint: vitals.eatHint,
      Icon: Pizza,
      message: "Pizza servida! Saciedade cheia e energia recuperada.",
    },
    {
      label: "Energia",
      value: vitals.energy,
      button: "Descansar",
      type: "REST",
      allowed: vitals.canRest,
      hint: vitals.restHint,
      Icon: Moon,
      message: "Sono iniciado. Volto em oito horas, mesmo com o site fechado.",
    },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 1,
      }}
    >
      {controls.map(
        ({ label, value, button, type, allowed, hint, Icon, message }) => (
          <Stack key={type} spacing={0.75}>
            <Typography variant="caption" color="text.secondary">
              {label}{" "}
              <Box component="strong" sx={{ color: "text.primary" }}>
                {value}%
              </Box>
            </Typography>
            <LinearProgress
              aria-label={label}
              variant="determinate"
              value={value}
              color={value < 15 ? "error" : value < 35 ? "warning" : "primary"}
              sx={{ height: 6, borderRadius: 3 }}
            />
            {!readOnly && (
              <Tooltip title={hint || ""} describeChild>
                <span>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Icon size={15} />}
                    disabled={working || pet.care?.dead || !allowed}
                    sx={{
                      px: 0.5,
                      fontSize: 12,
                      "& .MuiButton-startIcon": { mr: 0.5 },
                    }}
                    onClick={() =>
                      action("pet/interact", "POST", { action: type }, message)
                    }
                  >
                    {button}
                  </Button>
                </span>
              </Tooltip>
            )}
          </Stack>
        ),
      )}
    </Box>
  );
}
