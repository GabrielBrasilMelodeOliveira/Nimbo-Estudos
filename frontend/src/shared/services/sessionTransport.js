import { currentAccountId } from "../utils/accountStorage.js";
let csrfToken = null;
export const sessionChangedEvent = "nimbo:session-changed";
export function setCsrfToken(token) {
  csrfToken = token;
}
export function sessionHeaders(method = "GET", extra = {}) {
  const headers = { ...extra };
  if (currentAccountId()) headers["X-Nimbo-Account"] = currentAccountId();
  if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase()) && csrfToken)
    headers["X-CSRF-TOKEN"] = csrfToken;
  return headers;
}
export async function privateFetch(source, options = {}) {
  const response = await fetch(source, {
    ...options,
    credentials: "same-origin",
    headers: sessionHeaders(options.method, options.headers),
  });
  if (
    response.status === 401 ||
    response.status === 409 ||
    response.status === 403
  ) {
    let accountChanged = response.status === 401 || response.status === 403;
    if (response.status === 409) {
      try {
        accountChanged =
          (await response.clone().json()).code === "ACCOUNT_CHANGED";
      } catch {
        /* Non-authentication conflict. */
      }
    }
    if (accountChanged) window.dispatchEvent(new Event(sessionChangedEvent));
  }
  return response;
}
export function announceSessionChange() {
  try {
    window.localStorage.setItem(
      "nimbo:session-notification",
      `${Date.now()}:${Math.random()}`,
    );
  } catch {
    /* Storage is optional. */
  }
}
