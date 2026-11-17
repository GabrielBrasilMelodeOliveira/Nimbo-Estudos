import { Input, NativeSelect } from "../../shared/components/FormControls.jsx";
import { Button } from "@mui/material";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Timer,
  Clock3,
  Plus,
  ArrowRight,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  ListOrdered,
} from "lucide-react";
import {
  Modal,
  Field,
  PrimaryButton,
  SubtleButton,
  Panel,
  Empty,
  DeleteButton,
  ProgressBar,
} from "../../shared/components/UI.jsx";
import { fmtTimer, fmtHours, dateBR } from "../../shared/utils/utils.js";
import AssimilationPicker from "../../shared/components/AssimilationPicker.jsx";
import { useStudyCycle } from "./hooks/useStudyCycle.jsx";
export default function StudyCycle({ data, action, working, focusTopicId }) {
  const {
    nextId,
    disciplineId,
    setDisciplineId,
    topicId,
    setTopicId,
    running,
    setRunning,
    seconds,
    setSeconds,
    startAt,
    elapsedMs,
    interval,
    appliedFocus,
    showManual,
    setShowManual,
    concludeTopic,
    setConcludeTopic,
    showReorder,
    setShowReorder,
    cycleOrder,
    setCycleOrder,
    moveCycle,
    manual,
    setManual,
    pause,
    reset,
    save,
    saveManual,
    availableTopics,
    manualTopics,
    next,
    history,
    recommendation,
    recommendedDiscipline,
  } = useStudyCycle({
    data,
    action,
    working,
    focusTopicId,
  });
  return (
    <div className="view-stack">
      <div className="section-toolbar">
        <span className="toolbar-info">
          <RotateCcw size={19} /> Estudo de teoria
        </span>
        <div className="toolbar-buttons">
          <SubtleButton
            onClick={() => {
              setManual({
                ...manual,
                disciplineId: String(nextId || data.disciplines[0]?.id || ""),
              });
              setShowManual(true);
            }}
          >
            <Plus size={17} /> Registrar tempo manualmente
          </SubtleButton>
        </div>
      </div>
      {recommendation && !focusTopicId && (
        <div className="focus-suggestion">
          <span className="focus-symbol">
            <Lightbulb size={22} />
          </span>
          <div>
            <span className="eyebrow">FOCO RECOMENDADO</span>
            <strong>{recommendation.title}</strong>
            <small>
              {recommendation.discipline} ·{" "}
              {recommendation.total
                ? `${recommendation.accuracy}% de acertos`
                : "sem questões registradas"}{" "}
              · {recommendation.dueReviews} revisões pendentes
            </small>
          </div>
          <Button
            className="btn btn-primary"
            disabled={running || seconds > 0}
            onClick={() => {
              if (recommendedDiscipline) {
                setDisciplineId(String(recommendedDiscipline.id));
                setTopicId(String(recommendation.id));
              }
            }}
            type="button"
          >
            Selecionar foco <ArrowRight size={15} />
          </Button>
        </div>
      )}
      <div className="study-grid">
        <Panel
          title="Cronômetro de teoria"
          className="timer-panel"
          action={
            <span className={`timer-state ${running ? "is-running" : ""}`}>
              <span />{" "}
              {running
                ? "Em andamento"
                : seconds
                  ? "Pausado"
                  : "Pronto para começar"}
            </span>
          }
        >
          <div className="timer-content">
            <div className="timer-face">
              <div className="timer-icon">
                <Timer size={25} />
              </div>
              <div className="timer-digits">{fmtTimer(seconds)}</div>
              <div className="timer-caption">TEMPO LÍQUIDO</div>
            </div>
            <div className="timer-selects">
              <Field label="Disciplina">
                <NativeSelect
                  disabled={running || seconds > 0}
                  value={disciplineId}
                  onChange={(e) => {
                    setDisciplineId(e.target.value);
                    setTopicId("");
                  }}
                >
                  <option value="">Selecione a disciplina</option>
                  {data.disciplines.map((d) => (
                    <option value={d.id} key={d.id}>
                      {d.name}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Assunto (opcional)">
                <NativeSelect
                  disabled={running || seconds > 0}
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                >
                  <option value="">Estudo geral da disciplina</option>
                  {availableTopics.map((t) => (
                    <option value={t.id} key={t.id}>
                      {t.title}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <div className="timer-actions">
              {!running ? (
                <PrimaryButton
                  disabled={!disciplineId}
                  onClick={() => setRunning(true)}
                >
                  <Play size={17} fill="currentColor" />{" "}
                  {seconds ? "Continuar" : "Iniciar foco"}
                </PrimaryButton>
              ) : (
                <Button
                  className="btn btn-warning"
                  onClick={pause}
                  type="button"
                >
                  <Pause size={17} fill="currentColor" /> Pausar
                </Button>
              )}
              <SubtleButton disabled={!seconds && !running} onClick={reset}>
                <RotateCcw size={17} /> Zerar
              </SubtleButton>
            </div>
            {seconds > 0 && (
              <Button
                className="timer-save"
                disabled={working}
                onClick={save}
                type="button"
              >
                <Square size={16} /> Finalizar e registrar {fmtHours(seconds)}{" "}
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </Panel>
        <Panel
          title="Esta semana"
          action={<Clock3 size={19} className="muted-icon" />}
        >
          <div className="hours-summary">
            <span>TOTAL DA SEMANA</span>
            <strong>{fmtHours(data.dashboard?.weeklySeconds || 0)}</strong>
            <p>
              de {fmtHours((data.plan?.weeklyGoalMinutes || 0) * 60)} planejados
            </p>
          </div>
          <ProgressBar
            value={
              data.plan?.weeklyGoalMinutes
                ? (100 * (data.dashboard?.weeklySeconds || 0)) /
                  (data.plan.weeklyGoalMinutes * 60)
                : 0
            }
            color="#5776f7"
            height={8}
          />
          <div className="time-split compact">
            <span>
              <i className="time-dot theory" />
              Teoria <b>{fmtHours(data.dashboard?.weeklyTheorySeconds || 0)}</b>
            </span>
            <span>
              <i className="time-dot questions" />
              Questões{" "}
              <b>{fmtHours(data.dashboard?.weeklyQuestionSeconds || 0)}</b>
            </span>
          </div>
          <div className="daily-mini-bars">
            {(data.dashboard?.dailyHours || []).map((day) => (
              <div key={day.date} className="daily-mini">
                <span>{day.date.slice(8, 10)}</span>
                <div>
                  <div
                    style={{
                      height: `${Math.max(day.seconds ? 5 : 0, Math.min(100, (day.seconds / 14400) * 100))}%`,
                    }}
                  />
                </div>
                <small>
                  {day.seconds
                    ? `${(day.seconds / 3600).toFixed(1).replace(".", ",")}h`
                    : "—"}
                </small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <details className="ux-collapsible ux-cycle-order">
        <summary>Organizar ciclo de matérias</summary>
        <div className="ux-collapsible-body">
          <Panel
            title="Ciclo de matérias"
            action={
              <Button
                className="text-link"
                onClick={() => setShowReorder(true)}
                type="button"
              >
                <ListOrdered size={16} /> Reordenar ciclo
              </Button>
            }
          >
            <div className="cycle-cards">
              {data.disciplines.map((d, i) => (
                <Button
                  key={d.id}
                  onClick={() => {
                    if (!running && seconds === 0) {
                      setDisciplineId(String(d.id));
                      setTopicId("");
                    }
                  }}
                  className={`cycle-card ${String(d.id) === String(disciplineId) ? "active" : ""}`}
                  type="button"
                >
                  <span className="cycle-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="cycle-card-dot"
                    style={{
                      background: d.color,
                    }}
                  />
                  <strong>{d.name}</strong>
                  {d.id === nextId && (
                    <span className="cycle-next-label">A SEGUIR</span>
                  )}
                </Button>
              ))}
            </div>
          </Panel>
        </div>
      </details>
      <Panel
        title="Sessões registradas"
        action={<span className="small-chip">{history.length} sessões</span>}
      >
        {history.length ? (
          <div className="table-scroll">
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
                {history.map((s) => (
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
          </div>
        ) : (
          <Empty
            title="Sua primeira sessão começa aqui"
            description="Inicie o cronômetro e registre sua primeira sessão de foco."
            icon={Timer}
          />
        )}
      </Panel>
      {concludeTopic && (
        <AssimilationPicker
          title={
            concludeTopic.theoryDone
              ? "Atualizar assimilação?"
              : "Terminou a teoria deste assunto?"
          }
          subject={concludeTopic.title}
          working={working}
          submitLabel={
            concludeTopic.theoryDone
              ? "Reagendar revisão"
              : "Marcar teoria concluída"
          }
          onClose={() => setConcludeTopic(null)}
          onConfirm={(level) =>
            concludeTopic.theoryDone
              ? action(
                  `topics/${concludeTopic.id}/assimilate`,
                  "POST",
                  {
                    level,
                  },
                  "Revisão reprogramada.",
                )
              : action(
                  `topics/${concludeTopic.id}`,
                  "PUT",
                  {
                    disciplineId: concludeTopic.discipline.id,
                    title: concludeTopic.title,
                    status: concludeTopic.status,
                    mastery: concludeTopic.mastery,
                    importance: concludeTopic.importance || 3,
                    summaryDone: concludeTopic.summaryDone,
                    theoryDone: true,
                    assimilationLevel: level,
                  },
                  "Teoria concluída. Revisão agendada.",
                )
          }
        />
      )}
      {showReorder && (
        <Modal
          title="Reordenar o ciclo"
          subtitle="Escolha a ordem em que as disciplinas entram na fila."
          onClose={() => setShowReorder(false)}
        >
          <div className="form-stack">
            <div className="reorder-list">
              {cycleOrder.map((id, i) => {
                const item = data.disciplines.find((d) => d.id === id);
                return (
                  <div className="reorder-item" key={id}>
                    <span className="reorder-number">{i + 1}</span>
                    <span
                      className="discipline-dot"
                      style={{
                        background: item?.color,
                      }}
                    />
                    <strong>{item?.name}</strong>
                    <div>
                      <Button
                        className="icon-button"
                        disabled={i === 0}
                        onClick={() => moveCycle(i, -1)}
                        aria-label={`Subir ${item?.name}`}
                        type="button"
                      >
                        <ArrowUp size={16} />
                      </Button>
                      <Button
                        className="icon-button"
                        disabled={i === cycleOrder.length - 1}
                        onClick={() => moveCycle(i, 1)}
                        aria-label={`Descer ${item?.name}`}
                        type="button"
                      >
                        <ArrowDown size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal-actions">
              <SubtleButton onClick={() => setShowReorder(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton
                loading={working}
                onClick={async () => {
                  if (
                    await action(
                      "disciplines/reorder",
                      "PUT",
                      cycleOrder,
                      "Ordem do ciclo atualizada!",
                    )
                  )
                    setShowReorder(false);
                }}
              >
                Salvar ordem
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
      {showManual && (
        <Modal
          title="Registrar tempo manualmente"
          subtitle="Para quando você estudou sem usar o cronômetro."
          onClose={() => setShowManual(false)}
        >
          <form className="form-stack" onSubmit={saveManual}>
            <Field label="Disciplina">
              <NativeSelect
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
              </NativeSelect>
            </Field>
            <Field label="Assunto (opcional)">
              <NativeSelect
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
              </NativeSelect>
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
    </div>
  );
}
