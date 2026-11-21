import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { PetArt } from "../../shared/components/Pet.jsx";
import { authenticate } from "./services/authenticationService.js";

export default function Authentication({ setupRequired, onAuthenticated }) {
  const [mode, setMode] = useState(setupRequired ? "register" : "login");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmation: "",
    setupKey: "",
  });
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const registering = mode === "register";
  const field = (key) => ({
    value: values[key],
    onChange: (event) =>
      setValues((current) => ({ ...current, [key]: event.target.value })),
  });
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError("");
    if (registering && values.password !== values.confirmation) {
      setError("As senhas precisam ser iguais.");
      return;
    }
    if (registering && new TextEncoder().encode(values.password).length > 72) {
      setError("A senha deve ter até 72 bytes. Use uma senha um pouco menor.");
      return;
    }
    setBusy(true);
    try {
      const body = { email: values.email.trim(), password: values.password };
      if (registering)
        Object.assign(body, {
          name: values.name.trim(),
          setupKey: values.setupKey.trim(),
        });
      const session = await authenticate(mode, body);
      setValues((current) => ({
        ...current,
        password: "",
        confirmation: "",
        setupKey: "",
      }));
      onAuthenticated(session);
    } catch (exception) {
      setError(exception.message || "Falha de conexão. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, md: 5 },
        bgcolor: "background.default",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1040,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.85fr 1fr" },
        }}
      >
        <Stack
          spacing={2}
          sx={{
            p: { xs: 3, md: 5 },
            bgcolor: "primary.dark",
            color: "common.white",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="span" fontWeight={800}>
            nimbo.
          </Typography>
          <Box
            sx={{
              width: 170,
              alignSelf: "center",
              display: { xs: "none", md: "block" },
            }}
          >
            <PetArt stage={1} mood="happy" />
          </Box>
          <Typography component="h1" variant="h4" fontWeight={700}>
            Seu estudo.
            <br />
            Sua jornada.
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
            Agenda, questões, flashcards e sua coruja, juntos em uma conta só.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <ShieldCheck size={18} />
            <Typography variant="body2">
              Seu progresso fica salvo na sua conta.
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={3} sx={{ p: { xs: 3, md: 5 } }}>
          <Box>
            <Typography component="h2" variant="h5" fontWeight={700}>
              {setupRequired
                ? "Configure sua primeira conta"
                : registering
                  ? "Comece sua jornada"
                  : "Bem-vindo de volta"}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {setupRequired
                ? "Esta conta ficará com os dados que já existem nesta instalação."
                : "Acesse seu espaço de estudos no Nimbo."}
            </Typography>
          </Box>
          {!setupRequired && (
            <Tabs
              value={mode}
              onChange={(_, value) => {
                setMode(value);
                setError("");
                setValues((current) => ({
                  ...current,
                  password: "",
                  confirmation: "",
                }));
              }}
              variant="fullWidth"
              aria-label="Acesso à conta"
            >
              <Tab label="Entrar" value="login" disabled={busy} />
              <Tab label="Criar conta" value="register" disabled={busy} />
            </Tabs>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Stack component="form" onSubmit={submit} spacing={2.5}>
            {registering && (
              <TextField
                label="Nome"
                required
                autoComplete="name"
                disabled={busy}
                slotProps={{ htmlInput: { minLength: 2, maxLength: 80 } }}
                {...field("name")}
              />
            )}
            <TextField
              label="E-mail"
              type="email"
              required
              autoComplete="username"
              disabled={busy}
              slotProps={{ htmlInput: { maxLength: 254 } }}
              {...field("email")}
            />
            <TextField
              label="Senha"
              type={visible ? "text" : "password"}
              required
              autoComplete={registering ? "new-password" : "current-password"}
              disabled={busy}
              helperText={
                registering ? "Use pelo menos 10 caracteres." : undefined
              }
              {...field("password")}
              slotProps={{
                htmlInput: {
                  minLength: registering ? 10 : undefined,
                  maxLength: 128,
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                        onClick={() => setVisible((current) => !current)}
                        edge="end"
                      >
                        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {registering && (
              <TextField
                label="Confirmar senha"
                type={visible ? "text" : "password"}
                required
                autoComplete="new-password"
                disabled={busy}
                {...field("confirmation")}
              />
            )}
            {setupRequired && (
              <TextField
                label="Chave de configuração"
                required
                autoComplete="off"
                disabled={busy}
                helperText="Copie NIMBO_SETUP_KEY dos logs da API: docker compose logs api. Ela é usada apenas nesta primeira conta."
                {...field("setupKey")}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={busy}
              startIcon={
                busy ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <LockKeyhole size={18} />
                )
              }
              sx={{ minHeight: 48 }}
            >
              {busy
                ? "Aguarde..."
                : registering
                  ? "Criar minha conta"
                  : "Entrar"}
            </Button>
          </Stack>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            Cada conta tem seus próprios dados de estudo, materiais e
            companheiros.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
