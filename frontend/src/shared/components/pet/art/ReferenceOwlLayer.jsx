import { referenceColors, referenceLayers } from "./owlReferencePixels.js";

export default function ReferenceOwlLayer({
  name,
  colors = referenceColors,
  ...props
}) {
  return (
    <g data-owl-layer={name} {...props}>
      {Object.entries(referenceLayers[name] || {}).map(([color, geometry]) => (
        <path key={color} fill={colors[color]} d={geometry} />
      ))}
    </g>
  );
}
