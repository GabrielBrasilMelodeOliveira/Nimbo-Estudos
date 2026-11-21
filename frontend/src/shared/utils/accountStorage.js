let activeAccountId = null;
export const currentAccountId = () => activeAccountId;
const scopedKey = (key, accountId) =>
  accountId ? `nimbo-account:${accountId}:${key}` : key;
const scopeKey = (key) => scopedKey(key, activeAccountId);
const storage = (kind) => ({
  getItem: (key) => window[kind].getItem(scopeKey(key)),
  setItem: (key, value) => window[kind].setItem(scopeKey(key), value),
  removeItem: (key) => window[kind].removeItem(scopeKey(key)),
});
export const accountLocalStorage = storage("localStorage");
export const accountSessionStorage = storage("sessionStorage");
export function createAccountSessionStorage() {
  const accountId = activeAccountId;
  return {
    getItem: (key) => window.sessionStorage.getItem(scopedKey(key, accountId)),
    setItem: (key, value) =>
      window.sessionStorage.setItem(scopedKey(key, accountId), value),
    removeItem: (key) =>
      window.sessionStorage.removeItem(scopedKey(key, accountId)),
  };
}
export function activateAccount(account) {
  activeAccountId = account?.id || null;
  if (!account?.legacyOwner) return;
  // Only the owner authorized by the setup key may inherit this browser's old drafts.
  for (const [kind, keys] of [
    [
      "localStorage",
      ["nimbo:position", "nimbo:open", "nimbo:sidebar-collapsed"],
    ],
    ["sessionStorage", ["nimbo-focus-clock-v2", "nimbo-question-timer-v1"]],
  ]) {
    try {
      const target = window[kind];
      for (const key of keys) {
        const old = target.getItem(key);
        if (old !== null && target.getItem(scopeKey(key)) === null)
          target.setItem(scopeKey(key), old);
        target.removeItem(key);
      }
    } catch {
      /* Private browsing can disable storage. */
    }
  }
}
