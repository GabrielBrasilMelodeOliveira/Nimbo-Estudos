import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import AuthenticationGate from "../src/pages/authentication/AuthenticationGate.jsx";
import Authentication from "../src/pages/authentication/Authentication.jsx";
import {
  activateAccount,
  accountLocalStorage,
  accountSessionStorage,
} from "../src/shared/utils/accountStorage.js";
import {
  privateFetch,
  sessionChangedEvent,
  setCsrfToken,
} from "../src/shared/services/sessionTransport.js";
import { fileUrl } from "../src/shared/services/api.js";

vi.mock("../src/App.jsx", () => ({
  default: ({ account, onLogout }) => (
    <section>
      Área de {account.name}
      <button onClick={onLogout}>Sair</button>
    </section>
  ),
}));
const session = (user = null, setupRequired = false) => ({
  user,
  setupRequired,
  csrfToken: "csrf-example",
});
const reply = (body, status = 200) =>
  new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
afterEach(() => {
  vi.unstubAllGlobals();
  activateAccount(null);
  setCsrfToken(null);
  localStorage.clear();
  sessionStorage.clear();
});
it("loads private content only after login and returns to the login screen on logout", async () => {
  const account = { id: "account-one", name: "Ana", email: "ana@example.test" };
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(reply(session()))
    .mockResolvedValueOnce(reply(account))
    .mockResolvedValueOnce(reply(session(account)))
    .mockResolvedValueOnce(reply(null, 204))
    .mockResolvedValueOnce(reply(session()));
  vi.stubGlobal("fetch", fetch);
  show(<AuthenticationGate />);
  expect(screen.queryByText("Área de Ana")).toBeNull();
  await screen.findByText("Bem-vindo de volta");
  fireEvent.change(screen.getByLabelText(/^E-mail/), {
    target: { value: account.email },
  });
  fireEvent.change(screen.getByLabelText(/^Senha/), {
    target: { value: "Example-password-123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
  await screen.findByText("Área de Ana");
  expect(fetch.mock.calls[1][1]).toMatchObject({
    credentials: "same-origin",
    headers: { "X-CSRF-TOKEN": "csrf-example" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Sair" }));
  await screen.findByText("Bem-vindo de volta");
  expect(screen.queryByText("Área de Ana")).toBeNull();
});
it("requires matching passwords and submits the setup key for the first account", async () => {
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(reply({}))
    .mockResolvedValueOnce(reply(session({ id: "owner" })));
  vi.stubGlobal("fetch", fetch);
  const authenticated = vi.fn();
  show(<Authentication setupRequired onAuthenticated={authenticated} />);
  for (const [label, value] of [
    [/^Nome/, "Ana"],
    [/^E-mail/, "ana@example.test"],
    [/^Senha/, "Example-password-123"],
    [/^Confirmar senha/, "Different-password"],
    [/^Chave de configuração/, "setup-key"],
  ])
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Criar minha conta" }));
  expect(
    await screen.findByText("As senhas precisam ser iguais."),
  ).toBeTruthy();
  expect(fetch).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText(/^Confirmar senha/), {
    target: { value: "Example-password-123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Criar minha conta" }));
  await act(async () => {});
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    name: "Ana",
    email: "ana@example.test",
    password: "Example-password-123",
    setupKey: "setup-key",
  });
  expect(authenticated).toHaveBeenCalledWith(session({ id: "owner" }));
});
it("keeps browser drafts isolated and migrates old drafts only to the legacy owner", () => {
  sessionStorage.setItem("nimbo-focus-clock-v2", "old-draft");
  activateAccount({ id: "new-account" });
  expect(accountSessionStorage.getItem("nimbo-focus-clock-v2")).toBeNull();
  accountLocalStorage.setItem("nimbo:position", "new-position");
  activateAccount({ id: "owner", legacyOwner: true });
  expect(accountSessionStorage.getItem("nimbo-focus-clock-v2")).toBe(
    "old-draft",
  );
  expect(accountLocalStorage.getItem("nimbo:position")).toBeNull();
  expect(sessionStorage.getItem("nimbo-focus-clock-v2")).toBeNull();
  activateAccount({ id: "new-account" });
  expect(accountLocalStorage.getItem("nimbo:position")).toBe("new-position");
  expect(fileUrl("asset")).toBe(
    "/api/uploads/asset/content?account=new-account",
  );
});
it("binds requests to the active account and refreshes only authentication conflicts", async () => {
  activateAccount({ id: "owner" });
  setCsrfToken("csrf-token");
  const changed = vi.fn();
  window.addEventListener(sessionChangedEvent, changed);
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(reply({ code: "VERSION_CONFLICT" }, 409))
    .mockResolvedValueOnce(reply({ code: "ACCOUNT_CHANGED" }, 409));
  vi.stubGlobal("fetch", fetch);
  try {
    await privateFetch("/api/agenda", { method: "POST" });
    expect(changed).not.toHaveBeenCalled();
    await privateFetch("/api/agenda", { method: "POST" });
    expect(changed).toHaveBeenCalledOnce();
    expect(fetch.mock.calls[0][1].headers).toEqual({
      "X-Nimbo-Account": "owner",
      "X-CSRF-TOKEN": "csrf-token",
    });
  } finally {
    window.removeEventListener(sessionChangedEvent, changed);
  }
});
it("removes an account's content after another tab changes the session", async () => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValueOnce(reply(session({ id: "one", name: "Ana" })))
      .mockResolvedValueOnce(reply(session({ id: "two", name: "Bruno" }))),
  );
  show(<AuthenticationGate />);
  await screen.findByText("Área de Ana");
  act(() =>
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "nimbo:session-notification",
        newValue: "changed",
      }),
    ),
  );
  expect(screen.queryByText("Área de Ana")).toBeNull();
  await screen.findByText("Área de Bruno");
});
