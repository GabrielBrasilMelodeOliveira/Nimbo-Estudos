import { useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { LogOut } from "lucide-react";
import { useFocusTimer } from "../../hooks/FocusTimerContext.jsx";

export default function AccountMenu({ account, onLogout }) {
  const [anchor, setAnchor] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const timer = useFocusTimer();
  async function logout() {
    setBusy(true);
    setError("");
    timer.pause();
    try {
      await onLogout();
    } catch {
      setError("Não foi possível sair. Tente novamente.");
      setBusy(false);
    }
  }
  return (
    <>
      <Button
        aria-label={`Sua conta: ${account.name}`}
        aria-haspopup="menu"
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{ minWidth: 44, p: 0.5 }}
      >
        <Avatar
          sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 15 }}
        >
          {account.name.slice(0, 1).toLocaleUpperCase("pt-BR")}
        </Avatar>
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <Stack sx={{ px: 2, py: 1, maxWidth: 300 }}>
          <Typography fontWeight={700} noWrap>
            {account.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {account.email}
          </Typography>
        </Stack>
        <MenuItem
          onClick={() => {
            setAnchor(null);
            setConfirm(true);
          }}
          sx={{ gap: 1 }}
        >
          <LogOut size={18} /> Sair da conta
        </MenuItem>
      </Menu>
      <Dialog
        open={confirm}
        onClose={busy ? undefined : () => setConfirm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Sair da conta?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {timer.active
              ? "O cronômetro será pausado. Você poderá continuar esse tempo ao entrar novamente nesta conta e neste navegador."
              : "Seu progresso está salvo. Você poderá entrar novamente quando quiser."}
          </DialogContentText>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setConfirm(false)}>
            Continuar estudando
          </Button>
          <Button variant="contained" disabled={busy} onClick={logout}>
            {busy ? "Saindo..." : "Sair"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
