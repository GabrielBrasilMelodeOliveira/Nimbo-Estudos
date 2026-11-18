import { Typography, Stack, TextField, MenuItem } from "@mui/material";
import { AgendaDay } from "./sections/AgendaDay.jsx";
import { WeekBoard } from "./sections/WeekBoard.jsx";
import AssimilationPicker from "../../shared/components/AssimilationPicker.jsx";
import {
  Input,
  SearchableSelect,
} from "../../shared/components/FormControls.jsx";
import { Button, TextareaAutosize } from "@mui/material";
import {
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Lightbulb,
} from "lucide-react";
import { Modal, Field } from "../../shared/components/UI.jsx";
import { TODAY, dateBR, fmtHours } from "../../shared/utils/utils.js";
import { parseDate } from "../../shared/utils/plannerMetrics.js";
import {
  CATEGORIES,
  WD,
  dateLabel,
  goalInitial,
} from "./utils/pageDefinitions.jsx";
import { GoalStat } from "./components/GoalStat.jsx";
import { useWeeklyPlanner } from "./hooks/useWeeklyPlanner.jsx";
export default function WeeklyPlanner({ data, action, working, navigate }) {
  const {
    mode,
    setMode,
    anchor,
    setAnchor,
    area,
    setArea,
    selectedDay,
    setSelectedDay,
    editor,
    setEditor,
    form,
    setForm,
    goalOpen,
    setGoalOpen,
    goalForm,
    setGoalForm,
    suggestionsOpen,
    setSuggestionsOpen,
    week,
    month,
    start,
    end,
    periodType,
    dates,
    gridDates,
    metrics,
    savedGoal,
    targetMinutes,
    targetQuestions,
    targetTopics,
    suggestions,
    activityForDay,
    reviewsForDay,
    doneReviewsForDay,
    actualForDay,
    openAdd,
    openEdit,
    toPayload,
    save,
    toggle,
    remove,
    shift,
    chooseView,
    saveGoal,
    applySuggestion,
    navigateBlock,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    moveActivity,
    dropActivity,
    reviewToComplete,
    setReviewToComplete,
  } = useWeeklyPlanner({
    data,
    action,
    working,
    navigate,
  });
  const dayContent = (day) => (
    <AgendaDay
      day={day}
      search={search}
      showRecorded={
        statusFilter !== "PENDING" && (area === "ALL" || area === "STUDY")
      }
      data={data}
      items={activityForDay(day)}
      reviews={statusFilter === "DONE" ? [] : reviewsForDay(day)}
      finishedReviews={doneReviewsForDay(day)}
      working={working}
      dates={dates}
      onComplete={toggle}
      onEdit={openEdit}
      onStart={navigateBlock}
      onMove={moveActivity}
      onReview={setReviewToComplete}
    />
  );
  return (
    <div className="n55-planner view-stack">
      <div className="n55-toolbar">
        <div
          className="n55-calendar-switch"
          role="group"
          aria-label="Visualização"
        >
          <Button
            className={mode === "week" ? "selected" : ""}
            onClick={() => chooseView("week")}
            type="button"
          >
            <CalendarRange size={17} /> Semana
          </Button>
          <Button
            className={mode === "month" ? "selected" : ""}
            onClick={() => chooseView("month")}
            type="button"
          >
            <CalendarDays size={17} /> Mês
          </Button>
        </div>
        <div className="n55-toolbar-actions">
          <Button
            className="btn btn-subtle"
            onClick={() => setSuggestionsOpen((x) => !x)}
            type="button"
          >
            <Lightbulb size={16} /> Sugestões
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => openAdd()}
            type="button"
          >
            <Plus size={17} /> Nova atividade
          </Button>
        </div>
      </div>
      <section
        className="n55-summary"
        aria-label="Metas e resultados do período"
      >
        <GoalStat
          label="Horas estudadas"
          actual={+(metrics.seconds / 3600).toFixed(1)}
          target={+(targetMinutes / 60).toFixed(1)}
          unit="h"
          onClick={() => {
            setGoalForm(goalInitial(data, periodType, start));
            setGoalOpen(true);
          }}
        />
        <GoalStat
          label="Questões resolvidas"
          actual={metrics.questions}
          target={targetQuestions}
          onClick={() => {
            setGoalForm(goalInitial(data, periodType, start));
            setGoalOpen(true);
          }}
        />
        <GoalStat
          label="Assuntos estudados"
          actual={metrics.studiedTopics}
          target={targetTopics}
          onClick={() => {
            setGoalForm(goalInitial(data, periodType, start));
            setGoalOpen(true);
          }}
        />
        <div className="n55-goal-stat n55-static">
          <span>Revisões realizadas</span>
          <strong>{metrics.reviewDone}</strong>
          <small>{metrics.reviewDue} agendadas no período</small>
        </div>
      </section>
      <div className="n55-metrics-detail">
        <span>
          <b>Teoria</b> {fmtHours(metrics.theorySeconds)}
        </span>
        <span>
          <b>Questões</b> {fmtHours(metrics.questionSeconds)}
        </span>
        <span>
          <b>Estudos planejados</b> {metrics.completedBlocks}/
          {metrics.plannedBlocks} metas atingidas
        </span>
        <Button
          className="text-link"
          onClick={() => {
            setGoalForm(goalInitial(data, periodType, start));
            setGoalOpen(true);
          }}
          type="button"
        >
          Editar metas
        </Button>
      </div>
      {suggestionsOpen && (
        <section className="n55-suggestions">
          <div className="n55-subhead">
            <strong>Próximos estudos sugeridos</strong>
            <Button
              className="btn btn-subtle"
              onClick={() => setSuggestionsOpen(false)}
              type="button"
            >
              Fechar
            </Button>
          </div>
          {suggestions.length ? (
            suggestions.map((p) => (
              <div
                className="n55-suggestion"
                key={`${p.topicId}-${p.scheduledDate}`}
              >
                <div>
                  <strong>{p.title}</strong>
                  <small>
                    {dateBR(p.scheduledDate)} ·{" "}
                    {p.studyKind === "QUESTIONS" ? "Questões" : "Teoria"} ·{" "}
                    {p.durationMinutes} min
                  </small>
                </div>
                <Button
                  className="btn btn-subtle"
                  disabled={working}
                  onClick={() => applySuggestion(p)}
                  type="button"
                >
                  Adicionar
                </Button>
              </div>
            ))
          ) : (
            <p>Nenhuma sugestão disponível para esta semana.</p>
          )}
          <small>As sugestões não são incluídas sem sua confirmação.</small>
        </section>
      )}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          size="small"
          label="Buscar atividade"
          sx={{ flex: 1, minWidth: 0 }}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <SearchableSelect
          size="small"
          label="Situação"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          sx={{ width: { xs: "100%", md: 240 }, flexShrink: 0 }}
        >
          <MenuItem value="ALL">Todas</MenuItem>
          <MenuItem value="PENDING">Pendentes</MenuItem>
          <MenuItem value="DONE">Concluídas</MenuItem>
        </SearchableSelect>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Arraste as atividades pendentes pela alça para outro dia ou use o botão
        Mover. Role o quadro para ver os demais dias.
      </Typography>
      <section className="n55-calendar">
        <div className="n55-calendar-head">
          <div className="n55-date-nav">
            <Button
              className="icon-button"
              onClick={() => shift(-1)}
              aria-label="Período anterior"
              type="button"
            >
              <ChevronLeft size={19} />
            </Button>
            <strong>
              {mode === "week"
                ? `${dateBR(start)} — ${dateBR(end)}`
                : dateLabel(start)}
            </strong>
            <Button
              className="icon-button"
              onClick={() => shift(1)}
              aria-label="Próximo período"
              type="button"
            >
              <ChevronRight size={19} />
            </Button>
            <Button
              className="btn btn-subtle"
              onClick={() => setAnchor(TODAY())}
              type="button"
            >
              Hoje
            </Button>
          </div>
          <label className="n55-area">
            Área{" "}
            <SearchableSelect
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="ALL">Todas</option>
              {Object.entries(CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </SearchableSelect>
          </label>
        </div>
        {mode === "month" ? (
          <div className="n55-month-scroll">
            <div className="n55-month-grid">
              {WD.map((d) => (
                <div key={d} className="n55-weekday">
                  {d}
                </div>
              ))}
              {gridDates.map((day) => {
                const scheduled = activityForDay(day),
                  revs = reviewsForDay(day),
                  count = scheduled.length + revs.length;
                const actual = actualForDay(day);
                return (
                  <Button
                    type="button"
                    key={day}
                    className={`n55-month-day ${day.startsWith(start.slice(0, 7)) ? "" : "outside"} ${day === TODAY() ? "today" : ""}`}
                    onClick={() => setSelectedDay(day)}
                    title={`Abrir ${dateBR(day)}`}
                  >
                    <span className="n55-month-top">
                      <strong>{parseDate(day).getDate()}</strong>
                      {count > 0 && <small>{count} itens</small>}
                    </span>
                    <span className="n55-month-text">
                      {scheduled.slice(0, 1).map((i) => (
                        <span key={i.id}>{i.title}</span>
                      ))}
                      {revs.length > 0 && (
                        <span>↻ {revs.length} revisão(ões)</span>
                      )}
                      {actual.seconds > 0 && (
                        <span>◷ {fmtHours(actual.seconds)}</span>
                      )}
                      {actual.questions > 0 && (
                        <span>{actual.questions} questões</span>
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <WeekBoard
            dates={dates}
            working={working}
            itemsForDay={activityForDay}
            renderDay={dayContent}
            onDrop={dropActivity}
            onAdd={openAdd}
          />
        )}
      </section>
      {selectedDay && (
        <Modal title={dateBR(selectedDay)} onClose={() => setSelectedDay(null)}>
          <div className="n55-day-dialog">
            <Button
              className="btn btn-primary"
              onClick={() => openAdd(selectedDay, true)}
              type="button"
            >
              <Plus size={16} /> Adicionar estudo ou atividade
            </Button>
            {dayContent(selectedDay)}
            {!activityForDay(selectedDay).length &&
              !reviewsForDay(selectedDay).length && (
                <p>Nenhum compromisso planejado.</p>
              )}
          </div>
        </Modal>
      )}
      {editor && (
        <Modal
          title={editor === "create" ? "Nova atividade" : "Editar atividade"}
          onClose={() => setEditor(null)}
        >
          <form onSubmit={save} className="form-stack n55-editor">
            <Field label="Área">
              <SearchableSelect
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                    topicId: "",
                    studyKind: "THEORY",
                  })
                }
              >
                {Object.entries(CATEGORIES).map(([key, item]) => (
                  <option value={key} key={key}>
                    {item.name}
                  </option>
                ))}
              </SearchableSelect>
            </Field>
            {form.category === "STUDY" && (
              <>
                <Field label="Assunto (vincula automaticamente às métricas)">
                  <SearchableSelect
                    value={form.topicId || ""}
                    onChange={(e) => {
                      const t = data.topics.find(
                        (x) => String(x.id) === e.target.value,
                      );
                      setForm({
                        ...form,
                        topicId: e.target.value,
                        title: t?.title || form.title,
                      });
                    }}
                  >
                    <option value="">
                      Atividade livre (sem vínculo automático)
                    </option>
                    {data.topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.discipline.name} · {t.title}
                      </option>
                    ))}
                  </SearchableSelect>
                </Field>
                {form.topicId && (
                  <div className="form-grid">
                    <Field label="Tipo">
                      <SearchableSelect
                        value={form.studyKind || "THEORY"}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            studyKind: e.target.value,
                          })
                        }
                      >
                        <option value="THEORY">Teoria</option>
                        <option value="QUESTIONS">Questões</option>
                      </SearchableSelect>
                    </Field>
                    {form.studyKind === "QUESTIONS" && (
                      <Field label="Meta de questões">
                        <Input
                          type="number"
                          min="0"
                          max="3000"
                          value={form.targetQuestions || 0}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              targetQuestions: e.target.value,
                            })
                          }
                        />
                      </Field>
                    )}
                  </div>
                )}
              </>
            )}
            <Field label="Atividade">
              <Input
                required
                maxLength={180}
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Ex.: Estudar SQL"
              />
            </Field>
            <div className="form-grid">
              <Field label="Dia">
                <Input
                  required
                  type="date"
                  value={form.scheduledDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scheduledDate: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Horário (opcional)">
                <Input
                  type="time"
                  value={form.startTime || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startTime: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <div className="form-grid">
              <Field label="Minutos planejados">
                <Input
                  required
                  type="number"
                  min="0"
                  max="1440"
                  value={form.durationMinutes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      durationMinutes: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Prioridade">
                <SearchableSelect
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>Baixa</option>
                  <option value={2}>Normal</option>
                  <option value={3}>Alta</option>
                </SearchableSelect>
              </Field>
            </div>
            {!(form.category === "STUDY" && form.topicId) && (
              <label className="week-repeat-check">
                <input
                  type="checkbox"
                  checked={!!form.repeatWeekly}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      repeatWeekly: e.target.checked,
                    })
                  }
                />{" "}
                Repetir semanalmente após concluir
              </label>
            )}
            <details>
              <summary>Notas adicionais</summary>
              <Field label="Notas">
                <TextareaAutosize
                  maxLength="1200"
                  minRows={2}
                  value={form.notes || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                />
              </Field>
            </details>
            <div className="modal-actions">
              {editor === "edit" && (
                <Button
                  className="btn btn-subtle"
                  type="button"
                  onClick={remove}
                >
                  <Trash2 size={15} /> Excluir
                </Button>
              )}
              <Button
                type="button"
                className="btn btn-subtle"
                onClick={() => setEditor(null)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={working}
              >
                Salvar
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {goalOpen && goalForm && (
        <Modal
          title={`Metas ${mode === "week" ? "da semana" : "do mês"}`}
          onClose={() => setGoalOpen(false)}
        >
          <form className="form-stack" onSubmit={saveGoal}>
            <Field label="Horas de estudo (total)">
              <Input
                type="number"
                min="0"
                max="744"
                step="0.5"
                value={Number(goalForm.targetMinutes) / 60}
                onChange={(e) =>
                  setGoalForm({
                    ...goalForm,
                    targetMinutes: Math.round(Number(e.target.value) * 60),
                  })
                }
              />
            </Field>
            <Field label="Questões a resolver">
              <Input
                type="number"
                min="0"
                max="100000"
                value={goalForm.targetQuestions}
                onChange={(e) =>
                  setGoalForm({
                    ...goalForm,
                    targetQuestions: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Assuntos a estudar">
              <Input
                type="number"
                min="0"
                max="10000"
                value={goalForm.targetTopics}
                onChange={(e) =>
                  setGoalForm({
                    ...goalForm,
                    targetTopics: e.target.value,
                  })
                }
              />
            </Field>
            <small>
              Os realizados são calculados pelo cronômetro e registros de
              questões. Meta zero significa não definida.
            </small>
            <div className="modal-actions">
              <Button
                type="button"
                className="btn btn-subtle"
                onClick={() => setGoalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={working}
              >
                Salvar metas
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {reviewToComplete && (
        <AssimilationPicker
          subject={reviewToComplete.topic.title}
          working={working}
          onClose={() => setReviewToComplete(null)}
          onConfirm={(level) =>
            action(
              `reviews/${reviewToComplete.id}/complete`,
              "PATCH",
              { level },
              "Revisão concluída e reagendada.",
            )
          }
        />
      )}
    </div>
  );
}
