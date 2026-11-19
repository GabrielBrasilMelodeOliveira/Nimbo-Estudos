import { keyframes } from "@emotion/react";

const breathe = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-3px)" },
});
const shiver = keyframes({
  "0%, 70%, 100%": { transform: "translateX(0)" },
  "76%, 88%": { transform: "translateX(-3px) rotate(-1deg)" },
  "82%, 94%": { transform: "translateX(3px) rotate(1deg)" },
});
const tired = keyframes({
  "0%, 100%": { transform: "translateY(9px) rotate(-5deg)" },
  "50%": { transform: "translateY(15px) rotate(-8deg)" },
});
const sad = keyframes({
  "0%, 100%": { transform: "translateY(9px) scaleY(.96)" },
  "50%": { transform: "translateY(13px) scaleY(.94)" },
});
const angry = keyframes({
  "0%, 100%": { transform: "rotate(-3deg)" },
  "50%": { transform: "rotate(3deg) scale(1.03)" },
});
const bounce = keyframes({
  "0%, 100%": { transform: "translateY(0) scale(1)" },
  "45%": { transform: "translateY(-16px) scale(1.03)" },
  "75%": { transform: "translateY(2px) scale(1.02,.97)" },
});
const proud = keyframes({
  "0%, 100%": { transform: "translateY(-3px) rotate(-3deg)" },
  "50%": { transform: "translateY(-9px) rotate(3deg) scale(1.04)" },
});
const celebrate = keyframes({
  "0%, 100%": { transform: "translateY(-4px) rotate(-7deg)" },
  "50%": { transform: "translateY(-22px) rotate(7deg)" },
});
const shimmer = keyframes({
  "0%, 100%": { opacity: 0.45, transform: "scale(.92)" },
  "50%": { opacity: 1, transform: "scale(1.06)" },
});
const tear = keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px)" },
  "25%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(23px)" },
});

export const moodLabels = {
  neutral: "neutro",
  normal: "neutro",
  hungry: "com fome",
  tired: "cansado",
  sad: "triste",
  angry: "irritado",
  dead: "jornada encerrada",
  happy: "feliz",
  proud: "orgulhoso",
  excited: "empolgado",
  radiant: "radiante",
  legendary: "lendário",
};
export const joyfulMoods = [
  "happy",
  "proud",
  "excited",
  "radiant",
  "legendary",
];
export function petMotion(mood) {
  const animation = {
    hungry: `${shiver} 3s infinite`,
    tired: `${tired} 4s ease-in-out infinite`,
    sad: `${sad} 4s ease-in-out infinite`,
    angry: `${angry} .8s ease-in-out infinite`,
    happy: `${bounce} 2.2s ease-in-out infinite`,
    proud: `${proud} 2s ease-in-out infinite`,
    excited: `${celebrate} 1.5s ease-in-out infinite`,
    radiant: `${celebrate} 2s ease-in-out infinite`,
    legendary: `${celebrate} 1.3s ease-in-out infinite`,
  };
  return {
    ...(mood === "dead"
      ? { "&& *": { animation: "none !important" }, filter: "grayscale(1)" }
      : {}),
    "&& .nimbo-float": {
      transformOrigin: "150px 230px",
      animation:
        mood === "dead"
          ? "none"
          : animation[mood] || `${breathe} 5s ease-in-out infinite`,
      ...(mood === "dead"
        ? {
            transform: "translate(16px, -9px) rotate(-18deg)",
            filter: "grayscale(1)",
            opacity: 0.72,
          }
        : {}),
    },
    "& .pet-aura": {
      transformOrigin: "150px 150px",
      animation: `${shimmer} 2.5s ease-in-out infinite`,
    },
    "& .pet-tear": { animation: `${tear} 2s ease-in infinite` },
    "&& .nimbo-eye": {
      animation: ["dead", "tired"].includes(mood) ? "none" : undefined,
    },
    "@media (prefers-reduced-motion: reduce)": {
      "&, & *": { animation: "none !important", transition: "none !important" },
    },
  };
}
