import { Button, Input, NativeSelect } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import {
  Target,
  Clock3,
  ChartNoAxesCombined,
  BookOpenText,
  Search,
  SlidersHorizontal,
  Edit3,
  ArrowRight,
} from "lucide-react";
import {
  Panel,
  Modal,
  PrimaryButton,
  SubtleButton,
  ProgressBar,
  MasteryPill,
  StatusPill,
  Empty,
} from "../../shared/components/UI.jsx";
import { fmtHours, dateBR } from "../../shared/utils/utils.js";
import { fmt } from "./utils/pageDefinitions.jsx";
import { Priority } from "./components/Priority.jsx";
import { Ratings } from "./components/Ratings.jsx";
import { useAnalytics } from "./hooks/useAnalytics.jsx";
export default function Analytics({ data, action, working, navigate }) {
  const {
    analysis,
    search,
    setSearch,
    disc,
    setDisc,
    status,
    setStatus,
    mastery,
    setMastery,
    order,
    setOrder,
    editing,
    setEditing,
    tuning,
    setTuning,
    topicEditing,
    setTopicEditing,
    topicImportance,
    setTopicImportance,
    selected,
    setSelected,
    filtered,
    saveTuning,
    saveTopic,
    selectRow,
    allTopics,
    statusDistribution,
    priorityDistribution,
  } = useAnalytics({
    data,
    action,
    working,
    navigate,
  });
  return (
    <div className="view-stack analytics-page">
      <div className="analytics-intro">
        <div>
          <span className="ux-muted-intro">Entenda seus pontos de atenção</span>
        </div>
        <Button
          className="btn btn-subtle"
          onClick={() => navigate("cycle")}
          type="button"
        >
          Ir para o cronômetro <ArrowRight size={16} />
        </Button>
      </div>
      <div className="analytics-kpis">
        <div>
          <BookOpenText size={21} />
          <span>Assuntos acompanhados</span>
          <strong>{fmt(analysis.totalTopics)}</strong>
          <small>{fmt(analysis.completedTopics)} concluídos</small>
        </div>
        <div>
          <Target size={21} />
          <span>Questões resolvidas</span>
          <strong>{fmt(analysis.totalQuestions)}</strong>
          <small>
            {analysis.totalQuestions
              ? `${analysis.accuracy}% de acertos`
              : "Sem registros ainda"}
          </small>
        </div>
        <div>
          <Clock3 size={21} />
          <span>Tempo líquido</span>
          <strong>{fmtHours(analysis.totalSeconds || 0)}</strong>
          <small>
            Teoria {fmtHours(analysis.totalTheorySeconds || 0)} · Questões{" "}
            {fmtHours(analysis.totalQuestionSeconds || 0)}
          </small>
        </div>
        <div>
          <ChartNoAxesCombined size={21} />
          <span>Revisões pendentes</span>
          <strong>{fmt(analysis.dueReviews)}</strong>
          <small>Até hoje</small>
        </div>
      </div>
      <details className="ux-collapsible ux-analytics-charts">
        <summary>Gráficos de cobertura e prioridades</summary>
        <div className="ux-collapsible-body">
          {" "}
          <div className="analytics-chart-pair">
            <Panel title="Cobertura do edital">
              <BarChart
                height={240}
                layout="horizontal"
                yAxis={[
                  {
                    scaleType: "band",
                    data: statusDistribution.map((item) => item.name),
                  },
                ]}
                series={[
                  {
                    data: statusDistribution.map((item) => item.n),
                    label: "Assuntos",
                  },
                ]}
              />
            </Panel>
            <Panel title="Prioridades">
              <BarChart
                height={240}
                layout="horizontal"
                yAxis={[
                  {
                    scaleType: "band",
                    data: priorityDistribution.map((item) => item.name),
                  },
                ]}
                series={[
                  {
                    data: priorityDistribution.map((item) => item.n),
                    label: "Assuntos",
                  },
                ]}
              />
            </Panel>
          </div>
        </div>
      </details>
      <Panel
        title="Disciplinas"
        action={
          <span className="small-chip">
            {analysis.disciplines?.length || 0} disciplinas
          </span>
        }
      >
        <div className="discipline-radar">
          {(analysis.disciplines || []).map((d) => (
            <article className="radar-card" key={d.id}>
              <div className="radar-top">
                <span
                  className="radar-dot"
                  style={{
                    background: d.color,
                  }}
                />
                <strong>{d.name}</strong>
                <Priority value={d.priority} />
              </div>
              <div className="radar-line">
                <span>Progresso do edital</span>
                <b>{d.coverage}%</b>
              </div>
              <ProgressBar value={d.coverage} height={7} color={d.color} />
              <div className="radar-stats">
                <span>
                  {d.completedTopics}/{d.topicCount} assuntos
                </span>
                <span>{d.questions} questões</span>
                <span>
                  {d.questions ? `${d.accuracy}% acertos` : "Sem questões"}
                </span>
                <span>Teoria {fmtHours(d.theorySeconds || 0)}</span>
                <span>Questões {fmtHours(d.questionSeconds || 0)}</span>
              </div>
              <div className="radar-rating">
                <span>
                  Importância <b>{d.importance}/5</b>
                </span>
                <span>
                  Peso <b>{d.examWeight}/5</b>
                </span>
                <span>
                  Entendimento <b>{d.confidence}/5</b>
                </span>
              </div>
              <Button
                className="radar-edit"
                onClick={() => {
                  setEditing(d);
                  setTuning({
                    importance: d.importance,
                    examWeight: d.examWeight,
                    confidence: d.confidence,
                  });
                }}
                type="button"
              >
                <Edit3 size={15} /> Ajustar prioridade
              </Button>
            </article>
          ))}
        </div>
      </Panel>
      <Panel
        title="Todos os assuntos"
        action={<span className="small-chip">{filtered.length} assuntos</span>}
      >
        <div className="analytics-filters">
          <div className="search-wrap">
            <Search size={17} />
            <Input
              type="search"
              placeholder="Buscar disciplina ou assunto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <NativeSelect
            aria-label="Disciplina"
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
          >
            <option value="all">Todas as disciplinas</option>
            {data.disciplines.map((d) => (
              <option value={d.id} key={d.id}>
                {d.name}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect
            aria-label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="NOT_STARTED">A iniciar</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="COMPLETED">Concluído</option>
          </NativeSelect>
          <NativeSelect
            aria-label="Domínio"
            value={mastery}
            onChange={(e) => setMastery(e.target.value)}
          >
            <option value="all">Todos os domínios</option>
            <option value="WEAK">Fraco</option>
            <option value="MEDIUM">Médio</option>
            <option value="STRONG">Forte</option>
          </NativeSelect>
          <NativeSelect
            aria-label="Ordenação"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="priority">Maior prioridade</option>
            <option value="accuracy">Menor acerto</option>
            <option value="questions">Mais questões</option>
            <option value="name">Nome A–Z</option>
          </NativeSelect>
        </div>
        <div className="table-scroll">
          <table className="data-table analytics-table">
            <thead>
              <tr>
                <th>ASSUNTO</th>
                <th>PRIORIDADE</th>
                <th>STATUS</th>
                <th>DOMÍNIO</th>
                <th>QUESTÕES</th>
                <th>TAXA DE ACERTO</th>
                <th>TEORIA</th>
                <th>TEMPO QUESTÕES</th>
                <th>REVISÕES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <React.Fragment key={t.id}>
                  <tr
                    className={`analytics-clickable ${selected === t.id ? "opened" : ""}`}
                    onClick={() => selectRow(t)}
                  >
                    <td>
                      <div className="analytics-topic-name">
                        <span
                          className="radar-dot"
                          style={{
                            background: t.color,
                          }}
                        />
                        <div>
                          <strong>{t.title}</strong>
                          <small>{t.discipline}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Priority value={t.priority} />
                    </td>
                    <td>
                      <StatusPill value={t.status} />
                    </td>
                    <td>
                      <MasteryPill value={t.mastery} />
                    </td>
                    <td>
                      {fmt(t.total)}
                      {t.sampleLow && (
                        <small className="analytics-sample">
                          {t.total > 0 ? "amostra pequena" : "sem dados"}
                        </small>
                      )}
                    </td>
                    <td>
                      <span
                        className="analytics-accuracy"
                        style={{
                          color:
                            t.total && t.accuracy < 60 ? "#ce7768" : undefined,
                        }}
                      >
                        {t.total ? `${t.accuracy}%` : "—"}
                      </span>
                    </td>
                    <td>{fmtHours(t.theorySeconds || 0)}</td>
                    <td>{fmtHours(t.questionSeconds || 0)}</td>
                    <td>{t.dueReviews || "—"}</td>
                  </tr>
                  {selected === t.id && (
                    <tr className="analytics-detail-row">
                      <td colSpan={9}>
                        <div className="topic-detail">
                          <div>
                            <span className="eyebrow">DETALHES DO ASSUNTO</span>
                            <h3>{t.title}</h3>
                            <p>
                              {t.correct} acertos · {t.wrong} erros · {t.total}{" "}
                              questões.{" "}
                              {t.sampleLow
                                ? "Com menos de 20 questões, a taxa de acerto ainda pode oscilar bastante."
                                : ""}
                            </p>
                            <div className="topic-detail-stats">
                              <span>Teoria {t.theoryDone ? "✅" : "○"}</span>
                              <span>Resumo {t.summaryDone ? "✅" : "○"}</span>
                              <span>{t.dueReviews} revisões pendentes</span>
                              <span>
                                Último estudo:{" "}
                                {t.lastStudy
                                  ? dateBR(t.lastStudy)
                                  : "não registrado"}
                              </span>
                            </div>
                          </div>
                          <div className="topic-detail-actions">
                            <Button
                              className="btn btn-subtle"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTopicEditing(t);
                                setTopicImportance(t.importance || 3);
                              }}
                              type="button"
                            >
                              <SlidersHorizontal size={15} /> Importância{" "}
                              {t.importance}/5
                            </Button>
                            <Button
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("questions", {
                                  topicId: t.id,
                                });
                              }}
                              type="button"
                            >
                              Praticar questões <ArrowRight size={15} />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <Empty
              title="Nenhum assunto encontrado"
              description="Experimente outros filtros ou cadastre novos assuntos no edital."
            />
          )}
        </div>
      </Panel>

      {editing && (
        <Modal
          title={`Ajustar ${editing.name}`}
          subtitle="Quanto maior a importância e o peso, maior a prioridade. Quanto menor o entendimento, maior o reforço."
          onClose={() => setEditing(null)}
        >
          <form className="form-stack" onSubmit={saveTuning}>
            <Ratings
              label="Importância para mim"
              description="1 = pouco importante · 5 = essencial"
              value={tuning.importance}
              onChange={(value) =>
                setTuning({
                  ...tuning,
                  importance: value,
                })
              }
            />
            <Ratings
              label="Peso na prova"
              description="1 = peso baixo · 5 = peso muito alto"
              value={tuning.examWeight}
              onChange={(value) =>
                setTuning({
                  ...tuning,
                  examWeight: value,
                })
              }
            />
            <Ratings
              label="Quanto eu entendo"
              description="1 = quase nada · 5 = domino a matéria"
              value={tuning.confidence}
              onChange={(value) =>
                setTuning({
                  ...tuning,
                  confidence: value,
                })
              }
            />
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setEditing(null)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Recalcular prioridades
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
      {topicEditing && (
        <Modal
          title={`Prioridade de ${topicEditing.title}`}
          subtitle="Defina o quanto este assunto importa para seu concurso."
          onClose={() => setTopicEditing(null)}
        >
          <form className="form-stack" onSubmit={saveTopic}>
            <Ratings
              label="Importância específica"
              description="1 baixa · 5 alta"
              value={topicImportance}
              onChange={setTopicImportance}
            />
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setTopicEditing(null)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Salvar importância
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
