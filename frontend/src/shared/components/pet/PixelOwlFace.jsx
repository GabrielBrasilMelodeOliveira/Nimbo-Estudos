import { joyfulMoods } from "./petMotion.js";

export default function PixelOwlFace({ mood, palette }) {
  const joyful = joyfulMoods.includes(mood);
  const closed = mood === "tired" || mood === "dead";
  return (
    <g className="owl-face">
      <path
        d="M26 18h9v1h3v2h2v8h-2v2h-3v1h-9v-2h-2v-2h-1v-6h1v-2h2zM44 18h5v1h2v9h-2v2h-5v-2h-2v-8h2z"
        fill={palette.featherDark}
      />
      <path
        d="M27 19h7v1h3v2h2v5h-2v3h-3v1h-6v-2h-3v-2h-1v-4h2v-2h1zM45 19h3v1h2v7h-2v2h-3v-2h-2v-5h2z"
        fill="#EAF9F7"
      />
      {!closed && (
        <g className="hero-eyes-open">
          <path
            d="M30 21h5v2h2v4h-2v2h-5v-1h-2v-5h2zM46 21h3v6h-3v-1h-1v-4h1z"
            fill={palette.eye}
          />
          <path
            d="M32 23h3v4h-3v-1h-1v-2h1zM47 22h2v4h-2z"
            fill={palette.ink}
          />
          <path d="M30 21h3v3h-3zM34 26h1v1h-1zM46 21h2v2h-2z" fill="#FFFFFF" />
        </g>
      )}
      <g
        className={closed ? undefined : "hero-eyes-closed"}
        fill={palette.featherShadow}
      >
        <path d="M25 22h13v6H25zM43 21h7v6h-7z" />
        <path d="M26 25h11v2H26zM44 24h6v2h-6z" fill={palette.ink} />
      </g>
      {mood === "angry" && (
        <path
          d="M25 18h3v1h4v1h5v2h-5v-1h-4v-1h-3zM43 21h3v-1h4v-2h1v3h-4v1h-4z"
          fill={palette.ink}
        />
      )}
      {mood === "sad" && (
        <>
          <path
            d="M25 19h4v-2h7v1h-6v2h-5zM44 17h3v1h3v2h-3v-2h-3z"
            fill={palette.featherDark}
          />
          <g fill="#73C7F0">
            <rect className="pet-tear" x="26" y="28" width="2" height="3" />
            <rect className="pet-tear" x="46" y="28" width="1" height="3" />
          </g>
        </>
      )}
      <path
        d={
          mood === "hungry"
            ? "M42 27h4v1h3v2h-1v4h-2v3h-2v-3h-2v-2h-2v-3h2z"
            : "M42 27h4v1h3v3h-2v3h-3v-2h-2v-1h-2v-2h2z"
        }
        fill={palette.ink}
      />
      <path d="M42 28h4v1h2v2h-3v2h-1v-2h-2z" fill="#E69E37" />
      <path d="M42 28h3v2h-3z" fill="#FFDA79" />
      {joyful && <path d="M43 31h3v1h-3z" fill="#FFF0B6" />}
      {mood === "hungry" && <path d="M44 33h2v2h-2z" fill="#4F302D" />}
    </g>
  );
}
