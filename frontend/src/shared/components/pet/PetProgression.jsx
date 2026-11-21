import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Check, LockKeyhole } from "lucide-react";
import { PetArt } from "../Pet.jsx";
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

export default function PetProgression({ pet }) {
  const journey = pet?.classJourney;
  if (!journey?.length) return null;
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-label="Jornada de evolução"
      sx={{ p: { xs: 2, md: 3 } }}
    >
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={700}>
            De um primeiro passo a uma lenda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seu XP de estudos, questões e revisões desbloqueia roupas e
            equipamentos. O humor acompanha suas metas diárias.
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
              xl: "repeat(7, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          {journey.map((heroClass) => {
            const current = pet.stage === heroClass.rank;
            const unlocked = pet.xp >= heroClass.minimumExperience;
            return (
              <Stack
                key={heroClass.rank}
                spacing={1}
                aria-current={current ? "step" : undefined}
                sx={{
                  p: 1.5,
                  minWidth: 0,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: current ? "action.selected" : "background.paper",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 100 }}>
                  <PetArt
                    species={pet.species}
                    stage={heroClass.rank}
                    appearance={pet.appearance}
                    mood="neutral"
                  />
                </Box>
                <Typography variant="body2" fontWeight={700}>
                  {heroClass.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Nível {heroClass.minimumLevel} · {heroClass.minimumExperience}{" "}
                  XP
                </Typography>
                <Chip
                  size="small"
                  sx={{ maxWidth: "100%" }}
                  variant="outlined"
                  color={current ? "primary" : "default"}
                  icon={
                    unlocked ? <Check size={13} /> : <LockKeyhole size={13} />
                  }
                  label={
                    current
                      ? "Classe atual"
                      : unlocked
                        ? "Conquistada"
                        : "A conquistar"
                  }
                />
              </Stack>
            );
          })}
        </Box>
      </Stack>
    </Paper>
  );
}
