/** Continuous anatomy behind movable cutouts; each joint overlaps its neighbour. */
export default function OwlBodyFoundation({ colors }) {
  return (
    <g data-owl-foundation="body">
      <path
        d="M19 29h17v3h5v6h2v15h-3v5h-4v2H23v-2h-5v-5h-2V40h2v-7h1z"
        fill={colors[2]}
      />
      <path d="M21 34h13v5h6v14h-3v4H24v-3h-5V42h2z" fill={colors[5]} />
      <path d="M25 42h6v4h4v8h-8v2h-4v-9h2z" fill={colors[6]} />
      <path d="M17 26h17v2h3v4h3v5H20v-3h-3z" fill={colors[13]} />
    </g>
  );
}

export function OwlLegJoint({ side, colors }) {
  return (
    <g data-owl-joint={side}>
      {side === "front" ? (
        <>
          <path d="M17 53h6v5h-2v3h-4z" fill={colors[2]} />
          <path d="M18 54h3v5h-3z" fill={colors[5]} />
        </>
      ) : (
        <>
          <path d="M34 53h6v5h-1v3h-4v-3h-1z" fill={colors[2]} />
          <path d="M35 54h3v5h-3z" fill={colors[5]} />
        </>
      )}
    </g>
  );
}
