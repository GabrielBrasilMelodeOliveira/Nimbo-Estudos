import { keyframes } from "@emotion/react";

const motion = (frames) => keyframes(frames);
const breathe = motion({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-1px)" },
});
const blinkOpen = motion({
  "0%, 31%, 35%, 71%, 75%, 79%, 100%": { opacity: 1 },
  "32%, 34%, 72%, 74%, 77%, 78%": { opacity: 0 },
});
const blinkClosed = motion({
  "0%, 31%, 35%, 71%, 75%, 79%, 100%": { opacity: 0 },
  "32%, 34%, 72%, 74%, 77%, 78%": { opacity: 1 },
});
const cape = motion({
  "0%, 100%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(1px)" },
});
const sparkle = motion({ "0%, 100%": { opacity: 0.3 }, "50%": { opacity: 1 } });
const tear = motion({
  "0%": { opacity: 0, transform: "translateY(0)" },
  "25%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(5px)" },
});
const sleep = motion({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "50%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(-4px)" },
});

// Each action animates different joints; outer SVG groups retain the class pose.
const look = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "20%, 45%": { transform: "rotate(-7deg) translateX(-1px)" },
  "65%, 85%": { transform: "rotate(5deg) translateX(1px)" },
});
const nod = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 60%": { transform: "rotate(9deg) translateY(1px)" },
  "75%": { transform: "rotate(3deg)" },
});
const wingLift = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 70%": { transform: "rotate(55deg)" },
  "40%, 60%": { transform: "rotate(75deg)" },
});
const preen = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 75%": { transform: "rotate(22deg) translate(-2px, 1px)" },
  "40%, 60%": { transform: "rotate(14deg) translate(-2px, 2px)" },
});
const raisedWingWave = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 55%": { transform: "rotate(-14deg)" },
  "40%, 70%": { transform: "rotate(12deg)" },
});
const wingFold = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 75%": { transform: "rotate(-38deg)" },
  "40%, 60%": { transform: "rotate(-48deg)" },
});
const wingStretch = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "30%, 70%": { transform: "rotate(42deg) translateX(-2px)" },
});
const hop = motion({
  "0%, 100%": { transform: "translate(0, 0)" },
  "20%": { transform: "translate(1px, 1px)" },
  "35%, 50%": { transform: "translate(3px, -3px)" },
  "65%": { transform: "translate(3px, 0)" },
  "80%": { transform: "translate(1px, -1px)" },
});
const shiver = motion({
  "0%, 100%": { transform: "translateX(0)" },
  "20%, 40%, 60%, 80%": { transform: "translateX(-1px)" },
  "30%, 50%, 70%, 90%": { transform: "translateX(1px)" },
});
const droop = motion({
  "0%, 100%": { transform: "translateY(0)" },
  "30%, 75%": { transform: "translateY(3px) rotate(3deg)" },
});
const sword = motion({
  "0%, 100%": { transform: "rotate(0deg)" },
  "25%, 45%": { transform: "rotate(-25deg)" },
  "60%, 75%": { transform: "rotate(14deg)" },
});
const shield = motion({
  "0%, 100%": { transform: "translate(0, 0)" },
  "25%, 75%": { transform: "translate(2px, -5px)" },
});
const cast = motion({
  "0%, 100%": { transform: "scale(1)", opacity: 0.35 },
  "30%, 70%": { transform: "scale(1.3)", opacity: 1 },
});
const aim = motion({
  "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
  "30%, 60%": { transform: "translate(2px, -3px) rotate(-8deg)" },
  "75%": { transform: "translate(-1px, -3px) rotate(-8deg)" },
});
const book = motion({
  "0%, 100%": { transform: "translateY(0)" },
  "25%, 65%": { transform: "translateY(-2px)" },
});
const scarf = motion({
  "0%, 100%": { transform: "translateX(0)" },
  "25%, 60%": { transform: "translate(1px, -1px)" },
  "75%": { transform: "translateX(-1px)" },
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
const gestures = {
  look: { "hero-head": look },
  preen: { "hero-head": preen, "owl-wing-front": wingFold },
  stretch: {
    "owl-wing-front": wingStretch,
    "owl-wing-back": wingFold,
    "hero-head": nod,
  },
  step: { "owl-gesture-body": hop },
  scarf: { "owl-scarf": scarf, "owl-wing-front": wingFold, "hero-head": nod },
  wave: { "owl-wing-front": wingLift },
  read: { "hero-head": nod, "owl-book": book },
  ponder: { "hero-head": look, "owl-wing-front": wingFold },
  sword: { "hero-weapon": sword, "owl-wing-back": wingFold },
  shield: { '[data-equipment="shield"]': shield, "hero-head": nod },
  salute: { "owl-wing-front": wingLift, "hero-head": nod },
  cast: { "owl-wing-front": wingLift, "owl-spell": cast, "hero-weapon": book },
  staff: { "hero-weapon": sword, "hero-head": look, "hero-rune": cast },
  aim: { "hero-weapon": aim, "owl-wing-front": wingFold, "hero-head": nod },
  scan: { "hero-head": look, "owl-wing-front": wingLift },
  celebrate: {
    "owl-gesture-body": hop,
    "owl-wing-front": wingLift,
    "hero-sparkles": cast,
  },
  yawn: { "hero-head": preen, "owl-wing-front": wingFold },
  droop: { "hero-head": droop },
  belly: { "owl-wing-front": wingFold, "hero-head": nod },
  shiver: { "owl-gesture-body": shiver },
  stomp: { "owl-gesture-body": hop, "hero-head": nod },
  ruffle: { "owl-wing-front": wingStretch, "hero-head": shiver },
};

export function petMotion(mood, gesture = "rest", rank = 1) {
  const jointOrigins = {
    "hero-head": "29px 29px",
    "owl-wing-front": "18px 38px",
    "owl-wing-back": "40px 39px",
    "hero-weapon": "45px 49px",
    "owl-spell": "6px 32px",
  };
  const gestureStyles = Object.fromEntries(
    Object.entries(gestures[gesture] || {}).map(([part, frames]) => [
      `& ${part.startsWith("[") ? part : `.${part}`}`,
      {
        animation: `${rank >= 5 && part === "owl-wing-front" && frames === wingLift ? raisedWingWave : frames} 2.8s steps(3, end) 1 both`,
        transformOrigin: jointOrigins[part],
      },
    ]),
  );
  return {
    "&&": {
      imageRendering: "pixelated",
      filter: mood === "dead" ? "grayscale(1)" : "none",
      overflow: "hidden",
    },
    "& .hero-body":
      mood === "dead"
        ? {
            transform: "translate(1px, -1px) rotate(-80deg)",
            transformOrigin: "28px 39px",
            opacity: 0.65,
          }
        : {},
    "& .hero-breath": { animation: `${breathe} 4.1s steps(1, end) infinite` },
    "& .hero-head": { transformOrigin: "29px 29px" },
    "& .owl-wing-front": { transformOrigin: "18px 38px" },
    "& .owl-wing-back": { transformOrigin: "40px 39px" },
    "& .hero-weapon": { transformOrigin: "45px 49px" },
    "& .owl-spell": { transformOrigin: "6px 32px" },
    "& .hero-cape": { animation: `${cape} 5.7s steps(1, end) infinite` },
    "& .hero-eyes-open": {
      animation: `${blinkOpen} 9.7s steps(1, end) infinite`,
    },
    "& .hero-eyes-closed": {
      opacity: 0,
      animation: `${blinkClosed} 9.7s steps(1, end) infinite`,
    },
    "& .hero-aura, & .hero-sparkles, & .hero-rune, & .hero-hunger, & .hero-anger":
      { animation: `${sparkle} 4.3s steps(3, end) infinite` },
    "& .hero-sleep": { animation: `${sleep} 4s steps(3, end) infinite` },
    "& .pet-tear": { animation: `${tear} 2.5s steps(4, end) infinite` },
    ...gestureStyles,
    ...(gesture === "paused"
      ? { "&& *": { animationPlayState: "paused" } }
      : {}),
    ...(mood === "dead" ? { "&& *": { animation: "none !important" } } : {}),
    "@media (prefers-reduced-motion: reduce)": {
      "&, & *": { animation: "none !important", transition: "none !important" },
    },
  };
}
