import { keyframes } from "@emotion/react";
const read = keyframes({
  "0%, 100%": { transform: "rotate(0deg)" },
  "50%": { transform: "rotate(3deg)" },
});
const page = keyframes({
  "0%, 75%, 100%": { opacity: 1 },
  "80%, 95%": { opacity: 0.2 },
});
const bite = keyframes({
  "0%, 100%": { transform: "translate(0, 0)" },
  "35%, 65%": { transform: "translate(-2px, -7px)" },
});
const snore = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-1px)" },
});
const drift = keyframes({
  "0%": { opacity: 0, transform: "translateY(3px)" },
  "45%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translateY(-5px)" },
});
const cheer = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "40%, 60%": { transform: "translateY(-4px)" },
});
export default function owlCareMotion(activity) {
  const scenes = {
    TRAINING: {
      "& .hero-head": {
        animation: `${read} 5s steps(3) infinite`,
        transformOrigin: "29px 29px",
      },
      "& .owl-care-page": { animation: `${page} 4s steps(1) infinite` },
    },
    EATING: {
      "& .owl-care-pizza": { animation: `${bite} 2.4s steps(4) infinite` },
      "& .owl-care-crumbs": { animation: `${drift} 2.4s steps(3) infinite` },
    },
    SLEEPING: {
      "& .hero-breath": { animation: `${snore} 5s steps(2) infinite` },
      "& .owl-care-zzz": { animation: `${drift} 4s steps(4) infinite` },
    },
    CELEBRATING: {
      "& .owl-gesture-body": { animation: `${cheer} .9s steps(3) infinite` },
      "& .owl-care-confetti": { animation: `${drift} 1.8s steps(4) infinite` },
    },
  };
  return {
    ...(scenes[activity] || {}),
    "@media (prefers-reduced-motion: reduce)": {
      "&, & *": { animation: "none !important" },
    },
  };
}
