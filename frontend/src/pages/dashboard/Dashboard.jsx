import StudySummary from "./sections/StudySummary.jsx";
import { Checkbox, IconButton } from "@mui/material";
import { isAgendaCompleted } from "../../shared/utils/plannerMetrics.js";
import { Button } from "@mui/material";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  Repeat2,
  Target,
  Timer,
} from "lucide-react";
import { PetPicker } from "../../shared/components/Pet.jsx";
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
      <StudySummary
        daily={daily}
        weekly={weekly}
        goalSeconds={goalSeconds}
        navigate={navigate}
      />
    </div>
  );
}
