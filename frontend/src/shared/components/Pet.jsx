import { Paper, Box, Button } from "@mui/material";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { petMotion, moodLabels } from "./pet/petMotion.js";
import {
  heroAppearances,
  heroClassName,
  heroRank,
} from "./pet/heroAppearances.js";
import PixelHero from "./pet/PixelHero.jsx";

export const speciesInfo = (species) =>
  heroAppearances[species] || heroAppearances.nori;
export const displayName = (species, stage = 1) =>
  `${speciesInfo(species).name} · ${heroClassName(stage)}`;

export function PetArt({
  species = "nori",
  stage = 1,
  large = false,
  mood = "neutral",
  onClick,
}) {
  const rank = heroRank(stage);
  return (
    <Box
      component="svg"
      sx={petMotion(mood)}
      className={`nimbo-art ${large ? "nimbo-big" : ""} nimbo-${mood}`}
      viewBox={mood === "dead" ? "-8 0 80 76" : "0 0 64 76"}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Aventureiro em pixel art de 16 bits: ${displayName(species, rank)} · ${moodLabels[mood] || "neutro"}`}
      onClick={onClick}
    >
      <PixelHero rank={rank} mood={mood} appearance={speciesInfo(species)} />
    </Box>
  );
}
export function PetPicker({
  onSelect,
  working,
  availableSpecies = Object.keys(heroAppearances),
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
        <h2>Todo herói começa com um primeiro passo.</h2>
        <p>
          Escolha o visual do seu aventureiro. Ele começa como uma pessoa comum
          e conquista novas classes com seus estudos, questões e revisões. Todos
          seguem a mesma jornada; cada um mantém seu próprio progresso.
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
      <PetArt species={pet.species} stage={pet.stage} mood={pet.mood} large />
      <div>
        <span className="eyebrow">SEU COMPANHEIRO</span>
        <h2>{displayName(pet.species, pet.stage)}</h2>
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
