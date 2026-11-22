/** Pixel accessories are drawn on the same grid and palette as the reference owl. */
export default function OwlCareProps({ activity, palette }) {
  if (activity === "TRAINING")
    return (
      <g data-care-prop="study-book" className="owl-care-book">
        <path d="M19 42h11l4 2 4-2h12v17H38l-4 2-4-2H19z" fill={palette.ink} />
        <path
          d="M21 44h9l3 2v12l-3-1h-9zM35 46l4-2h9v13h-9l-4 1z"
          fill="#F6E7C4"
        />
        <path
          d="M23 47h7v1h-7zM23 50h6v1h-6zM23 53h7v1h-7zM38 47h7v1h-7zM38 50h8v1h-8zM38 53h5v1h-5z"
          fill="#9B7045"
        />
        <path
          className="owl-care-page"
          d="M34 45h1v13h-1zM36 46h2v10h-2z"
          fill="#DAB776"
        />
        <path d="M18 49h4v5h-4zM47 49h4v5h-4z" fill={palette.ink} />
      </g>
    );
  if (activity === "EATING")
    return (
      <g data-care-prop="pizza" className="owl-care-pizza">
        <path
          d="M29 34h19v3h-2v3h-2v3h-2v3h-2v3h-2v3h-3v-4h-2v-5h-2v-5h-2z"
          fill="#6A3924"
        />
        <path
          d="M31 36h15v2h-2v3h-2v3h-2v3h-2v2h-2v-5h-2v-5h-3z"
          fill="#FFD36C"
        />
        <path d="M29 33h19v3H29zM30 32h17v2H30z" fill="#D98A3B" />
        <path d="M33 37h3v3h-3zM40 38h3v3h-3zM37 44h3v3h-3z" fill="#BC3740" />
        <path d="M37 36h1v2h-1zM35 42h2v1h-2zM41 43h1v1h-1z" fill="#57955D" />
        <path d="M32 48h5v4h-5z" fill={palette.ink} />
        <path
          className="owl-care-crumbs"
          d="M43 47h1v1h-1zM46 51h2v1h-2zM41 54h1v2h-1z"
          fill="#E4A95B"
        />
      </g>
    );
  if (activity === "SLEEPING")
    return (
      <g data-care-prop="sleep-blanket">
        <path d="M11 52h37v13H11zM14 50h30v2H14z" fill={palette.ink} />
        <path d="M13 54h33v9H13zM16 52h26v2H16z" fill={palette.scarf} />
        <path
          d="M16 55h9v2h-9zM28 59h13v2H28zM14 62h30v1H14z"
          fill={palette.scarfLight}
        />
        <path
          className="owl-care-zzz"
          d="M47 16h7v2h-2v2h-2v2h4v2h-7v-2h2v-2h2v-2h-4zM51 4h6v1h-2v2h-2v2h4v1h-6V8h2V6h2V5h-4z"
          fill="#6E8EAA"
        />
      </g>
    );
  if (activity === "CELEBRATING")
    return (
      <g data-care-prop="confetti" className="owl-care-confetti">
        <path
          d="M3 15h2v4H3zM48 6h3v2h-3zM53 39h2v4h-2zM8 55h3v2H8z"
          fill={palette.gold}
        />
        <path
          d="M7 30h3v2H7zM43 0h2v3h-2zM56 25h2v3h-2zM4 43h2v3H4z"
          fill="#3EABD4"
        />
        <path d="M17 1h2v3h-2zM52 55h3v2h-3zM1 24h2v2H1z" fill="#D86E9F" />
      </g>
    );
  return null;
}
