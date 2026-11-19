export const companionSize = 60;
const margin = 8;

export function clampFloatingPosition(position, viewport) {
  return {
    x: Math.max(
      margin,
      Math.min(
        position.x,
        Math.max(margin, viewport.width - companionSize - margin),
      ),
    ),
    y: Math.max(
      margin,
      Math.min(
        position.y,
        Math.max(margin, viewport.height - companionSize - margin),
      ),
    ),
  };
}

export function restoreFloatingPosition(saved, viewport) {
  if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
    return clampFloatingPosition(
      { x: saved.x * viewport.width, y: saved.y * viewport.height },
      viewport,
    );
  }
  return clampFloatingPosition(
    {
      x: viewport.width - companionSize - 16,
      y: viewport.height - companionSize - 16,
    },
    viewport,
  );
}
