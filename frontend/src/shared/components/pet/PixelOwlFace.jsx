import ReferenceOwlLayer from "./art/ReferenceOwlLayer.jsx";
import { owlDefaults } from "./owlAppearance.js";

export default function PixelOwlFace({ mood, palette, colors }) {
  const closed = mood === "tired" || mood === "dead";
  const eyeColors = [...colors];
  if (palette.eye.toUpperCase() !== owlDefaults.eyeColor) {
    eyeColors[1] = palette.eye;
    eyeColors[2] = palette.eye;
    eyeColors[3] = palette.eye;
  }
  return (
    <g className="owl-face">
      <g className={closed ? undefined : "hero-eyes-open"}>
        <ReferenceOwlLayer name="eyeFront" colors={eyeColors} />
        <ReferenceOwlLayer name="eyeBack" colors={eyeColors} />
      </g>
      <g className={closed ? undefined : "hero-eyes-closed"}>
        <path d="M21 18h11v10H21zM36 17h6v10h-6z" fill={colors[5]} />
        <path
          d="M22 23h2v1h6v-1h2v2h-2v1h-6v-1h-2zM37 23h4v2h-4z"
          fill={colors[1]}
        />
      </g>
      {mood === "angry" && (
        <path
          d="M20 17h4v1h4v1h4v2h-5v-1h-4v-1h-3zM36 19h3v-1h4v2h-3v1h-4z"
          fill={colors[1]}
        />
      )}
      {mood === "sad" && (
        <>
          <path
            d="M20 18h3v-2h7v1h-6v2h-4zM37 16h3v1h3v2h-3v-1h-3z"
            fill={colors[2]}
          />
          <rect
            className="pet-tear"
            x="23"
            y="26"
            width="2"
            height="3"
            fill="#A5DEFA"
          />
          <rect
            className="pet-tear"
            x="39"
            y="25"
            width="1"
            height="3"
            fill="#A5DEFA"
          />
        </>
      )}
      {mood === "hungry" && <path d="M35 27h3v2h-3z" fill="#432715" />}
    </g>
  );
}
