export const companionSize = 60;
const margin = 8;

export function clampFloatingPosition(position, viewport) {
  const maximumX = Math.max(margin, viewport.width - companionSize - margin);
  const minimumX = Math.min(
    maximumX,
    Math.max(margin, (viewport.leftInset || 0) + margin),
  );
  const maximumY = Math.max(
    margin,
    viewport.height - (viewport.bottomInset || 0) - companionSize - margin,
  );
  return {
    x: Math.max(
      minimumX,
      Math.min(Number.isFinite(position.x) ? position.x : maximumX, maximumX),
    ),
    y: Math.max(
      margin,
      Math.min(Number.isFinite(position.y) ? position.y : maximumY, maximumY),
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
