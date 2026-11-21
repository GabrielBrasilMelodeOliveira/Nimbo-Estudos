import { keyframes } from "@emotion/react";

const breathe = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-1px)" },
});
const lookAround = keyframes({
  "0%, 68%, 100%": { transform: "translateX(0)" },
  "72%, 80%": { transform: "translateX(1px)" },
  "84%, 92%": { transform: "translateX(-1px)" },
});
const blinkOpen = keyframes({
  "0%, 42%, 46%, 91%, 95%, 100%": { opacity: 1 },
  "43%, 45%, 92%, 94%": { opacity: 0 },
});
const blinkClosed = keyframes({
  "0%, 42%, 46%, 91%, 95%, 100%": { opacity: 0 },
  "43%, 45%, 92%, 94%": { opacity: 1 },
});
const stretch = keyframes({
  "0%, 76%, 100%": { transform: "translate(0, 0)" },
  "80%, 88%": { transform: "translate(-1px, -2px)" },
  "92%": { transform: "translate(-1px, -1px)" },
});
const flutter = keyframes({
  "0%, 68%, 100%": { transform: "translate(0, 0)" },
  "72%, 80%": { transform: "translate(-2px, -2px)" },
  "76%, 84%": { transform: "translate(-4px, -3px)" },
  "88%": { transform: "translate(-1px, -1px)" },
});
const cape = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(1px)" },
});
const shiver = keyframes({
  "0%, 70%, 100%": { transform: "translateX(0)" },
  "76%, 88%": { transform: "translateX(-1px)" },
  "82%, 94%": { transform: "translateX(1px)" },
});
const slump = keyframes({
  "0%, 100%": { transform: "translateY(1px)" },
  "50%": { transform: "translateY(3px)" },
});
const stomp = keyframes({
  "0%, 80%, 100%": { transform: "translateY(0)" },
  "84%, 92%": { transform: "translateY(-1px)" },
  "88%, 96%": { transform: "translateY(1px)" },
});
const cheer = keyframes({
  "0%, 65%, 100%": { transform: "translateY(0)" },
  "70%, 85%": { transform: "translateY(-3px)" },
  "75%, 90%": { transform: "translateY(-4px)" },
});
const salute = keyframes({
  "0%, 65%, 100%": { transform: "translateY(0)" },
  "70%, 90%": { transform: "translateY(-3px)" },
});
const sparkle = keyframes({
  "0%, 100%": { opacity: 0.25 },
  "50%": { opacity: 1 },
});
const tear = keyframes({
  "0%": { opacity: 0, transform: "translateY(0)" },
  "25%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(6px)" },
});
const sleep = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "50%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(-3px)" },
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
  const joyful = joyfulMoods.includes(mood);
  const distressed = ["hungry", "tired", "sad", "angry"].includes(mood);
  const animation = {
    hungry: `${shiver} 4s steps(1, end) infinite`,
    tired: `${slump} 5s steps(2, end) infinite`,
    sad: `${slump} 6s steps(2, end) infinite`,
    angry: `${stomp} 4s steps(1, end) infinite`,
  };
  return {
    "&&": {
      imageRendering: "pixelated",
      filter: mood === "dead" ? "grayscale(1)" : "none",
      overflow: "hidden",
    },
    "& .hero-body": {
      animation:
        animation[mood] ||
        (joyful
          ? `${cheer} ${mood === "happy" ? 5 : 3}s steps(1, end) infinite`
          : "none"),
      ...(mood === "dead"
        ? {
            transform: "translate(6px, 3px) rotate(-90deg)",
            transformOrigin: "32px 45px",
            opacity: 0.65,
          }
        : {}),
    },
    "& .hero-breath": { animation: `${breathe} 3s steps(1, end) infinite` },
    "& .hero-head": {
      animation: distressed
        ? "none"
        : `${lookAround} 11s steps(1, end) infinite`,
    },
    "& .owl-wing-front": {
      animation: distressed
        ? `${stretch} 9s steps(1, end) infinite`
        : `${flutter} ${joyful ? 3 : 7}s steps(1, end) infinite`,
    },
    "& .hero-cape": { animation: `${cape} 4s steps(1, end) infinite` },
    "& .hero-weapon, & .owl-wing-back": {
      animation: joyful
        ? `${salute} ${mood === "happy" ? 5 : 3}s steps(1, end) infinite`
        : "none",
    },
    "& .hero-eyes-open": {
      animation: `${blinkOpen} 6.4s steps(1, end) infinite`,
    },
    "& .hero-eyes-closed": {
      opacity: 0,
      animation: `${blinkClosed} 6.4s steps(1, end) infinite`,
    },
    "& .hero-aura, & .hero-sparkles, & .hero-rune, & .hero-hunger, & .hero-anger":
      { animation: `${sparkle} 3s steps(2, end) infinite` },
    "& .hero-sleep": { animation: `${sleep} 4s steps(3, end) infinite` },
    "& .pet-tear": { animation: `${tear} 2.5s steps(4, end) infinite` },
    ...(mood === "dead" ? { "&& *": { animation: "none !important" } } : {}),
    "@media (prefers-reduced-motion: reduce)": {
      "&, & *": { animation: "none !important", transition: "none !important" },
    },
  };
}
