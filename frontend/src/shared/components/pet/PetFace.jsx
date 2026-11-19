import { joyfulMoods } from "./petMotion.js";

export default function PetFace({ mood }) {
  const joyful = joyfulMoods.includes(mood);
  const distressed = ["sad", "angry", "tired", "hungry"].includes(mood);
  return (
    <g className="nimbo-face">
      {mood === "dead" ? (
        <path
          d="M108 152l18 18m0-18l-18 18m67-18l18 18m0-18l-18 18"
          stroke="#3b4e4b"
          strokeWidth="5"
          strokeLinecap="round"
        />
      ) : joyful ? (
        <path
          d="M108 165q9-17 18 0m49 0q9-17 18 0"
          stroke="#263e3d"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <>
          {[117, 184].map((position) => (
            <g key={position}>
              <ellipse
                className="nimbo-eye"
                cx={position}
                cy="161"
                rx="8"
                ry={mood === "tired" ? 3 : 11}
                fill="#263e3d"
              />
              {mood !== "tired" && (
                <ellipse
                  cx={position - 3}
                  cy="156"
                  rx="2.5"
                  ry="3.6"
                  fill="#fff"
                />
              )}
            </g>
          ))}
        </>
      )}
      {mood === "angry" && (
        <path
          d="M104 140l23 10m45 0l24-10"
          stroke="#763f45"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}
      {mood === "sad" && (
        <>
          <path
            d="M104 143l22-6m47 0l22 6"
            stroke="#3b4e4b"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            className="pet-tear"
            d="M104 177q-13 18 0 18q13 0 0-18"
            fill="#70b9dd"
          />
          <path
            className="pet-tear"
            d="M196 180q-10 16 0 16q10 0 0-16"
            fill="#70b9dd"
          />
        </>
      )}
      {mood !== "dead" && (
        <>
          {[98, 204].map((position) => (
            <ellipse
              key={position}
              cx={position}
              cy="182"
              rx="16"
              ry="9"
              fill={mood === "angry" ? "#de6565" : "#efaa9f"}
              opacity={joyful ? 0.8 : 0.4}
            />
          ))}
        </>
      )}
      {mood === "hungry" ? (
        <ellipse cx="151" cy="201" rx="9" ry="12" fill="#634b49" />
      ) : (
        <path
          d={
            joyful
              ? "M135 194Q150 220 167 194Z"
              : distressed
                ? "M139 204Q151 192 164 204"
                : "M140 200h23"
          }
          stroke="#3b4e4b"
          strokeWidth="4"
          strokeLinecap="round"
          fill={joyful ? "#f59ca6" : "none"}
        />
      )}
      {mood === "tired" && (
        <text x="216" y="128" fill="#5d7190" fontSize="22" fontWeight="700">
          Zz
        </text>
      )}
      {mood === "angry" && (
        <path
          d="M226 115h13m-7-7v15m9 9h10m-5-5v10"
          stroke="#cd6262"
          strokeWidth="4"
        />
      )}
      {mood === "hungry" && (
        <path
          d="M130 229q10-7 20 0t20 0"
          fill="none"
          stroke="#a47142"
          strokeWidth="3"
        />
      )}
    </g>
  );
}
