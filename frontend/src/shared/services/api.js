import { privateFetch } from "./sessionTransport.js";
import { currentAccountId } from "../utils/accountStorage.js";
export async function api(path, method = "GET", body = undefined) {
  let response;
  try {
    response = await privateFetch(`/api/${path}`, {
      method,
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Confira se o backend está rodando.",
    );
  }
  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      /* no JSON */
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ||
    response.headers.get("content-length") === "0"
    ? null
    : response.text().then((text) => (text ? JSON.parse(text) : null));
}
export const endpoints = [
  "disciplines",
  "topics",
  "questions",
  "study-sessions",
  "reviews",
  "mock-exams",
  "materials",
  "error-notes",
  "plan",
  "dashboard",
  "pet",
  "analytics",
  "agenda",
  "study-plan",
  "daily-progress",
  "agenda/goals",
  "edital/imports",
];

export async function uploadFile(file) {
  if (!file) throw new Error("Escolha um arquivo.");
  if (file.size > 20 * 1024 * 1024)
    throw new Error("O arquivo deve ter até 20 MB.");
  const allowed = /\.(pdf|docx|png|jpe?g|webp)$/i;
  if (!allowed.test(file.name))
    throw new Error("Envie PDF, DOCX, PNG, JPG ou WEBP.");
  const body = new FormData();
  body.append("file", file);
  let response;
  try {
    response = await privateFetch("/api/uploads", { method: "POST", body });
  } catch {
    throw new Error("Sem conexão com o servidor para enviar arquivo.");
  }
  if (!response.ok) {
    let error = `Falha no upload (HTTP ${response.status})`;
    try {
      error = (await response.json()).error || error;
    } catch {}
    throw new Error(error);
  }
  return response.json();
}
export const fileUrl = (id, download = false) => {
  const parameters = new URLSearchParams({
    ...(download ? { download: "true" } : {}),
    ...(currentAccountId() ? { account: currentAccountId() } : {}),
  }).toString();
  return `/api/uploads/${encodeURIComponent(id)}/content${parameters ? `?${parameters}` : ""}`;
};
export const previewUrl = (id) =>
  `/api/uploads/${encodeURIComponent(id)}/preview${currentAccountId() ? `?account=${currentAccountId()}` : ""}`;
