import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Modal } from "./UI.jsx";

/** Exclusão destrutiva exigindo que o usuário escreva a palavra de confirmação. */
export default function DangerZone({
  scope,
  title,
  description,
  count,
  action,
  working,
  compact = false,
}) {
  const [open, setOpen] = useState(false),
    [text, setText] = useState("");
  const close = () => {
    setOpen(false);
    setText("");
  };
  const clear = async () => {
    const ok = await action(
      "maintenance/clear",
      "POST",
      {
        scope,
        confirmation: text,
      },
      `${title}: registros excluídos.`,
    );
    if (ok) close();
  };
  return (
    <>
      <Button
        type="button"
        className={`btn btn-danger-outline ${compact ? "btn-sm" : ""}`}
        disabled={working || count === 0}
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} />
        {compact ? "Limpar registros" : title}
      </Button>
      {open && (
        <Modal
          title="Confirmar exclusão permanente"
          subtitle={title}
          onClose={close}
        >
          <div className="danger-explanation">
            <AlertTriangle size={24} />
            <div>
              <strong>Esta ação não pode ser desfeita.</strong>
              <p>{description}</p>
              <p>
                <strong>{count}</strong>{" "}
                {count === 1
                  ? "registro selecionado"
                  : "registros nesta categoria"}{" "}
                (contagem indicativa).
              </p>
            </div>
          </div>
          <label className="field">
            <span className="field-label">Digite EXCLUIR para continuar</span>
            <Input
              autoComplete="off"
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="EXCLUIR"
            />
          </label>
          <div className="modal-actions">
            <Button type="button" className="btn btn-subtle" onClick={close}>
              Cancelar
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              disabled={working || text !== "EXCLUIR"}
              onClick={clear}
            >
              <Trash2 size={16} /> Excluir definitivamente
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
