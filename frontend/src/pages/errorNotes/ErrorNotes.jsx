import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { FlashcardDeck } from "./components/FlashcardDeck.jsx";
import { Input, NativeSelect } from "../../shared/components/FormControls.jsx";
import { Button, TextareaAutosize } from "@mui/material";
import {
  NotebookPen,
  Plus,
  AlertTriangle,
  BookOpenText,
  CircleCheck,
  Search,
  Expand,
  Camera,
  RotateCcw,
} from "lucide-react";
import {
  Panel,
  Modal,
  Field,
  PrimaryButton,
  SubtleButton,
  Empty,
  TopicSelect,
  DeleteButton,
} from "../../shared/components/UI.jsx";
import { fileUrl } from "../../shared/services/api.js";
import { dateBR } from "../../shared/utils/utils.js";
import { ScreenshotInput } from "./components/ScreenshotInput.jsx";
import { useErrorNotes } from "./hooks/useErrorNotes.jsx";
export default function ErrorNotes({ data, action, working }) {
  const [view, setView] = useState("notes");
  const {
    open,
    setOpen,
    form,
    setForm,
    zoom,
    setZoom,
    search,
    setSearch,
    discipline,
    setDiscipline,
    topic,
    setTopic,
    recurring,
    setRecurring,
    photo,
    setPhoto,
    from,
    setFrom,
    to,
    setTo,
    order,
    setOrder,
    notes,
    allowedTopics,
    visible,
    reset,
    save,
    recurringCount,
    withPhotos,
  } = useErrorNotes({
    data,
    action,
    working,
  });
  return (
    <div className="view-stack">
      <div className="section-toolbar">
        <span className="toolbar-info">
          <NotebookPen size={19} /> Seus erros registrados
        </span>
        <div className="toolbar-buttons">
          <PrimaryButton onClick={() => setOpen(true)}>
            <Plus size={18} /> Anotar erro
          </PrimaryButton>
        </div>
      </div>

      <Tabs
        value={view}
        onChange={(_, value) => setView(value)}
        aria-label="Modo do caderno de erros"
      >
        <Tab value="notes" label="Anotações" />
        <Tab value="flashcards" label="Flashcards" />
      </Tabs>
      {view === "flashcards" && <FlashcardDeck key={notes.length} />}
      <div hidden={view !== "notes"}>
        <Panel title="Encontrar anotação">
          <div className="filter-workspace">
            <label className="filter-item filter-search">
              <span>Buscar</span>
              <div className="search-wrap">
                <Search size={17} />
                <Input
                  type="search"
                  placeholder="Pegadinha, resposta, fonte, assunto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </label>
            <label className="filter-item">
              <span>Disciplina</span>
              <NativeSelect
                value={discipline}
                onChange={(e) => {
                  setDiscipline(e.target.value);
                  setTopic("all");
                }}
              >
                <option value="all">Todas as disciplinas</option>
                {data.disciplines.map((d) => (
                  <option key={d.id} value={String(d.id)}>
                    {d.name}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <label className="filter-item">
              <span>Assunto</span>
              <NativeSelect
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="all">Todos os assuntos</option>
                {allowedTopics.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.title}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <details className="ux-more-filters">
              <summary>Mais filtros</summary>
              <div className="ux-extra-filter-grid">
                <label className="filter-item">
                  <span>Recorrência</span>
                  <NativeSelect
                    value={recurring}
                    onChange={(e) => setRecurring(e.target.value)}
                  >
                    <option value="all">Todos os erros</option>
                    <option value="true">Errei mais de uma vez</option>
                    <option value="false">Não recorrentes</option>
                  </NativeSelect>
                </label>
                <label className="filter-item">
                  <span>Capturas anexadas</span>
                  <NativeSelect
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  >
                    <option value="all">Com ou sem prints</option>
                    <option value="both">Questão e resposta</option>
                    <option value="some">Pelo menos um print</option>
                    <option value="missing">Falta algum print</option>
                  </NativeSelect>
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
                  <span>Ordenação</span>
                  <NativeSelect
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="oldest">Mais antigos</option>
                    <option value="topic">Por assunto</option>
                  </NativeSelect>
                </label>
              </div>
            </details>
          </div>
          <div className="filter-foot">
            <span>
              <strong>{visible.length}</strong> de {notes.length} anotações
              encontradas
            </span>
            <Button type="button" className="btn btn-subtle" onClick={reset}>
              <RotateCcw size={15} /> Limpar filtros
            </Button>
          </div>
        </Panel>
        <div className="mini-metric-grid">
          <div className="mini-metric">
            <div className="mini-icon blue">
              <NotebookPen size={21} />
            </div>
            <span>ERROS FILTRADOS</span>
            <strong>{visible.length}</strong>
            <small>Registros no caderno</small>
          </div>
          <div className="mini-metric">
            <div className="mini-icon purple">
              <AlertTriangle size={21} />
            </div>
            <span>RECORRENTES</span>
            <strong>{recurringCount}</strong>
            <small>Erros repetidos</small>
          </div>
          <div className="mini-metric">
            <div className="mini-icon teal">
              <Camera size={21} />
            </div>
            <span>COM PRINTS</span>
            <strong>{withPhotos}</strong>
            <small>Com captura anexada</small>
          </div>
        </div>
        <Panel
          title="Minhas anotações"
          action={
            <span className="small-chip">{visible.length} anotações</span>
          }
        >
          {visible.length ? (
            <div className="note-grid">
              {visible.map((n) => (
                <article className="note-card" key={n.id}>
                  <div className="note-card-top">
                    <span className="note-topic">
                      <BookOpenText size={15} />
                      {n.topic.title}
                    </span>
                    <DeleteButton
                      onClick={() => {
                        if (window.confirm("Excluir esta anotação?"))
                          action(
                            `error-notes/${n.id}`,
                            "DELETE",
                            undefined,
                            "Anotação excluída.",
                          );
                      }}
                    />
                  </div>
                  <div className="note-source">
                    <span>{n.source}</span>
                    <small>
                      {n.topic.discipline.name} · {dateBR(n.createdAt)}
                    </small>
                  </div>
                  {n.recurring && (
                    <span className="repeat-alert">
                      <AlertTriangle size={13} /> Erro recorrente
                    </span>
                  )}
                  {(n.questionImageId || n.answerImageId) && (
                    <div className="error-screenshots">
                      {[
                        ["Questão", n.questionImageId],
                        ["Resposta", n.answerImageId],
                      ]
                        .filter(([, id]) => id)
                        .map(([label, id]) => (
                          <Button
                            key={label}
                            onClick={() =>
                              setZoom({
                                label,
                                id,
                              })
                            }
                            title={`Ampliar print: ${label}`}
                            type="button"
                          >
                            <img
                              src={fileUrl(id)}
                              alt={`Print da ${label.toLowerCase()}`}
                            />
                            <span>
                              {label} <Expand size={13} />
                            </span>
                          </Button>
                        ))}
                    </div>
                  )}
                  <div className="note-block">
                    <span>POR QUE ERREI?</span>
                    <p>{n.trap}</p>
                  </div>
                  <div className="note-block correct-block">
                    <span>
                      <CircleCheck size={14} /> COMO RESOLVER
                    </span>
                    <p>{n.correctAnswer}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <Empty
              icon={NotebookPen}
              title="Nenhum erro para estes filtros"
              description="Ajuste os filtros ou registre um novo erro."
            />
          )}
        </Panel>
      </div>
      {open && (
        <Modal
          title="Registrar erro"
          subtitle="Você pode enviar dois prints diferentes: enunciado e gabarito."
          wide
          onClose={() => setOpen(false)}
        >
          <form className="form-stack" onSubmit={save}>
            <Field label="Assunto">
              <TopicSelect
                topics={data.topics}
                value={form.topicId}
                onChange={(v) =>
                  setForm({
                    ...form,
                    topicId: v,
                  })
                }
              />
            </Field>
            <Field label="Fonte da questão">
              <Input
                required
                maxLength="220"
                placeholder="Ex.: Cesgranrio — Questão 32"
                value={form.source}
                onChange={(e) =>
                  setForm({
                    ...form,
                    source: e.target.value,
                  })
                }
              />
            </Field>
            <div className="screenshot-pair">
              <ScreenshotInput
                label="Print da questão"
                id={form.questionImageId}
                onChange={(id) =>
                  setForm((f) => ({
                    ...f,
                    questionImageId: id,
                  }))
                }
                disabled={working}
              />
              <ScreenshotInput
                label="Print da resposta"
                id={form.answerImageId}
                onChange={(id) =>
                  setForm((f) => ({
                    ...f,
                    answerImageId: id,
                  }))
                }
                disabled={working}
              />
            </div>
            <Field label="Qual foi a pegadinha? Por que errei?">
              <TextareaAutosize
                required
                minRows="3"
                maxLength="20000"
                value={form.trap}
                onChange={(e) =>
                  setForm({
                    ...form,
                    trap: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Qual é o raciocínio correto?">
              <TextareaAutosize
                required
                minRows="3"
                maxLength="20000"
                value={form.correctAnswer}
                onChange={(e) =>
                  setForm({
                    ...form,
                    correctAnswer: e.target.value,
                  })
                }
              />
            </Field>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.recurring}
                onChange={(e) =>
                  setForm({
                    ...form,
                    recurring: e.target.checked,
                  })
                }
              />{" "}
              Já errei isso mais de uma vez
            </label>
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setOpen(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Salvar no caderno
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
      {zoom && (
        <Modal
          title={`Print da ${zoom.label.toLowerCase()}`}
          wide
          onClose={() => setZoom(null)}
        >
          <div className="screenshot-lightbox">
            <img
              src={fileUrl(zoom.id)}
              alt={`Captura de tela: ${zoom.label}`}
            />
            <a className="btn btn-subtle" href={fileUrl(zoom.id, true)}>
              Baixar imagem
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
