import { Button, Paper, Stack, Typography, TextField } from "@mui/material";
import { useFocusTimer } from "../../hooks/FocusTimerContext.jsx";
import { Modal } from "../UI.jsx";
import AssimilationPicker from "../AssimilationPicker.jsx";
import { fmtTimer, dateBR } from "../../utils/utils.js";

export default function FocusTimerOverlay({ page, navigate, working, action }) {
  const timer = useFocusTimer();
  const timerPage = timer.clock.kind === "THEORY" ? "cycle" : "questions";
  return (
    <>
      {timer.active && page !== timerPage && (
        <Paper
          role="region"
          aria-label="Cronômetro em andamento"
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 16,
            left: { xs: 12, md: 240, lg: 272 },
            zIndex: 1200,
            p: 1.5,
            maxWidth: {
              xs: "calc(100vw - 24px)",
              md: "calc(100vw - 280px)",
              lg: "calc(100vw - 320px)",
            },
            border: "1px solid",
            borderColor: "primary.light",
          }}
        >
          <Stack
            direction="row"
            sx={{ gap: 1.5, alignItems: "center", flexWrap: "wrap" }}
          >
            <Button onClick={() => navigate(timerPage)}>
              {timer.discipline?.name || "Sessão de foco"}
            </Button>
            <Typography
              component="output"
              sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}
            >
              {fmtTimer(timer.seconds)}
            </Typography>
            <Button
              disabled={working || timer.saving}
              onClick={timer.running ? timer.pause : timer.start}
            >
              {timer.running ? "Pausar" : "Continuar"}
            </Button>
            <Button
              variant="contained"
              disabled={timer.seconds < 1 || working || timer.saving}
              onClick={timer.finish}
            >
              Finalizar e registrar
            </Button>
          </Stack>
        </Paper>
      )}
      {timer.recordOpen && (
        <Modal
          title="Registrar sessão de foco"
          onClose={() => {
            if (!timer.saving) timer.setRecordOpen(false);
          }}
        >
          <form onSubmit={timer.save}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Typography>
                {timer.discipline?.name} ·{" "}
                {timer.topic?.title || "Estudo geral"}
              </Typography>
              <Typography fontWeight={700}>
                {fmtTimer(timer.seconds)} · {dateBR(timer.clock.studyDate)}
              </Typography>
              {timer.clock.kind === "QUESTIONS" && (
                <>
                  <TextField
                    label="Questões resolvidas"
                    type="number"
                    required
                    value={timer.result.total}
                    onChange={(event) =>
                      timer.setResult({
                        ...timer.result,
                        total: event.target.value,
                      })
                    }
                    slotProps={{ htmlInput: { min: 1, max: 100000 } }}
                  />
                  <TextField
                    label="Acertos"
                    type="number"
                    required
                    value={timer.result.correct}
                    onChange={(event) =>
                      timer.setResult({
                        ...timer.result,
                        correct: event.target.value,
                      })
                    }
                    slotProps={{
                      htmlInput: { min: 0, max: Number(timer.result.total) },
                    }}
                  />
                  <TextField
                    label="Observação"
                    multiline
                    minRows={2}
                    value={timer.result.notes}
                    onChange={(event) =>
                      timer.setResult({
                        ...timer.result,
                        notes: event.target.value,
                      })
                    }
                    slotProps={{ htmlInput: { maxLength: 400 } }}
                  />
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={working || timer.saving}
              >
                Salvar sessão
              </Button>
            </Stack>
          </form>
        </Modal>
      )}
      {timer.concludeTopic && (
        <AssimilationPicker
          title="Atualizar assimilação deste assunto?"
          subject={timer.concludeTopic.title}
          working={working}
          onClose={() => timer.setConcludeTopic(null)}
          onConfirm={async (level) => {
            const topic = timer.concludeTopic;
            const success = await action(
              topic.theoryDone
                ? `topics/${topic.id}/assimilate`
                : `topics/${topic.id}`,
              topic.theoryDone ? "POST" : "PUT",
              topic.theoryDone
                ? { level }
                : {
                    disciplineId: topic.discipline.id,
                    title: topic.title,
                    status: topic.status,
                    mastery: topic.mastery,
                    importance: topic.importance || 3,
                    summaryDone: topic.summaryDone,
                    theoryDone: true,
                    assimilationLevel: level,
                  },
              "Assimilação atualizada.",
            );
            if (success) timer.setConcludeTopic(null);
          }}
        />
      )}
    </>
  );
}
