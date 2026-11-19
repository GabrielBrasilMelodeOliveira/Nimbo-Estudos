import { useState } from "react";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { MessageCircle, Flame } from "lucide-react";

export default function PetCareStatus({
  pet,
  action,
  working,
  compact = false,
}) {
  const [restartOpen, setRestartOpen] = useState(false);
  const care = pet?.care;
  if (!care) return null;
  const restart = async () => {
    if (
      await action(
        `pet/${pet.id}/restart`,
        "POST",
        undefined,
        "Uma nova vida começou. Seu histórico de estudos foi preservado.",
      )
    )
      setRestartOpen(false);
  };
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
        <Chip
          size="small"
          color={care.dead ? "error" : care.streak ? "success" : "default"}
          label={care.moodLabel}
        />
        <Chip
          size="small"
          icon={<Flame size={14} />}
          label={`${care.streak} dia(s) de metas completas`}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        role="status"
        sx={{
          p: 1.5,
          bgcolor: care.dead ? "action.hover" : "action.hover",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <MessageCircle size={19} style={{ flexShrink: 0 }} />
        <Typography variant="body2">{pet.message || care.message}</Typography>
      </Stack>
      {!care.dead && (
        <>
          <Typography variant="caption">
            Próximo marco: {care.nextMilestone} dias · Recorde:{" "}
            {care.bestStreak}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, (care.streak / care.nextMilestone) * 100)}
            sx={{ height: 6, borderRadius: 3 }}
          />
          {!compact && (
            <Typography variant="body2" color="text.secondary">
              Marcos de constância: 3 dias orgulhoso, 7 empolgado, 14 radiante e
              30 lendário. A sequência continua contando depois disso.
            </Typography>
          )}
        </>
      )}
      {care.dead && (
        <>
          <Alert severity="warning">
            Vida {care.lifeNumber} encerrada em{" "}
            {care.deathDate?.split("-").reverse().join("/")}. {pet.xp} XP nesta
            vida.
          </Alert>
          <Button
            variant="outlined"
            color="warning"
            disabled={working}
            onClick={() => setRestartOpen(true)}
          >
            Recomeçar uma vida
          </Button>
        </>
      )}
      <Dialog
        open={restartOpen}
        onClose={() => !working && setRestartOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Recomeçar com este Nimbo?</DialogTitle>
        <DialogContent>
          <Typography>
            O XP, o vínculo e a sequência desta vida voltam ao início. O recorde
            e o número de vidas ficam registrados. Seus estudos, questões e
            metas continuam salvos.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={working} onClick={() => setRestartOpen(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={restart} disabled={working}>
            Iniciar nova vida
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
