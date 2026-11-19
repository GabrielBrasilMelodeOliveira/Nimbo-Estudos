import { useHistoryPeriod } from "../../shared/hooks/useHistoryPeriod.js";
import { isWithinHistoryRange } from "../../shared/utils/historyPeriod.js";
import HistoryPeriodFilter from "../../shared/components/history/HistoryPeriodFilter.jsx";
import HistoryScrollArea from "../../shared/components/history/HistoryScrollArea.jsx";
import {
  Input,
  SearchableSelect,
} from "../../shared/components/FormControls.jsx";
import {
  Modal,
  Field,
  PrimaryButton,
  SubtleButton,
  Panel,
  Empty,
  DeleteButton,
} from "../../shared/components/UI.jsx";
import { Timer, Plus } from "lucide-react";
import { Stack } from "@mui/material";
import { fmtHours, dateBR } from "../../shared/utils/utils.js";
import FocusTimer from "../../shared/components/focus/FocusTimer.jsx";
import CollapsiblePanel from "../../shared/components/CollapsiblePanel.jsx";
import StudySummary from "../dashboard/sections/StudySummary.jsx";
import { useStudyCycle } from "./hooks/useStudyCycle.jsx";
export default function StudyCycle({
  data,
  action,
  working,
  focusTopicId,
  focusDisciplineId,
  navigate,
}) {
  const {
    showManual,
    setShowManual,
    manual,
    setManual,
    saveManual,
    manualTopics,
    history,
  } = useStudyCycle({ data, action });
  const historyPeriod = useHistoryPeriod();
  const filteredHistory = history
    .filter((session) => isWithinHistoryRange(session.studyDate, historyPeriod))
    .sort(
      (first, second) =>
        second.studyDate.localeCompare(first.studyDate) || second.id - first.id,
    );
  return (
    <Stack spacing={3}>
      <FocusTimer
        kind="THEORY"
        data={data}
        working={working}
        focusTopicId={focusTopicId}
        focusDisciplineId={focusDisciplineId}
      />
      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
        <SubtleButton onClick={() => setShowManual(true)}>
          <Plus size={17} />
          Registrar tempo manualmente
        </SubtleButton>
      </Stack>
      <CollapsiblePanel title="Métricas de estudo">
        <StudySummary
          daily={data.dashboard?.dailyHours || []}
          questions={data.questions || []}
          weekly={data.dashboard?.weeklySeconds || 0}
          goalSeconds={(data.plan?.weeklyGoalMinutes || 0) * 60}
          navigate={navigate}
        />
      </CollapsiblePanel>
      <CollapsiblePanel title={`Sessões registradas (${history.length})`}>
        <Panel
          title="Sessões registradas"
          action={
            <span className="small-chip">
              {filteredHistory.length} de {history.length} sessões
            </span>
          }
        >
          <HistoryPeriodFilter {...historyPeriod} />
          {filteredHistory.length ? (
            <HistoryScrollArea
              label="Histórico de sessões de estudo"
              filterKey={`${historyPeriod.from}:${historyPeriod.to}`}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>DATA</th>
                    <th>DISCIPLINA</th>
                    <th>ASSUNTO</th>
                    <th>TIPO</th>
                    <th>TEMPO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((s) => (
                    <tr key={s.id}>
                      <td className="table-muted">{dateBR(s.studyDate)}</td>
                      <td>
                        <strong>{s.discipline.name}</strong>
                      </td>
                      <td className="table-muted">
                        {s.topic?.title || "Estudo geral"}
                      </td>
                      <td>
                        <span
                          className={`study-type ${s.kind === "QUESTIONS" ? "questions" : "theory"}`}
                        >
                          {s.kind === "QUESTIONS" ? "Questões" : "Teoria"}
                        </span>
                      </td>
                      <td>
                        <span className="time-tag">
                          {fmtHours(s.durationSeconds)}
                        </span>
                      </td>
                      <td>
                        <DeleteButton
                          onClick={() => {
                            if (window.confirm("Excluir esta sessão?"))
                              action(
                                `study-sessions/${s.id}`,
                                "DELETE",
                                undefined,
                                "Sessão removida.",
                              );
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HistoryScrollArea>
          ) : (
            <Empty
              title={
                history.length
                  ? "Nenhuma sessão neste período"
                  : "Sua primeira sessão começa aqui"
              }
              description={
                history.length
                  ? "Escolha outra data ou consulte todo o histórico."
                  : "Inicie o cronômetro e registre sua primeira sessão de foco."
              }
              icon={Timer}
            />
          )}
        </Panel>
      </CollapsiblePanel>
      {showManual && (
        <Modal
          title="Registrar tempo manualmente"
          subtitle="Para quando você estudou sem usar o cronômetro."
          onClose={() => setShowManual(false)}
        >
          <form className="form-stack" onSubmit={saveManual}>
            <Field label="Disciplina">
              <SearchableSelect
                required
                value={manual.disciplineId}
                onChange={(e) =>
                  setManual({
                    ...manual,
                    disciplineId: e.target.value,
                    topicId: "",
                  })
                }
              >
                <option value="">Selecione</option>
                {data.disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </SearchableSelect>
            </Field>
            <Field label="Assunto (opcional)">
              <SearchableSelect
                value={manual.topicId}
                onChange={(e) =>
                  setManual({
                    ...manual,
                    topicId: e.target.value,
                  })
                }
              >
                <option value="">Estudo geral</option>
                {manualTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </SearchableSelect>
            </Field>
            <div className="form-grid">
              <Field label="Horas">
                <Input
                  min="0"
                  max="23"
                  type="number"
                  required
                  value={manual.hours}
                  onChange={(e) =>
                    setManual({
                      ...manual,
                      hours: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Minutos">
                <Input
                  min="0"
                  max="59"
                  type="number"
                  required
                  value={manual.minutes}
                  onChange={(e) =>
                    setManual({
                      ...manual,
                      minutes: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Data do estudo">
              <Input
                type="date"
                required
                value={manual.studyDate}
                onChange={(e) =>
                  setManual({
                    ...manual,
                    studyDate: e.target.value,
                  })
                }
              />
            </Field>
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setShowManual(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Salvar tempo
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </Stack>
  );
}
