import { Checkbox, IconButton } from "@mui/material";
import { isAgendaCompleted } from "../../shared/utils/plannerMetrics.js";
import { Button } from "@mui/material";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  Clock3,
  Repeat2,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import { PetPicker } from "../../shared/components/Pet.jsx";
import { ProgressBar } from "../../shared/components/UI.jsx";
import { dateBR, fmtHours } from "../../shared/utils/utils.js";
import { area, priorityLabel } from "./utils/pageDefinitions.jsx";
import { useDashboard } from "./hooks/useDashboard.jsx";
export default function Dashboard({ data, action, working, navigate }) {
  const {
    overview,
    today,
    allTasks,
    todayTasks,
    pendingTasks,
    due,
    focus,
    weekly,
    goalSeconds,
    daily,
    maxSeconds,
    dayLabel,
    greet,
  } = useDashboard({
    data,
    action,
    working,
    navigate,
  });
  return (
    <div className="ux-home">
      {!data.pet && (
        <PetPicker
          working={working}
          onSelect={(species) =>
            action(
              "pet",
              "POST",
              {
                species,
              },
              "Nimbo chegou!",
            )
          }
        />
      )}
      <section className="ux-home-focus" aria-label="Próximo passo de estudo">
        <div className="ux-home-focus-top">
          <span className="ux-kicker">{greet} · Seu próximo passo</span>
          <span className="ux-focus-reason">
            {focus ? priorityLabel(focus.priority) : "Organize seus estudos"}
          </span>
        </div>
        <h2>{focus?.title || "Pronto para começar?"}</h2>
        <p>
          {focus
            ? `${focus.discipline} · ${focus.dueReviews ? `${focus.dueReviews} revisão(ões) pendente(s)` : focus.total ? `${focus.total} questões já registradas` : "Assunto ainda sem questões"}`
            : "Adicione disciplinas ou importe um edital para receber uma sugestão de estudo."}
        </p>
        <div className="ux-home-focus-actions">
          <Button
            className="btn btn-primary"
            onClick={() =>
              navigate(
                focus ? "cycle" : "edital",
                focus
                  ? {
                      topicId: focus.id,
                    }
                  : {},
              )
            }
            type="button"
          >
            <Timer size={18} />
            {focus ? "Estudar este assunto" : "Abrir meu edital"}
            <ArrowRight size={16} />
          </Button>
          {focus && (
            <Button
              className="btn btn-subtle"
              onClick={() =>
                navigate("questions", {
                  topicId: focus.id,
                })
              }
              type="button"
            >
              <Target size={18} /> Resolver questões
            </Button>
          )}
        </div>
      </section>
      <section className="ux-home-summary" aria-label="Resumo dos seus estudos">
        <Button
          type="button"
          onClick={() => navigate("edital")}
          className="ux-summary-item"
        >
          <BookOpenText size={20} />
          <span>Edital</span>
          <strong>{Math.round(overview.progressPercentage || 0)}%</strong>
          <small>
            {overview.completedTopics || 0} de {overview.totalTopics || 0}{" "}
            assuntos
          </small>
        </Button>
        <Button
          type="button"
          onClick={() => navigate("questions")}
          className="ux-summary-item"
        >
          <Target size={20} />
          <span>Acertos (30 dias)</span>
          <strong>
            {overview.recentTotal
              ? `${Math.round(overview.recentAccuracy || 0)}%`
              : "—"}
          </strong>
          <small>{overview.recentTotal || 0} questões</small>
        </Button>
        <Button
          type="button"
          onClick={() => navigate("cycle")}
          className="ux-summary-item"
        >
          <Clock3 size={20} />
          <span>Esta semana</span>
          <strong>{fmtHours(weekly)}</strong>
          <small>
            {goalSeconds ? `Meta: ${fmtHours(goalSeconds)}` : "Tempo líquido"}
          </small>
        </Button>
        <Button
          type="button"
          onClick={() => navigate("reviews")}
          className="ux-summary-item"
        >
          <Repeat2 size={20} />
          <span>Revisões a fazer</span>
          <strong>{due.length}</strong>
          <small>{due.length ? "Até hoje" : "Tudo em dia"}</small>
        </Button>
      </section>
      <div className="ux-home-columns">
        <section className="ux-home-panel">
          <div className="ux-home-panel-head">
            <h3>
              <CalendarDays size={19} /> Agenda de hoje
            </h3>
            <Button type="button" onClick={() => navigate("weekly")}>
              Ver agenda <ArrowRight size={16} />
            </Button>
          </div>
          {todayTasks.length ? (
            <div className="ux-today-list">
              {todayTasks.slice(0, 5).map((task) => (
                <div
                  className={`ux-today-task ${isAgendaCompleted(data, task) ? "is-complete" : ""}`}
                  key={task.id}
                >
                  <Checkbox
                    checked={isAgendaCompleted(data, task)}
                    disabled={working}
                    slotProps={{
                      input: {
                        "aria-label": `${isAgendaCompleted(data, task) ? "Reabrir" : "Concluir"} ${task.title}`,
                      },
                    }}
                    onChange={(event) =>
                      action(
                        `agenda/${task.id}/completion`,
                        "PATCH",
                        {
                          completed: event.target.checked,
                          expectedVersion: task.version ?? 0,
                        },
                        "Atividade atualizada.",
                      )
                    }
                  />
                  <span className="ux-task-label">
                    <strong>{task.title}</strong>
                    <small>
                      {task.startTime ? `${task.startTime.slice(0, 5)} · ` : ""}
                      {area[task.category] || "Pessoal"}
                    </small>
                  </span>
                  {task.topic && (
                    <IconButton
                      aria-label={`Iniciar ${task.title}`}
                      onClick={() =>
                        navigate(
                          task.studyKind === "QUESTIONS"
                            ? "questions"
                            : "cycle",
                          { topicId: task.topic.id },
                        )
                      }
                    >
                      <ArrowRight size={16} />
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="ux-quiet-empty">Sem atividades para hoje.</p>
          )}
          {todayTasks.length > 5 && (
            <span className="ux-inline-note">
              +{todayTasks.length - 5} atividades na agenda
            </span>
          )}
        </section>
        <section className="ux-home-panel">
          <div className="ux-home-panel-head">
            <h3>
              <Repeat2 size={19} /> Próximas revisões
            </h3>
            <Button type="button" onClick={() => navigate("reviews")}>
              Ver revisões <ArrowRight size={16} />
            </Button>
          </div>
          {due.length ? (
            <div className="ux-reviews-list">
              {due.slice(0, 4).map((item) => (
                <div className="ux-review-item" key={item.id}>
                  <span className="ux-review-dot" />
                  <div>
                    <strong>{item.topic?.title || "Assunto"}</strong>
                    <small>
                      {item.dueDate < today
                        ? `Venceu em ${dateBR(item.dueDate)}`
                        : "Para hoje"}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="ux-quiet-empty">
              Nenhuma revisão atrasada ou marcada para hoje.
            </p>
          )}
          {due.length > 4 && (
            <span className="ux-inline-note">
              +{due.length - 4} revisões pendentes
            </span>
          )}
        </section>
      </div>
      <section className="ux-home-panel ux-home-week">
        <div className="ux-home-panel-head">
          <div>
            <h3>
              <TrendingUp size={19} /> Estudo nos últimos 7 dias
            </h3>
            <p>Tempo líquido salvo</p>
          </div>
          <Button type="button" onClick={() => navigate("analytics")}>
            Desempenho <ArrowRight size={16} />
          </Button>
        </div>
        <div className="ux-week-head">
          <strong>
            {fmtHours(daily.reduce((sum, x) => sum + (x.seconds || 0), 0))}
          </strong>
          <span>
            Teoria{" "}
            {fmtHours(
              daily.reduce(
                (sum, x) => sum + (x.theorySeconds ?? x.seconds ?? 0),
                0,
              ),
            )}{" "}
            · Questões{" "}
            {fmtHours(
              daily.reduce((sum, x) => sum + (x.questionSeconds || 0), 0),
            )}
          </span>
        </div>
        <div
          className="ux-week-bars"
          role="img"
          aria-label="Tempo líquido por dia nos últimos sete dias: parte verde teoria e parte amarela questões."
        >
          {daily.map((x) => (
            <div
              className="ux-week-day"
              key={x.date}
              title={`${dateBR(x.date)}: ${fmtHours(x.seconds || 0)}`}
            >
              <div className="ux-week-track">
                <span
                  style={{
                    height: `${x.seconds ? Math.max(6, (100 * x.seconds) / maxSeconds) : 0}%`,
                  }}
                >
                  <i
                    style={{
                      height: `${x.seconds ? (100 * (x.questionSeconds || 0)) / x.seconds : 0}%`,
                    }}
                  />
                </span>
              </div>
              <small>{dayLabel(x.date)}</small>
            </div>
          ))}
        </div>
        {goalSeconds > 0 && (
          <div className="ux-goal-line">
            <div>
              <span>Meta da semana</span>
              <strong>
                {Math.min(100, Math.round((weekly / goalSeconds) * 100))}%
              </strong>
            </div>
            <ProgressBar value={(100 * weekly) / goalSeconds} />
          </div>
        )}
      </section>
    </div>
  );
}
