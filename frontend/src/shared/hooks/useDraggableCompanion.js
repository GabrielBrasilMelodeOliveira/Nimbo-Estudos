import { companionRecoveryEvent } from "../utils/companionRecovery.js";
import { useEffect, useRef, useState } from "react";
import {
  clampFloatingPosition,
  restoreFloatingPosition,
} from "../utils/floatingPosition.js";

const storageKey = "nimbo:position";
const floatingClock = () =>
  document.querySelector('[aria-label="Cronômetro em andamento"]');
function viewportSize() {
  const sidebar = document.querySelector(
    '[aria-label="Barra lateral principal"]',
  );
  const bounds = sidebar?.getBoundingClientRect();
  const leftInset =
    window.innerWidth > 760 &&
    bounds?.right > 0 &&
    bounds.width < window.innerWidth - 76
      ? bounds.right
      : 0;
  const clockBounds = floatingClock()?.getBoundingClientRect();
  const bottomInset =
    window.innerWidth <= 760 && clockBounds?.height > 0
      ? Math.max(0, window.innerHeight - clockBounds.top + 8)
      : 0;
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    leftInset,
    bottomInset,
  };
}
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
      setPosition((current) => {
        const nextPosition = clampFloatingPosition(current, nextViewport);
        savePosition(nextPosition);
        return nextPosition;
      });
    };
    const reset = () => {
      const nextViewport = viewportSize();
      const nextPosition = restoreFloatingPosition(null, nextViewport);
      gesture.current = null;
      ignoreClick.current = false;
      setDragging(false);
      setViewport(nextViewport);
      setPosition(nextPosition);
      savePosition(nextPosition);
    };
    const sidebar = document.querySelector(
      '[aria-label="Barra lateral principal"]',
    );
    const observer = new ResizeObserver(resize);
    if (sidebar) observer.observe(sidebar);
    let clockElement = floatingClock();
    if (clockElement) observer.observe(clockElement);
    const clockMountObserver = new MutationObserver(() => {
      const nextClock = floatingClock();
      if (nextClock === clockElement) return;
      if (clockElement) observer.unobserve?.(clockElement);
      clockElement = nextClock;
      if (clockElement) observer.observe(clockElement);
      resize();
    });
    clockMountObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener(companionRecoveryEvent, reset);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener(companionRecoveryEvent, reset);
      observer.disconnect();
      clockMountObserver.disconnect();
    };
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
