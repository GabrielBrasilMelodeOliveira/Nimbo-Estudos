import {
  setCsrfToken,
  sessionHeaders,
} from "../../../shared/services/sessionTransport.js";
async function request(path, body) {
  const response = await fetch(`/api/auth/${path}`, {
    method: body === undefined ? "GET" : "POST",
    credentials: "same-origin",
    headers:
      body === undefined
        ? {}
        : { ...sessionHeaders("POST"), "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    let payload = {};
    try {
      payload = await response.json();
    } catch {
      /* Use the fallback message. */
    }
    const error = new Error(
      payload.error || "Não foi possível acessar sua conta. Tente novamente.",
    );
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
}
export async function readSession() {
  const session = await request("session");
  setCsrfToken(session.csrfToken);
  return session;
}
export async function authenticate(mode, values) {
  // Auth requests do not bind to a previously signed-out account.
  const headers = sessionHeaders("POST");
  delete headers["X-Nimbo-Account"];
  const response = await fetch(`/api/auth/${mode}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Não foi possível acessar sua conta.");
  }
  return readSession();
}
export async function endSession() {
  await request("logout", {});
  return readSession();
}
