import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Stack } from "@mui/material";
import Authentication from "./Authentication.jsx";
import { endSession, readSession } from "./services/authenticationService.js";
import { activateAccount } from "../../shared/utils/accountStorage.js";
import {
  announceSessionChange,
  sessionChangedEvent,
} from "../../shared/services/sessionTransport.js";
import App from "../../App.jsx";

export default function AuthenticationGate() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const requestVersion = useRef(0);
  const applySession = useCallback((next) => {
    activateAccount(next.user);
    setSession(next);
    setError("");
  }, []);
  const refresh = useCallback(async () => {
    const version = ++requestVersion.current;
    try {
      const next = await readSession();
      if (version === requestVersion.current) applySession(next);
    } catch {
      if (version === requestVersion.current) {
        setSession(null);
        setError(
          "Não foi possível verificar sua sessão. Confira a conexão com a API.",
        );
      }
    }
  }, [applySession]);
  useEffect(() => {
    refresh();
    return () => {
      requestVersion.current++;
    };
  }, [refresh]);
  useEffect(() => {
    const changed = () => {
      setSession(null);
      refresh();
    };
    const fromOtherTab = (event) => {
      if (event.key === "nimbo:session-notification") changed();
    };
    window.addEventListener(sessionChangedEvent, changed);
    window.addEventListener("storage", fromOtherTab);
    return () => {
      window.removeEventListener(sessionChangedEvent, changed);
      window.removeEventListener("storage", fromOtherTab);
    };
  }, [refresh]);
  const authenticated = (next) => {
    requestVersion.current++;
    applySession(next);
    announceSessionChange();
  };
  const logout = async () => {
    const next = await endSession();
    requestVersion.current++;
    applySession(next);
    announceSessionChange();
  };
  if (!session)
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          p: 3,
        }}
      >
        {error ? (
          <Stack spacing={2}>
            <Alert severity="error">{error}</Alert>
            <Button onClick={refresh}>Tentar novamente</Button>
          </Stack>
        ) : (
          <CircularProgress aria-label="Verificando sua sessão" />
        )}
      </Box>
    );
  if (!session.user)
    return (
      <Authentication
        key={String(session.setupRequired)}
        setupRequired={session.setupRequired}
        onAuthenticated={authenticated}
      />
    );
  return <App key={session.user.id} account={session.user} onLogout={logout} />;
}
