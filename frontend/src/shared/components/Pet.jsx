import owlCareMotion from "./pet/owlCareMotion.js";
import { Paper, Box, Button } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { petMotion, moodLabels } from "./pet/petMotion.js";
import {
  owlIdentities,
  companionClassName,
  companionRank,
} from "./pet/owlAppearance.js";
import PixelOwl from "./pet/PixelOwl.jsx";
import useOwlGesture from "./pet/useOwlGesture.js";
import { resolveOwlAppearance } from "./pet/owlAppearance.js";

export const speciesInfo = (species) =>
  owlIdentities[species] || owlIdentities.nori;
export const displayName = (species, stage = 1, path = "WARRIOR") =>
  `${speciesInfo(species).name} · ${companionClassName(stage, path)}`;

export function PetArt({
  species = "nori",
  stage = 1,
  large = false,
  mood = "neutral",
  onClick,
  appearance,
  activity = "IDLE",
}) {
  const rank = companionRank(stage);
  const owlAppearance = useMemo(
    () => resolveOwlAppearance(appearance, species),
    [appearance, species],
  );
  const elementRef = useRef(null);
  const gesture = useOwlGesture({
    path: owlAppearance.path,
    rank,
    mood,
    elementRef,
    busy: activity !== "IDLE",
  });
  return (
    <Box
      component="svg"
      ref={elementRef}
      data-gesture={gesture}
      data-activity={activity}
      sx={[petMotion(mood, gesture, rank), owlCareMotion(activity)]}
      className={`nimbo-art ${large ? "nimbo-big" : ""} nimbo-${mood}`}
      viewBox={mood === "dead" ? "-14 -9 86 86" : "-9 -10 74 83"}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Coruja em pixel art de 16 bits: ${displayName(species, rank, owlAppearance.path)} · ${{ TRAINING: "treinando com óculos e livro", EATING: "comendo pizza", SLEEPING: "dormindo", CELEBRATING: "comemorando" }[activity] || moodLabels[mood] || "neutro"}`}
      onClick={onClick}
    >
      <PixelOwl
        rank={rank}
        mood={activity === "SLEEPING" ? "tired" : mood}
        appearance={owlAppearance}
        activity={activity}
      />
    </Box>
  );
}
export function PetPicker({
  onSelect,
  working,
  availableSpecies = Object.keys(owlIdentities),
  compact = false,
}) {
  const [selected, setSelected] = useState(availableSpecies[0] || "nori");
  const chosen = availableSpecies.includes(selected)
    ? selected
    : availableSpecies[0];
  return (
    <Paper
      component="section"
      variant="outlined"
      className={`nimbo-picker ${compact ? "nimbo-picker-small" : ""}`}
    >
      <div className="nimbo-intro">
        <span className="eyebrow">SUA JORNADA EM 16 BITS</span>
        <h2>Sua coruja, sua jornada.</h2>
        <p>
          Escolha uma coruja para acompanhar seus estudos. Em “Meu Nimbo”, você
          pode mudar suas cores, acessórios e caminho: Guerreiro, Mago ou
          Patrulheiro. Cada companheiro mantém seu próprio progresso.
        </p>
      </div>
      <div className="nimbo-options">
        {availableSpecies.map((k) => (
          <Button
            type="button"
            className={`nimbo-choice ${chosen === k ? "active" : ""}`}
            key={k}
            onClick={() => setSelected(k)}
            aria-pressed={chosen === k}
          >
            <PetArt species={k} />
            <strong>{speciesInfo(k).short}</strong>
            <small>{speciesInfo(k).type}</small>
          </Button>
        ))}
      </div>
      <Button
        className="btn btn-primary"
        disabled={working || !chosen}
        onClick={() => onSelect(chosen)}
        type="button"
      >
        <Sparkles size={17} /> Começar com {speciesInfo(chosen).short}{" "}
        <ArrowRight size={17} />
      </Button>
    </Paper>
  );
}
export default function Pet({ pet, navigate }) {
  return (
    <Paper component="div" variant="outlined" className="nimbo-hero-card">
      <PetArt
        species={pet.species}
        stage={pet.stage}
        mood={pet.mood}
        appearance={pet.appearance}
        activity={pet.vitals?.activity}
        large
      />
      <div>
        <span className="eyebrow">SEU COMPANHEIRO</span>
        <h2>{displayName(pet.species, pet.stage, pet.appearance?.path)}</h2>
        <p>{pet.xp} XP conquistados estudando.</p>
        <Button
          className="btn btn-primary"
          onClick={() => navigate("cycle")}
          type="button"
        >
          Iniciar estudo <ArrowRight size={16} />
        </Button>
      </div>
    </Paper>
  );
}
