import { useEffect, useRef, useState } from "react";
import {
  clampFloatingPosition,
  restoreFloatingPosition,
} from "../utils/floatingPosition.js";

const storageKey = "nimbo:position";
const viewportSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
function readPosition(viewport) {
  try {
    return restoreFloatingPosition(
      JSON.parse(localStorage.getItem(storageKey)),
      viewport,
    );
  } catch {
    return restoreFloatingPosition(null, viewport);
  }
}
function savePosition(position) {
  const viewport = viewportSize();
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        x: position.x / viewport.width,
        y: position.y / viewport.height,
      }),
    );
  } catch {
    /* Dragging remains available when storage is disabled. */
  }
}

export function useDraggableCompanion(onExpand) {
  const [viewport, setViewport] = useState(viewportSize);
  const [position, setPosition] = useState(() => readPosition(viewportSize()));
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const ignoreClick = useRef(false);
  useEffect(() => {
    const resize = () => {
      const nextViewport = viewportSize();
      setViewport(nextViewport);
      setPosition((current) => clampFloatingPosition(current, nextViewport));
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const finish = (event) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    ignoreClick.current = current.moved;
    if (current.moved) savePosition(current.position);
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {
    position,
    viewport,
    dragging,
    bindings: {
      onPointerDown: (event) => {
        if (event.button !== 0 || event.isPrimary === false) return;
        ignoreClick.current = false;
        gesture.current = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          start: position,
          position,
          moved: false,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
      },
      onPointerMove: (event) => {
        const current = gesture.current;
        if (!current || current.pointerId !== event.pointerId) return;
        const deltaX = event.clientX - current.clientX;
        const deltaY = event.clientY - current.clientY;
        if (!current.moved && Math.hypot(deltaX, deltaY) < 6) return;
        current.moved = true;
        current.position = clampFloatingPosition(
          { x: current.start.x + deltaX, y: current.start.y + deltaY },
          viewportSize(),
        );
        setDragging(true);
        setPosition(current.position);
      },
      onPointerUp: finish,
      onPointerCancel: finish,
      onLostPointerCapture: finish,
      onClick: (event) => {
        if (ignoreClick.current && event.detail !== 0) {
          ignoreClick.current = false;
          return;
        }
        ignoreClick.current = false;
        onExpand();
      },
      onKeyDown: (event) => {
        const moves = {
          ArrowLeft: [-20, 0],
          ArrowRight: [20, 0],
          ArrowUp: [0, -20],
          ArrowDown: [0, 20],
        };
        if (!moves[event.key]) return;
        event.preventDefault();
        const [deltaX, deltaY] = moves[event.key];
        const nextPosition = clampFloatingPosition(
          { x: position.x + deltaX, y: position.y + deltaY },
          viewportSize(),
        );
        setPosition(nextPosition);
        savePosition(nextPosition);
      },
    },
  };
}
