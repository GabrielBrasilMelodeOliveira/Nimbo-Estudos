import { useState } from "react";

const preferenceKey = "nimbo:sidebar-collapsed";
export function useSidebarPreference() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(preferenceKey) === "true";
    } catch {
      return false;
    }
  });
  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(preferenceKey, String(next));
    } catch {
      /* The menu remains usable when browser storage is unavailable. */
    }
  };
  return { collapsed, toggleCollapsed };
}
