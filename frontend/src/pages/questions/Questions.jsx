import {
  Input,
  SearchableSelect,
} from "../../shared/components/FormControls.jsx";
import { Button, TextareaAutosize } from "@mui/material";
import {
  Plus,
  Target,
  Search,
  RotateCcw,
  Play,
  Pause,
  Check,
  Timer,
  Clock3,
} from "lucide-react";
import {
  Modal,
  Field,
  PrimaryButton,
  SubtleButton,
  Panel,
  TopicSelect,
  Empty,
  AccuracyTag,
  ProgressBar,
  DeleteButton,
} from "../../shared/components/UI.jsx";
import {
  percentage,
  fmtPercent,
  fmtHours,
  fmtTimer,
  dateBR,
} from "../../shared/utils/utils.js";
import { useQuestions } from "./hooks/useQuestions.jsx";
export default function Questions({ data, action, working, focusTopicId }) {
  const {
    open,
    setOpen,
    form,
    setForm,
    search,
    setSearch,
    discipline,
    setDiscipline,
    topic,
    setTopic,
    result,
    setResult,
    from,
    setFrom,
    to,
    setTo,
    order,
    setOrder,
    clock,
    setClock,
    now,
    setNow,
    running,
    seconds,
    pause,
    reset,
    start,
    openManual,
    finishFocus,
    submit,
    records,
    topicsForDiscipline,
    filtered,
    rows,
    total,
    correct,
    focusedSeconds,
    clearFilters,
  } = useQuestions({
    data,
    action,
    working,
    focusTopicId,
  });
  return (
    <div className="view-stack questions-page">
      <section
        className="question-focus-panel"
        aria-label="Cronômetro de questões"
      >
        <div className="question-focus-details">
          <div className="question-focus-title">
            <Timer size={19} />
            <h3>Foco em questões</h3>
            <span className={`timer-state ${running ? "is-running" : ""}`}>
              {running ? "Contando" : seconds ? "Pausado" : "Pronto"}
            </span>
          </div>
          <label className="question-topic-picker">
            <span>Assunto</span>
            <TopicSelect
              topics={data.topics || []}
              value={clock.topicId}
              disabled={running || seconds > 0}
              onChange={(v) =>
                setClock((c) => ({
                  ...c,
                  topicId: v,
                }))
              }
              placeholder="Escolha o assunto"
            />
          </label>
        </div>
        <div className="question-focus-clock">
          <output aria-live="off">{fmtTimer(seconds)}</output>
          <span>Tempo líquido</span>
        </div>
        <div className="question-focus-actions">
          {!running ? (
            <PrimaryButton
              disabled={!clock.topicId || seconds >= 86400 || working}
              onClick={start}
            >
              <Play size={16} /> {seconds ? "Continuar" : "Iniciar"}
            </PrimaryButton>
          ) : (
            <SubtleButton onClick={pause}>
              <Pause size={16} /> Pausar
            </SubtleButton>
          )}
          <PrimaryButton
            disabled={seconds < 1 || working}
            onClick={finishFocus}
          >
            <Check size={16} /> Registrar resultado
          </PrimaryButton>
          <Button
            className="icon-button question-reset"
            disabled={!seconds || working}
            title="Zerar cronômetro"
            aria-label="Zerar cronômetro"
            onClick={() => {
              if (window.confirm("Zerar o tempo atual sem salvar?")) reset();
            }}
            type="button"
          >
            <RotateCcw size={18} />
          </Button>
        </div>
      </section>
      <div className="section-toolbar">
        <span className="toolbar-info">
          <Target size={18} /> Questões registradas
        </span>
        <div className="toolbar-buttons">
          <SubtleButton onClick={openManual}>
            <Plus size={16} /> Registro manual
          </SubtleButton>
        </div>
      </div>
      <Panel title="Registros e filtros">
        <div className="filter-workspace">
          <label className="filter-item filter-search">
            <span>Buscar</span>
            <div className="search-wrap">
              <Search size={17} />
              <Input
                type="search"
                placeholder="Assunto ou disciplina"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </label>
          <label className="filter-item">
            <span>Disciplina</span>
            <SearchableSelect
              value={discipline}
              onChange={(e) => {
                setDiscipline(e.target.value);
                setTopic("all");
              }}
            >
              <option value="all">Todas</option>
              {data.disciplines.map((d) => (
                <option key={d.id} value={String(d.id)}>
                  {d.name}
                </option>
              ))}
            </SearchableSelect>
          </label>
          <label className="filter-item">
            <span>Assunto</span>
            <SearchableSelect
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="all">Todos</option>
              {topicsForDiscipline.map((t) => (
                <option key={t.id} value={String(t.id)}>
                  {t.title}
                </option>
              ))}
            </SearchableSelect>
          </label>
          <details className="ux-more-filters">
            <summary>Mais filtros: acertos, datas e ordem</summary>
            <div className="ux-extra-filter-grid">
              <label className="filter-item">
                <span>Acertos</span>
                <SearchableSelect
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="weak">Abaixo de 60%</option>
                  <option value="medium">60–79%</option>
                  <option value="strong">80% ou mais</option>
                  <option value="errors">Com erros</option>
                </SearchableSelect>
              </label>
              <label className="filter-item">
                <span>De</span>
                <Input
                  type="date"
                  value={from}
                  max={to || undefined}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>
              <label className="filter-item">
                <span>Até</span>
                <Input
                  type="date"
                  value={to}
                  min={from || undefined}
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
              <label className="filter-item">
                <span>Ordenar</span>
                <SearchableSelect
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="recent">Recentes</option>
                  <option value="oldest">Antigos</option>
                  <option value="errors">Mais erros</option>
                  <option value="accuracy">Menor acerto</option>
                </SearchableSelect>
              </label>
            </div>
          </details>
        </div>
        <div className="filter-foot">
          <span>{filtered.length} registros</span>
          <Button
            type="button"
            className="btn btn-subtle"
            onClick={clearFilters}
          >
            <RotateCcw size={14} /> Limpar
          </Button>
        </div>
      </Panel>
      <div className="question-stat-grid">
        <div>
          <span>Questões</span>
          <strong>{total.toLocaleString("pt-BR")}</strong>
        </div>
        <div>
          <span>Acertos / erros</span>
          <strong>
            {correct.toLocaleString("pt-BR")}{" "}
            <em>/ {(total - correct).toLocaleString("pt-BR")}</em>
          </strong>
        </div>
        <div>
          <span>Aproveitamento</span>
          <strong>
            {total ? fmtPercent(percentage(correct, total)) : "—"}
          </strong>
        </div>
        <div>
          <span>Tempo em questões</span>
          <strong>{fmtHours(focusedSeconds)}</strong>
        </div>
      </div>
      <Panel
        title="Por assunto"
        action={<span className="small-chip">{rows.length} assuntos</span>}
      >
        {rows.length ? (
          <div className="topic-performance-list">
            {rows.map((t) => (
              <div className="performance-row" key={t.id}>
                <div className="performance-info">
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.discipline.name}</span>
                  </div>
                </div>
                <div className="performance-counts">
                  <span>
                    <b>{t.correct}</b> acertos
                  </span>
                  <span>
                    <b>{t.total - t.correct}</b> erros
                  </span>
                </div>
                <div className="performance-bar">
                  <ProgressBar
                    value={percentage(t.correct, t.total)}
                    color={
                      percentage(t.correct, t.total) >= 80
                        ? "#24ad90"
                        : percentage(t.correct, t.total) >= 60
                          ? "#efa83e"
                          : "#ee6d7e"
                    }
                  />
                </div>
                <AccuracyTag correct={t.correct} total={t.total} />
              </div>
            ))}
          </div>
        ) : (
          <Empty
            title="Nenhuma questão encontrada"
            description="Registre o resultado de uma sessão."
            icon={Target}
          />
        )}
      </Panel>
      <Panel title="Histórico">
        {filtered.length ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>DATA</th>
                  <th>ASSUNTO</th>
                  <th>TOTAL</th>
                  <th>ACERTOS</th>
                  <th>ERROS</th>
                  <th>TEMPO</th>
                  <th>ACERTO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="table-muted">{dateBR(r.date)}</td>
                    <td>
                      <div className="table-cell-main">
                        <strong>{r.topic.title}</strong>
                        <small>{r.topic.discipline.name}</small>
                        {r.notes && <small>{r.notes}</small>}
                      </div>
                    </td>
                    <td>{r.total}</td>
                    <td>{r.correct}</td>
                    <td>{r.total - r.correct}</td>
                    <td>
                      {r.focusDurationSeconds
                        ? fmtHours(r.focusDurationSeconds)
                        : "—"}
                    </td>
                    <td>
                      <AccuracyTag correct={r.correct} total={r.total} />
                    </td>
                    <td>
                      <DeleteButton
                        onClick={() => {
                          if (window.confirm("Excluir este registro?"))
                            action(
                              `questions/${r.id}`,
                              "DELETE",
                              undefined,
                              "Registro excluído.",
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
            title="Sem registros"
            description="Altere os filtros ou comece uma sessão."
          />
        )}
      </Panel>
      {open && (
        <Modal title="Registrar resultado" onClose={() => setOpen(false)}>
          <form className="form-stack" onSubmit={submit}>
            <Field label="Assunto">
              <TopicSelect
                topics={data.topics}
                disabled={form.durationSeconds > 0}
                value={form.topicId}
                onChange={(v) =>
                  setForm({
                    ...form,
                    topicId: v,
                  })
                }
              />
            </Field>
            {form.durationSeconds > 0 ? (
              <div className="question-record-time">
                <Clock3 size={17} /> Tempo em questões{" "}
                <strong>{fmtTimer(form.durationSeconds)}</strong>
              </div>
            ) : (
              <Field label="Tempo gasto (minutos, opcional)">
                <Input
                  type="number"
                  min="0"
                  max="1440"
                  step="1"
                  value={form.manualMinutes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      manualMinutes: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </Field>
            )}
            <div className="form-grid">
              <Field label="Questões resolvidas">
                <Input
                  required
                  type="number"
                  min="1"
                  max="100000"
                  value={form.total}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      total: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Acertos">
                <Input
                  required
                  type="number"
                  min="0"
                  max={form.total}
                  value={form.correct}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      correct: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Data">
              <Input
                type="date"
                required
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Observação (opcional)">
              <TextareaAutosize
                minRows="2"
                maxLength="400"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
              />
            </Field>
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setOpen(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Salvar
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
