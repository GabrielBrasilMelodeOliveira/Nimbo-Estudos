import { Button, Tabs, Tab } from "@mui/material";
import {
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Panel, Empty, SubtleButton } from "../../shared/components/UI.jsx";
import AssimilationPicker from "../../shared/components/AssimilationPicker.jsx";
import { dateBR } from "../../shared/utils/utils.js";
import { revisionLabel } from "../../shared/utils/revisionLevels.js";
import { useReviews } from "./hooks/useReviews.jsx";
export default function Reviews({ data, action, working, navigate }) {
  const {
    tab,
    setTab,
    selected,
    setSelected,
    today,
    due,
    upcoming,
    done,
    current,
  } = useReviews({
    data,
    action,
    working,
    navigate,
  });
  return (
    <div className="view-stack">
      <Panel title="Revisões">
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Filtrar revisões"
          sx={{ mb: 2 }}
        >
          <Tab value="due" label={`Pendentes (${due.length})`} />
          <Tab value="upcoming" label={`Próximas (${upcoming.length})`} />
          <Tab value="done" label={`Histórico (${done.length})`} />
        </Tabs>
        {current.length ? (
          <div className="review-list">
            {current.map((r) => (
              <div className="review-item" key={r.id}>
                <div className="review-item-badge">
                  <RotateCcw size={20} />
                </div>
                <div className="review-item-main">
                  <strong>{r.topic.title}</strong>
                  <span>
                    {r.topic.discipline.name} ·{" "}
                    {r.completedAt
                      ? `Revista em ${dateBR(r.completedAt)}`
                      : `Próxima: ${dateBR(r.dueDate)}`}
                  </span>
                  {r.assimilationLevel && (
                    <small>
                      {revisionLabel(r.assimilationLevel)} · intervalo de{" "}
                      {r.intervalDays} dias
                      {r.assimilationLevel === 1 ? " · reestudar teoria" : ""}
                    </small>
                  )}
                </div>
                <div className="review-meta">
                  {!r.completedAt && r.dueDate < today && (
                    <span className="review-overdue">Atrasada</span>
                  )}
                </div>
                {tab === "due" ? (
                  <Button
                    className="btn btn-primary"
                    disabled={working}
                    onClick={() => setSelected(r)}
                    type="button"
                  >
                    <CheckCircle2 size={16} />{" "}
                    {r.assimilationLevel === 1 ? "Reestudar" : "Revisar"}
                  </Button>
                ) : tab === "done" ? (
                  <SubtleButton
                    disabled={working}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Reabrir esta revisão? A próxima será cancelada.",
                        )
                      )
                        action(
                          `reviews/${r.id}/reopen`,
                          "PATCH",
                          undefined,
                          "Revisão reaberta.",
                        );
                    }}
                  >
                    Reabrir
                  </SubtleButton>
                ) : (
                  <span className="upcoming-pill">Agendada</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Empty
            icon={CalendarDays}
            title={
              tab === "due"
                ? "Tudo em dia!"
                : tab === "upcoming"
                  ? "Sem revisões agendadas"
                  : "Nenhuma revisão concluída"
            }
            action={
              tab !== "done" && (
                <Button
                  className="text-link"
                  onClick={() => navigate("edital")}
                  type="button"
                >
                  Ver edital <ArrowRight size={14} />
                </Button>
              )
            }
          />
        )}
      </Panel>
      <details className="ux-inline-help">
        <summary>Como funciona?</summary>
        <p>
          Após estudar ou revisar, escolha quanto assimilou: 1 = 48h, 2 = 7
          dias, 3 = 14 dias ou 4 = 42 dias. Uma nova revisão será marcada
          automaticamente.
        </p>
      </details>
      {selected && (
        <AssimilationPicker
          title="Como foi a revisão?"
          subject={selected.topic.title}
          working={working}
          onClose={() => setSelected(null)}
          submitLabel="Concluir e reagendar"
          onConfirm={(level) =>
            action(
              `reviews/${selected.id}/complete`,
              "PATCH",
              {
                level,
              },
              "Revisão concluída e próxima data agendada.",
            )
          }
        />
      )}
    </div>
  );
}
