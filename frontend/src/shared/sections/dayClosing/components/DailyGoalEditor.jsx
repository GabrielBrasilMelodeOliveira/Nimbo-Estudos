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

export default function DailyGoalEditor({ goal, action, working }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const show = () => {
    setForm({
      targetMinutes: goal.targetMinutes,
      targetQuestions: goal.targetQuestions,
      targetTopics: goal.targetTopics,
    });
    setOpen(true);
  };
  const save = async (event) => {
    event.preventDefault();
    if (
      await action("daily-progress", "PUT", form, "Metas diárias atualizadas.")
    )
      setOpen(false);
  };
  return (
    <>
      <Button onClick={show} disabled={working}>
        Editar metas diárias
      </Button>
      <Dialog
        open={open}
        onClose={() => !working && setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={save}>
          <DialogTitle>Metas diárias do Nimbo</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Alert severity="info">
                Valem para hoje e os próximos dias. Dias encerrados mantêm as
                metas anteriores.
              </Alert>
              {[
                ["targetMinutes", "Minutos de estudo", 1440],
                ["targetQuestions", "Questões a resolver", 10000],
                ["targetTopics", "Assuntos a estudar", 1000],
              ].map(([key, label, maximum]) => (
                <TextField
                  key={key}
                  label={label}
                  type="number"
                  value={form[key] ?? 0}
                  required
                  fullWidth
                  slotProps={{ htmlInput: { min: 0, max: maximum, step: 1 } }}
                  onChange={(event) =>
                    setForm({ ...form, [key]: Number(event.target.value) })
                  }
                />
              ))}
              <Typography variant="body2">
                Zero desativa uma medida. Mantenha pelo menos uma meta positiva.
                Teoria e tempo de questões contam juntos; assuntos distintos
                contam uma vez por dia.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                As metas iniciais vêm da divisão das metas semanais de tempo e
                assuntos por sete, arredondada para cima. Você pode ajustá-las
                aqui.
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button disabled={working} onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={
                working || Object.values(form).every((value) => value === 0)
              }
            >
              Salvar metas
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
