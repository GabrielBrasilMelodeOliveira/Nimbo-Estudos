import { SearchableSelect } from "../../../shared/components/FormControls.jsx";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Paper,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { PetArt } from "../../../shared/components/Pet.jsx";
import {
  bodyAccessories,
  companionClassName,
  headAccessories,
  isHexColor,
  owlDefaults,
  owlPaths,
  resolveOwlAppearance,
} from "../../../shared/components/pet/owlAppearance.js";

const colorPresets = [
  "#55BDD5",
  "#AB8DD8",
  "#E4B76B",
  "#81B58E",
  "#DA8FA9",
  "#E5E9EE",
];
function ColorField({ label, value, onChange, disabled }) {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        type="color"
        value={isHexColor(value) ? value : "#55BDD5"}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        slotProps={{ htmlInput: { "aria-label": `Escolher cor: ${label}` } }}
        sx={{ width: 64, flexShrink: 0, "& input": { height: 28, padding: 1 } }}
      />
      <TextField
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        error={!isHexColor(value)}
        helperText={!isHexColor(value) ? "Use # e seis dígitos." : undefined}
        fullWidth
        slotProps={{ htmlInput: { maxLength: 7 } }}
      />
    </Stack>
  );
}

export default function OwlCustomizer({ pet, action, working, onClose }) {
  const [draft, setDraft] = useState(() =>
    resolveOwlAppearance(pet.appearance, pet.species),
  );
  const [previewRank, setPreviewRank] = useState(pet.stage || 1);
  const [previewMood, setPreviewMood] = useState("neutral");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const busy = working || saving;
  const valid = [draft.featherColor, draft.scarfColor, draft.eyeColor].every(
    isHexColor,
  );
  const update = (key, value) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const save = async (event) => {
    event.preventDefault();
    if (busy || !valid) return;
    setSaving(true);
    setError("");
    try {
      if (
        await action(
          `pet/${pet.id}/appearance`,
          "PUT",
          draft,
          "Coruja personalizada!",
        )
      )
        onClose();
      else
        setError(
          "Não foi possível salvar. Suas escolhas continuam aqui para tentar novamente.",
        );
    } catch {
      setError(
        "Não foi possível salvar. Suas escolhas continuam aqui para tentar novamente.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog
      open
      fullWidth
      maxWidth="md"
      onClose={() => {
        if (!busy) onClose();
      }}
      aria-labelledby="owl-customizer-title"
    >
      <Box component="form" onSubmit={save}>
        <DialogTitle id="owl-customizer-title">
          Personalizar minha coruja
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" },
              gap: 3,
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                alignSelf: "start",
                position: { md: "sticky" },
                top: 0,
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Box sx={{ width: 192, maxWidth: "100%" }}>
                  <PetArt
                    species={pet.species}
                    stage={previewRank}
                    mood={previewMood}
                    appearance={draft}
                  />
                </Box>
                <Typography variant="subtitle2" textAlign="center">
                  {companionClassName(previewRank, draft.path)}
                </Typography>
                <Typography
                  variant="caption"
                  textAlign="center"
                  color="text.secondary"
                >
                  Prévia da evolução · seu nível {pet.level} e seus {pet.xp} XP
                  serão preservados.
                </Typography>
                <Slider
                  value={previewRank}
                  min={1}
                  max={7}
                  step={1}
                  marks
                  aria-label="Prévia da evolução"
                  onChange={(_, value) => setPreviewRank(value)}
                  disabled={busy}
                  sx={{ width: "90%" }}
                />
                <SearchableSelect
                  label="Prévia da animação"
                  value={previewMood}
                  onChange={(event) => setPreviewMood(event.target.value)}
                  fullWidth
                  disabled={busy}
                >
                  {Object.entries({
                    neutral: "Repouso",
                    happy: "Feliz",
                    hungry: "Com fome",
                    tired: "Cansada",
                    sad: "Triste",
                    angry: "Irritada",
                    proud: "Orgulhosa",
                    excited: "Empolgada",
                    radiant: "Radiante",
                    legendary: "Lendária",
                    dead: "Jornada encerrada",
                  }).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SearchableSelect>
              </Stack>
            </Paper>
            <Stack spacing={2.5}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Caminho da coruja</FormLabel>
                <ToggleButtonGroup
                  exclusive
                  value={draft.path}
                  onChange={(_, value) => {
                    if (value) update("path", value);
                  }}
                  disabled={busy}
                  aria-label="Caminho da coruja"
                  sx={{ flexWrap: "wrap" }}
                >
                  {owlPaths.map((path) => (
                    <ToggleButton key={path.value} value={path.value}>
                      {path.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {
                    owlPaths.find((path) => path.value === draft.path)
                      ?.description
                  }{" "}
                  Trocar o caminho mantém seu XP.
                </Typography>
              </FormControl>
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight={600}>
                  Cores das penas
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {colorPresets.map((color) => (
                    <Button
                      key={color}
                      aria-label={`Penas ${color}`}
                      aria-pressed={draft.featherColor.toUpperCase() === color}
                      disabled={busy}
                      onClick={() => update("featherColor", color)}
                      sx={{
                        minWidth: 36,
                        width: 36,
                        height: 36,
                        bgcolor: color,
                        border: "2px solid",
                        borderColor:
                          draft.featherColor.toUpperCase() === color
                            ? "text.primary"
                            : "divider",
                        "&:hover": {
                          bgcolor: color,
                          filter: "brightness(0.94)",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
              <ColorField
                label="Cor das penas"
                value={draft.featherColor}
                onChange={(value) => update("featherColor", value)}
                disabled={busy}
              />
              <ColorField
                label="Cor do cachecol e equipamentos"
                value={draft.scarfColor}
                onChange={(value) => update("scarfColor", value)}
                disabled={busy}
              />
              <ColorField
                label="Cor dos olhos"
                value={draft.eyeColor}
                onChange={(value) => update("eyeColor", value)}
                disabled={busy}
              />
              <SearchableSelect
                label="Acessório de cabeça"
                value={draft.headAccessory}
                onChange={(event) =>
                  update("headAccessory", event.target.value)
                }
                disabled={busy}
                fullWidth
              >
                {headAccessories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SearchableSelect>
              <SearchableSelect
                label="Acessório do corpo"
                value={draft.bodyAccessory}
                onChange={(event) =>
                  update("bodyAccessory", event.target.value)
                }
                disabled={busy}
                fullWidth
              >
                {bodyAccessories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SearchableSelect>
              <Button
                onClick={() => setDraft({ ...owlDefaults })}
                disabled={busy}
                sx={{ alignSelf: "start" }}
              >
                Restaurar visual azul original
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} disabled={busy}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={busy || !valid}>
            {saving ? "Salvando…" : "Salvar aparência"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
