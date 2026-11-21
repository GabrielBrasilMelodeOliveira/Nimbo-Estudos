export const companionRecoveryEvent = "nimbo:recover-companion";
export function recoverCompanion() {
  try {
    localStorage.removeItem("nimbo:position");
    localStorage.setItem("nimbo:open", "false");
  } catch {
    // Recovery still works in memory when browser storage is disabled.
  }
  window.dispatchEvent(new Event(companionRecoveryEvent));
}
