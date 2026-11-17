import { Input } from "../../shared/components/FormControls.jsx";
import { TextareaAutosize } from "@mui/material";
import { ClipboardCheck, Plus, Target, Trophy } from "lucide-react";
import {
  Panel,
  Modal,
  Field,
  PrimaryButton,
  SubtleButton,
  Empty,
  DeleteButton,
} from "../../shared/components/UI.jsx";
import { dateBR, percentage, fmtPercent } from "../../shared/utils/utils.js";
import { useMockExams } from "./hooks/useMockExams.jsx";
export default function MockExams({ data, action, working }) {
  const {
    open,
    setOpen,
    form,
    setForm,
    exams,
    best,
    last,
    goalAchieved,
    save,
  } = useMockExams({
    data,
    action,
    working,
  });
  return (
    <div className="view-stack">
      <div className="section-toolbar">
        <span className="toolbar-info">
          <ClipboardCheck size={19} /> Seus resultados
        </span>
        <div className="toolbar-buttons">
          <PrimaryButton onClick={() => setOpen(true)}>
            <Plus size={18} /> Novo simulado
          </PrimaryButton>
        </div>
      </div>
      <div className="mini-metric-grid">
        <div className="mini-metric">
          <div className="mini-icon blue">
            <ClipboardCheck size={21} />
          </div>
          <span>SIMULADOS REALIZADOS</span>
          <strong>{exams.length}</strong>
          <small>Registros acumulados</small>
        </div>
        <div className="mini-metric">
          <div className="mini-icon purple">
            <Trophy size={21} />
          </div>
          <span>MELHOR APROVEITAMENTO</span>
          <strong>{fmtPercent(best)}</strong>
          <small>Seu recorde pessoal</small>
        </div>
        <div className="mini-metric">
          <div className="mini-icon teal">
            <Target size={21} />
          </div>
          <span>ACIMA DA NOTA DE CORTE</span>
          <strong>{goalAchieved}</strong>
          <small>Simulados com meta atingida</small>
        </div>
      </div>
      <Panel title="Histórico de simulados">
        {exams.length ? (
          <div className="mock-list">
            {exams.map((m) => {
              const acc = percentage(m.correct, m.total),
                pass = acc >= m.cutoffPercentage;
              return (
                <div className="mock-row" key={m.id}>
                  <div className="mock-main">
                    <div className="mock-icon">
                      <ClipboardCheck size={23} />
                    </div>
                    <div>
                      <strong>{m.title}</strong>
                      <span>
                        {dateBR(m.date)} · {m.correct} de {m.total} questões
                        certas
                      </span>
                      {m.notes && <small>{m.notes}</small>}
                    </div>
                  </div>
                  <div className="mock-grade">
                    <span>SUA NOTA</span>
                    <strong>{fmtPercent(acc)}</strong>
                  </div>
                  <div className="mock-cutoff">
                    <span>NOTA DE CORTE</span>
                    <strong>{fmtPercent(m.cutoffPercentage)}</strong>
                  </div>
                  <span className={`mock-status ${pass ? "passed" : "failed"}`}>
                    {pass ? "Meta atingida" : "Abaixo da meta"}
                  </span>
                  <DeleteButton
                    onClick={() => {
                      if (window.confirm("Excluir este simulado?"))
                        action(
                          `mock-exams/${m.id}`,
                          "DELETE",
                          undefined,
                          "Simulado excluído.",
                        );
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty
            icon={ClipboardCheck}
            title="Seu primeiro simulado vem aí"
            description="Registre a quantidade de questões, acertos e a nota de corte desejada para comparar seus resultados."
          />
        )}
      </Panel>
      {open && (
        <Modal
          title="Registrar simulado"
          subtitle="Registre seu resultado e acompanhe o quanto falta para a meta."
          onClose={() => setOpen(false)}
        >
          <form className="form-stack" onSubmit={save}>
            <Field label="Nome do simulado">
              <Input
                required
                maxLength="160"
                placeholder="Ex.: Simulado TI — Cesgranrio #01"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </Field>
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
            <div className="form-grid">
              <Field label="Total de questões">
                <Input
                  required
                  type="number"
                  min="1"
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
            <Field label="Nota de corte alvo (%)">
              <Input
                type="number"
                required
                min="0"
                max="100"
                step="0.1"
                value={form.cutoffPercentage}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cutoffPercentage: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Observações (opcional)">
              <TextareaAutosize
                minRows="3"
                maxLength="500"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
                placeholder="Pontos para melhorar, dificuldade da prova..."
              />
            </Field>
            {form.correct !== "" && form.total > 0 && (
              <div className="inline-result">
                Resultado estimado{" "}
                <strong>
                  {fmtPercent(
                    percentage(Number(form.correct), Number(form.total)),
                  )}
                </strong>
              </div>
            )}
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setOpen(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working}>
                Salvar simulado
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
