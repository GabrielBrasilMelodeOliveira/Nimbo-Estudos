import { LinearProgress, Stack, Typography } from "@mui/material";
import { companionClassName } from "./owlAppearance.js";

export function PetClassProgress({ pet, compact = false }) {
  const career = pet.career;
  if (!career)
    return (
      <Typography variant="body2" fontWeight={700}>
        {companionClassName(pet.stage, pet.appearance?.path)}
      </Typography>
    );
  const progress = career.next
    ? Math.min(
        100,
        Math.max(
          0,
          (100 * career.experienceWithinClass) / career.experienceToNextClass,
        ),
      )
    : 100;
  return (
    <Stack spacing={0.75}>
      <Typography
        variant={compact ? "body2" : "subtitle1"}
        fontWeight={700}
        color="primary.main"
      >
        {career.current.name}
      </Typography>
      {!compact && (
        <Typography variant="body2" color="text.secondary">
          {career.current.description}
        </Typography>
      )}
      <LinearProgress
        variant="determinate"
        value={progress}
        aria-label="Progresso da classe"
        sx={{ height: 6, borderRadius: 2 }}
      />
      <Typography variant="caption" color="text.secondary">
        {career.next
          ? `Faltam ${career.remainingExperience} XP para ${career.next.name}`
          : "Classe máxima conquistada. Sua jornada continua!"}
      </Typography>
      {pet.care?.dead && (
        <Typography variant="caption" color="text.secondary">
          Esta vida terminou. Ao recomeçar, você volta a Coruja Viajante.
        </Typography>
      )}
    </Stack>
  );
}

export default function PetProgression() {
  return null;
}
