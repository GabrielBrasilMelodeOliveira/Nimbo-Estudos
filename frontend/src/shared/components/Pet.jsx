import { Paper, Box, Button } from "@mui/material";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { petMotion, moodLabels } from "./pet/petMotion.js";
import {
  owlIdentities,
  companionClassName,
  companionRank,
} from "./pet/owlAppearance.js";
import PixelOwl from "./pet/PixelOwl.jsx";
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
}) {
  const rank = companionRank(stage);
  const owlAppearance = resolveOwlAppearance(appearance, species);
  return (
    <Box
      component="svg"
      sx={petMotion(mood)}
      className={`nimbo-art ${large ? "nimbo-big" : ""} nimbo-${mood}`}
      viewBox={mood === "dead" ? "-10 -6 88 88" : "-4 -6 72 88"}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Coruja em pixel art de 16 bits: ${displayName(species, rank, owlAppearance.path)} · ${moodLabels[mood] || "neutro"}`}
      onClick={onClick}
    >
      <PixelOwl rank={rank} mood={mood} appearance={owlAppearance} />
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
