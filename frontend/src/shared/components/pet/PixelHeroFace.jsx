import { joyfulMoods } from "./petMotion.js";

export default function PixelHeroFace({ mood, appearance }) {
  const joyful = joyfulMoods.includes(mood);
  const weary = ["hungry", "tired", "sad"].includes(mood);
  return (
    <g className="hero-face" fill="#252635">
      {mood === "dead" ? (
        <path d="M27 22h4v1h-4zM35 22h4v1h-4z" />
      ) : (
        <>
          <g className="hero-eyes-open">
            <path
              d={
                mood === "tired"
                  ? "M27 22h4v1h-4zM35 22h4v1h-4z"
                  : "M27 21h3v3h-3zM35 21h3v3h-3z"
              }
            />
            {mood !== "tired" && (
              <path d="M27 21h1v1h-1zM35 21h1v1h-1z" fill="#FFFFFF" />
            )}
          </g>
          <path className="hero-eyes-closed" d="M27 22h4v1h-4zM35 22h4v1h-4z" />
        </>
      )}
      {mood === "angry" ? (
        <path d="M26 19h2v1h3v1h-3v-1h-2zM35 20h3v-1h2v1h-2v1h-3z" />
      ) : weary ? (
        <path
          d="M26 20h2v-1h3v1h-3v1h-2zM35 19h3v1h2v1h-2v-1h-3z"
          fill={appearance.hair}
        />
      ) : (
        <path d="M26 19h5v1h-5zM35 19h4v1h-4z" fill={appearance.hair} />
      )}
      <path d="M32 23h2v2h-2z" fill={appearance.skinShadow} />
      {joyful ? (
        <>
          <path d="M29 26h7v2h-1v1h-5v-1h-1z" />
          <path d="M30 26h5v1h-5z" fill="#FFF3DE" />
        </>
      ) : mood === "hungry" ? (
        <path d="M31 26h3v3h-3z" />
      ) : weary || mood === "angry" ? (
        <path d="M30 28v-1h5v1h1v1h-1v-1h-5v1h-1v-1z" />
      ) : (
        <path d="M30 27h5v1h-5z" />
      )}
      {mood === "sad" && (
        <g fill="#72C7E8">
          <rect className="pet-tear" x="27" y="24" width="1" height="3" />
          <rect className="pet-tear" x="37" y="24" width="1" height="3" />
        </g>
      )}
    </g>
  );
}
