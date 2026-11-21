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
      <g className="hero-eye-foundation">
        <ReferenceOwlLayer name="eyeFront" colors={eyeColors} />
        <ReferenceOwlLayer name="eyeBack" colors={eyeColors} />
      </g>
      {/* Keep the complete eye region underneath the lids: blinking must never cut a rectangular hole in the face. */}
      <g
        className={closed ? undefined : "hero-eyes-closed"}
        data-eye-state={closed ? "closed" : "blinking"}
      >
        <path
          d="M23 17h4v1h2v1h2v2h1v4h-2v2h-5v-1h-3v-1h-2v-5h1v-2h2zM39 16h3v2h1v6h-2v2h-3v-2h-1v-5h1v-2h1z"
          fill={colors[5]}
        />
        <path
          d="M23 18h4v1h2v1h-5v1h-2v3h-1v-4h1v-1h1zM39 18h2v2h-2v3h-1v-4h1z"
          fill={colors[6]}
        />
        <path d="M24 26h6v1h-5v-1zM40 24h2v1h-2z" fill={colors[4]} />
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
