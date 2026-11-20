import { useDraggableCompanion } from "../hooks/useDraggableCompanion.js";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChevronDown,
  Moon,
  SmilePlus,
  MessageCircle,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
} from "lucide-react";
import { PetArt, speciesInfo } from "./Pet.jsx";
import PetCareStatus from "./pet/PetCareStatus.jsx";

const starters = [
  "Vamos avançar um pouquinho hoje?",
  "Consistência vale mais do que pressa.",
  "Seu esforço está criando raízes.",
  "Um assunto de cada vez. Eu fico aqui com você.",
];
function reply(text, pet) {
  if (pet.care?.dead || pet.care?.missedDays > 0) return pet.message;
  const s = text.toLowerCase();
  if (/cans|sono|descans|dorm/.test(s))
    return "Descansar também faz parte do plano. Que tal uma pausa de verdade?";
  if (/prova|concurso|edital/.test(s))
    return "A prova se aproxima por etapas. Vamos resolver o próximo assunto juntos.";
  if (/trist|desanim|dif[ií]cil/.test(s))
    return "Um dia difícil não apaga tudo que você já estudou. Podemos fazer só 15 minutos.";
  if (/quest|err/.test(s))
    return "Cada erro revela um tema para reforçar. Anote o motivo e tente de novo.";
  if (/obrig|oi|ol[aá]/.test(s))
    return "Oi! Estou por aqui. Vamos conquistar uma pequena meta hoje?";
  return pet.energy < 30
    ? "Estou um pouco cansado. Podemos ir com calma."
    : starters[Math.floor(s.length % starters.length)];
}
export default function PetCompanion({ pet, navigate, action, working }) {
  const [open, setOpen] = useState(
    () => localStorage.getItem("nimbo:open") === "true",
  );
  const [chat, setChat] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const dead = !!pet?.care?.dead;
  const mood = pet?.mood || "neutral";
  const toggle = () => {
    localStorage.setItem("nimbo:open", String(!open));
    setOpen(!open);
  };
  const floating = useDraggableCompanion(toggle);
  const expandedTop = Math.max(
    8,
    Math.min(floating.position.y, floating.viewport.height - 650),
  );
  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(""), 6000);
    return () => clearTimeout(timeout);
  }, [feedback]);
  useEffect(() => {
    if (!speaking || !pet?.message || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(pet.message);
    utterance.lang = "pt-BR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return () => window.speechSynthesis.cancel();
  }, [speaking, pet?.message]);
  const interact = async (type) => {
    if (working || dead) return;
    if (
      await action(
        "pet/interact",
        "POST",
        { action: type },
        "Vínculo fortalecido.",
      )
    ) {
      setFeedback(
        {
          PET: "Recebi seu carinho! Nosso vínculo ficou mais forte.",
          PLAY: "Foi divertido! Vamos cuidar das metas também?",
          REST: "Descansei um pouco. Para recuperar minha energia, precisamos avançar nas metas.",
          TALK: "Gosto de conversar com você!",
        }[type],
      );
    }
  };
  const send = async (event) => {
    event.preventDefault();
    if (!message.trim() || working || dead) return;
    const answer = reply(message, pet);
    if (
      await action(
        "pet/interact",
        "POST",
        { action: "TALK" },
        "Nimbo ouviu você.",
      )
    ) {
      setMessage("");
      setFeedback(answer);
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        ...(pet
          ? {
              left: open
                ? Math.max(
                    8,
                    Math.min(
                      floating.position.x,
                      floating.viewport.width - 348,
                    ),
                  )
                : floating.position.x,
              top: open ? expandedTop : floating.position.y,
            }
          : { bottom: 16, right: 16 }),
        zIndex: 1100,
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
          <PetArt species={pet.species} stage={pet.stage} mood={mood} />
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
            sx={{
              alignItems: "center",
              px: 2,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography fontWeight={700} variant="body2" sx={{ flex: 1 }}>
              {speciesInfo(pet.species).name}
            </Typography>
            <IconButton
              aria-label={speaking ? "Desativar voz" : "Ativar voz"}
              onClick={() => setSpeaking(!speaking)}
            >
              {speaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </IconButton>
            <IconButton aria-label="Recolher companheiro" onClick={toggle}>
              <ChevronDown size={19} />
            </IconButton>
          </Stack>
          <Stack spacing={1.5} sx={{ p: 2 }}>
            <Button
              aria-label="Dar carinho"
              onClick={() => interact("PET")}
              disabled={working || dead}
              sx={{
                alignSelf: "center",
                p: 0,
                "& svg.nimbo-art": { width: 170, height: 164 },
              }}
            >
              <PetArt
                species={pet.species}
                stage={pet.stage}
                mood={mood}
                large
              />
            </Button>
            <PetCareStatus
              pet={pet}
              action={action}
              working={working}
              compact
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption">Energia {pet.energy}%</Typography>
              <Typography variant="caption">
                Nível {pet.level} · {pet.xp} XP · Vínculo {pet.bond ?? 20}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={pet.energy}
              color={dead ? "inherit" : "primary"}
              sx={{ height: 6, borderRadius: 3 }}
            />
            {feedback && (
              <Typography variant="body2" role="status" color="primary">
                “{feedback}”
              </Typography>
            )}
            {!dead && (
              <>
                <Stack direction="row" spacing={0.5}>
                  <Button
                    size="small"
                    onClick={() => interact("PLAY")}
                    disabled={working}
                    startIcon={<SmilePlus size={16} />}
                  >
                    Brincar
                  </Button>
                  <Button
                    size="small"
                    onClick={() => interact("REST")}
                    disabled={working}
                    startIcon={<Moon size={16} />}
                  >
                    Descansar
                  </Button>
                  <IconButton
                    aria-label="Conversar"
                    onClick={() => setChat(!chat)}
                  >
                    <MessageCircle size={18} />
                  </IconButton>
                </Stack>
                {chat && (
                  <Stack
                    component="form"
                    direction="row"
                    spacing={1}
                    onSubmit={send}
                  >
                    <TextField
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      label="Mensagem para Nimbo"
                      size="small"
                      fullWidth
                      slotProps={{ htmlInput: { maxLength: 180 } }}
                    />
                    <IconButton
                      type="submit"
                      disabled={working || !message.trim()}
                      aria-label="Enviar mensagem"
                    >
                      <Send size={18} />
                    </IconButton>
                  </Stack>
                )}
              </>
            )}
            <Button onClick={() => navigate("collection")}>
              Coleção e regras do Nimbo →
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
