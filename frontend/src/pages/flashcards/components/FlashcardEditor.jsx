import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SearchableSelect } from "../../../shared/components/FormControls.jsx";
import { api } from "../../../shared/services/api.js";

export default function FlashcardEditor({ card, data, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: card?.source || "",
    question: card?.question || "",
    answer: card?.answer || "",
    disciplineId: String(card?.disciplineId || ""),
    topicId: String(card?.topicId || ""),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const change = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));
  const topics = (data.topics || []).filter(
    (topic) => String(topic.discipline.id) === form.disciplineId,
  );
  const submit = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      await api(
        card ? `flashcards/manual/${card.id}` : "flashcards/manual",
        card ? "PUT" : "POST",
        {
          ...form,
          disciplineId: form.disciplineId ? Number(form.disciplineId) : null,
          topicId: form.topicId ? Number(form.topicId) : null,
          expectedRevision: card?.revision,
        },
      );
      await onSaved();
      onClose();
    } catch (exception) {
      setError(exception.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog
      open
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="flashcard-editor-title"
    >
      <DialogTitle id="flashcard-editor-title">
        {card ? "Editar flashcard" : "Novo flashcard"}
      </DialogTitle>
      <Stack component="form" onSubmit={submit}>
        <DialogContent>
          <Stack spacing={3}>
            <Typography color="text.secondary" variant="body2">
              Crie uma pergunta e sua resposta. O cartão entra na mesma revisão
              espaçada dos erros cadastrados.
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Título (opcional)"
              value={form.title}
              onChange={change("title")}
              disabled={saving}
              slotProps={{ htmlInput: { maxLength: 220 } }}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <SearchableSelect
                label="Disciplina (opcional)"
                value={form.disciplineId}
                disabled={saving}
                onChange={(event) =>
                  setForm({
                    ...form,
                    disciplineId: event.target.value,
                    topicId: "",
                  })
                }
              >
                <option value="">Sem disciplina</option>
                {(data.disciplines || []).map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </option>
                ))}
              </SearchableSelect>
              <SearchableSelect
                label="Assunto (opcional)"
                value={form.topicId}
                disabled={saving || !form.disciplineId}
                onChange={change("topicId")}
              >
                <option value="">Estudo geral</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </SearchableSelect>
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                autoFocus
                label="Pergunta"
                required
                multiline
                minRows={5}
                maxRows={12}
                value={form.question}
                onChange={change("question")}
                disabled={saving}
                slotProps={{ htmlInput: { maxLength: 20000 } }}
              />
              <TextField
                label="Resposta"
                required
                multiline
                minRows={5}
                maxRows={12}
                value={form.answer}
                onChange={change("answer")}
                disabled={saving}
                slotProps={{ htmlInput: { maxLength: 20000 } }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={saving || !form.question.trim() || !form.answer.trim()}
          >
            {saving
              ? "Salvando…"
              : card
                ? "Salvar alterações"
                : "Criar flashcard"}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
