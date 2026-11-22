import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Portal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronDown, Flame, Sparkles } from "lucide-react";
import { accountLocalStorage } from "../utils/accountStorage.js";
import { companionRecoveryEvent } from "../utils/companionRecovery.js";
import { companionPrompt } from "../utils/companionPrompt.js";
import { useDraggableCompanion } from "../hooks/useDraggableCompanion.js";
import usePetCareSession from "../hooks/usePetCareSession.js";
import { PetArt, speciesInfo } from "./Pet.jsx";
import { companionClassName } from "./pet/owlAppearance.js";
import PetCareStatus from "./pet/PetCareStatus.jsx";
import PetVitalBars from "./pet/PetVitalBars.jsx";

const duration = (seconds) => {
  const remaining = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(remaining / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((remaining / 60) % 60)
    .toString()
    .padStart(2, "0")}:${(remaining % 60).toString().padStart(2, "0")}`;
};

export default function PetCompanion({
  pet,
  data = {},
  navigate,
  action,
  working,
  onPetUpdate,
}) {
  const [open, setOpen] = useState(() => {
    try {
      return accountLocalStorage.getItem("nimbo:open") === "true";
    } catch {
      return false;
    }
  });
  const [evolution, setEvolution] = useState("");
  const previousCompanion = useRef({ id: pet?.id, stage: pet?.stage });
  const { now, notice, clearNotice, celebrating } = usePetCareSession(
    pet,
    onPetUpdate,
  );
  useEffect(() => {
    const previous = previousCompanion.current;
    if (
      pet?.id === previous.id &&
      pet?.stage > previous.stage &&
      !pet?.care?.dead
    ) {
      setEvolution(
        `ABRAM ALAS! Virei ${pet.career?.current?.name || companionClassName(pet.stage, pet.appearance?.path)}. Foi seu estudo que pagou essa armadura!`,
      );
    } else if (pet?.id !== previous.id) setEvolution("");
    previousCompanion.current = { id: pet?.id, stage: pet?.stage };
  }, [
    pet?.id,
    pet?.stage,
    pet?.care?.dead,
    pet?.career?.current?.name,
    pet?.appearance?.path,
  ]);
  useEffect(() => {
    if (!evolution) return;
    const timer = setTimeout(() => setEvolution(""), 8000);
    return () => clearTimeout(timer);
  }, [evolution]);
  useEffect(() => {
    const recover = () => setOpen(false);
    window.addEventListener(companionRecoveryEvent, recover);
    return () => window.removeEventListener(companionRecoveryEvent, recover);
  }, []);
  const toggle = () => {
    try {
      accountLocalStorage.setItem("nimbo:open", String(!open));
    } catch {
      /* Storage is optional. */
    }
    setOpen(!open);
  };
  const floating = useDraggableCompanion(toggle);
  const panelWidth = Math.min(340, floating.viewport.width - 16);
  const maximumLeft = Math.max(8, floating.viewport.width - panelWidth - 8);
  const minimumLeft = Math.min(
    maximumLeft,
    (floating.viewport.leftInset || 0) + 8,
  );
  const expandedLeft = Math.min(
    maximumLeft,
    Math.max(minimumLeft, floating.position.x),
  );
  const expandedTop = Math.max(
    8,
    Math.min(floating.position.y, floating.viewport.height - 640),
  );
  const dead = !!pet?.care?.dead;
  const activity = dead
    ? "DEAD"
    : celebrating || evolution
      ? "CELEBRATING"
      : pet?.vitals?.activity || "IDLE";
  const mood = activity === "CELEBRATING" ? "happy" : pet?.mood || "neutral";
  const prompt = companionPrompt(pet, data);
  const career = pet?.career;
  const progress = career?.next
    ? Math.min(
        100,
        (100 * career.experienceWithinClass) / career.experienceToNextClass,
      )
    : career
      ? 100
      : 0;
  const trainingElapsed =
    (pet?.vitals?.trainingSeconds || 0) +
    (pet?.vitals?.trainingPresent && !document.hidden && pet?.serverTime
      ? Math.max(0, Math.min(15, (now - Date.parse(pet.serverTime)) / 1000))
      : 0);
  const sleepRemaining = pet?.vitals?.sleepUntil
    ? (Date.parse(pet.vitals.sleepUntil) - now) / 1000
    : 0;
  return (
    <Portal>
      <Box
        sx={{
          position: "fixed",
          ...(pet
            ? {
                left: open ? expandedLeft : floating.position.x,
                top: open ? expandedTop : floating.position.y,
              }
            : { bottom: 16, right: 16 }),
          zIndex: (theme) => theme.zIndex.drawer + 1,
          maxWidth: "calc(100vw - 16px)",
        }}
      >
        {!pet ? (
          <Button
            variant="outlined"
            startIcon={<Sparkles size={18} />}
            onClick={() => navigate("collection")}
            sx={{ bgcolor: "background.paper" }}
          >
            Conhecer Nimbo
          </Button>
        ) : !open ? (
          <IconButton
            {...floating.bindings}
            aria-label="Abrir companheiro Nimbo"
            aria-expanded={false}
            title="Arraste para mover; clique para expandir. Use as setas para mover pelo teclado."
            sx={{
              width: 60,
              height: 60,
              minWidth: 60,
              borderRadius: "50%",
              bgcolor: "background.paper",
              color: "primary.main",
              border: "2px solid",
              borderColor: "divider",
              boxShadow: 4,
              p: 0.5,
              touchAction: "none",
              userSelect: "none",
              cursor: floating.dragging ? "grabbing" : "grab",
              "&:hover": { bgcolor: "background.paper", boxShadow: 6 },
              "& svg.nimbo-art": {
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              },
            }}
          >
            <PetArt
              species={pet.species}
              stage={pet.stage}
              appearance={pet.appearance}
              mood={mood}
              activity={activity}
            />
          </IconButton>
        ) : (
          <Paper
            component="section"
            aria-label="Seu companheiro Nimbo"
            elevation={5}
            sx={{
              width: 340,
              maxWidth: "calc(100vw - 16px)",
              maxHeight: `calc(100dvh - ${expandedTop + 8}px)`,
              overflowY: "auto",
              borderRadius: 3,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                px: 2,
                py: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography fontWeight={700} variant="body2" sx={{ flex: 1 }}>
                {speciesInfo(pet.species).name}
              </Typography>
              {pet.care?.streak > 0 && (
                <Chip
                  size="small"
                  icon={<Flame size={13} />}
                  label={`${pet.care.streak} dias`}
                />
              )}
              <IconButton aria-label="Recolher companheiro" onClick={toggle}>
                <ChevronDown size={19} />
              </IconButton>
            </Stack>
            <Stack spacing={1.5} sx={{ p: 2 }}>
              <Box
                sx={{
                  alignSelf: "center",
                  "& svg.nimbo-art": { width: 145, height: 163 },
                }}
              >
                <PetArt
                  species={pet.species}
                  stage={pet.stage}
                  appearance={pet.appearance}
                  mood={mood}
                  activity={activity}
                  large
                />
              </Box>
              <Stack spacing={0.5}>
                <Typography variant="body2" fontWeight={700}>
                  {career?.current?.name ||
                    companionClassName(pet.stage, pet.appearance?.path)}{" "}
                  <Box
                    component="span"
                    sx={{ color: "text.secondary", fontWeight: 400 }}
                  >
                    · Nível {pet.level || 1}
                  </Box>
                </Typography>
                <LinearProgress
                  aria-label="XP de estudo"
                  variant="determinate"
                  value={progress}
                  sx={{ height: 4, borderRadius: 2 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {pet.xp || 0} XP de estudo
                  {career?.next
                    ? ` · faltam ${career.remainingExperience} para evoluir`
                    : ""}
                </Typography>
              </Stack>
              {dead ? (
                <PetCareStatus
                  pet={pet}
                  action={action}
                  working={working}
                  compact
                />
              ) : (
                <>
                  <Box
                    sx={{ bgcolor: "action.hover", borderRadius: 2, p: 1.5 }}
                  >
                    <Typography variant="body2" role="status">
                      {evolution || (celebrating && notice) || prompt.text}
                    </Typography>
                    {prompt.page && !evolution && (
                      <Link
                        component="button"
                        type="button"
                        onClick={() => navigate(prompt.page, prompt.options)}
                        sx={{ mt: 0.75, fontSize: 12, textAlign: "left" }}
                      >
                        {prompt.link} →
                      </Link>
                    )}
                  </Box>
                  <PetVitalBars pet={pet} action={action} working={working} />
                  {pet.vitals?.activity === "TRAINING" && (
                    <Typography variant="caption" color="primary" role="timer">
                      Treino: {duration(1800 - trainingElapsed)} restantes ·{" "}
                      {pet.vitals.trainingPresent
                        ? "contando nesta aba"
                        : "aguardando presença"}
                    </Typography>
                  )}
                  {pet.vitals?.activity === "SLEEPING" && (
                    <Typography variant="caption" color="primary" role="timer">
                      Acorda em {duration(sleepRemaining)} · pode fechar o site
                    </Typography>
                  )}
                  {pet.vitals?.activity === "IDLE" && !pet.vitals?.canRest && (
                    <Typography variant="caption" color="text.secondary">
                      {pet.vitals?.restHint}
                    </Typography>
                  )}
                  {pet.vitals?.criticalUntil && (
                    <Alert severity="error" sx={{ py: 0 }}>
                      Barra zerada: cuide antes de{" "}
                      {new Date(pet.vitals.criticalUntil).toLocaleString(
                        "pt-BR",
                      )}
                      .
                    </Alert>
                  )}
                </>
              )}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("collection")}
                sx={{ fontSize: 12, alignSelf: "center" }}
              >
                Evolução, recompensas e regras →
              </Link>
            </Stack>
          </Paper>
        )}
      </Box>
      <Snackbar
        open={!!notice}
        autoHideDuration={8000}
        onClose={clearNotice}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
    </Portal>
  );
}
