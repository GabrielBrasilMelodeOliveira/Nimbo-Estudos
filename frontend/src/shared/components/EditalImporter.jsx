import { Button, Input, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  Check,
  AlertCircle,
  Plus,
  X,
  Trash2,
  ArrowRight,
  FileCheck,
  Info,
} from "lucide-react";
import { Modal, Field } from "./UI.jsx";
import { api, uploadFile, fileUrl } from "../services/api.js";
import { dateBR } from "../utils/utils.js";
export default function EditalImporter({ action, working, history = [] }) {
  const [open, setOpen] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState(""),
    [preview, setPreview] = useState(null),
    [asset, setAsset] = useState(null),
    [groups, setGroups] = useState([]);
  const reset = () => {
    setPreview(null);
    setAsset(null);
    setGroups([]);
    setError("");
  };
  const load = async (file) => {
    if (!file) return;
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setError("O edital precisa ser PDF ou DOCX.");
      return;
    }
    setUploading(true);
    setError("");
    setPreview(null);
    try {
      const stored = await uploadFile(file);
      const parsed = await api("edital/preview", "POST", {
        assetId: stored.id,
      });
      setAsset(stored);
      setPreview(parsed);
      setGroups(
        parsed.groups.map((g) => ({
          discipline: g.discipline,
          text: g.topics.join("\n"),
        })),
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };
  const save = async () => {
    const cleaned = groups
      .filter((g) => g.discipline.trim() && g.text.trim())
      .map((g) => ({
        discipline: g.discipline.trim(),
        topics: g.text
          .split(/\n/)
          .map((x) => x.trim())
          .filter(Boolean),
      }));
    if (!cleaned.length) {
      setError("Inclua ao menos uma disciplina com assuntos.");
      return;
    }
    if (cleaned.reduce((a, x) => a + x.topics.length, 0) > 350) {
      setError("O máximo é 350 assuntos por importação.");
      return;
    }
    if (
      await action(
        "edital/import",
        "POST",
        {
          assetId: asset.id,
          groups: cleaned,
        },
        "Edital importado! Assuntos repetidos foram preservados sem duplicação.",
      )
    ) {
      setOpen(false);
      reset();
    }
  };
  const number = groups.reduce(
    (a, g) => a + g.text.split("\n").filter((x) => x.trim()).length,
    0,
  );
  return (
    <>
      <div className="edital-upload-banner">
        <div className="edital-upload-icon">
          <FileText size={27} />
        </div>
        <div>
          <span className="eyebrow">IMPORTAÇÃO DE EDITAL</span>
          <h3>Do PDF ao plano de estudos.</h3>
          <p>
            Envie o edital, revise a lista que identificamos e confirme. Os
            assuntos entram no controle verticalizado, sem substituir seu
            progresso.
          </p>
        </div>
        <Button
          className="btn btn-primary"
          onClick={() => {
            reset();
            setOpen(true);
          }}
          type="button"
        >
          <UploadCloud size={17} /> Importar edital
        </Button>
      </div>
      {history.length > 0 && (
        <div className="edital-import-history">
          <span>Último edital importado:</span>
          <a
            href={fileUrl(history[0].assetId, true)}
            target="_blank"
            rel="noreferrer"
          >
            {history[0].fileName}
          </a>
          <small>
            · {history[0].addedTopics} assuntos adicionados ·{" "}
            {dateBR(history[0].importedAt)}
          </small>
        </div>
      )}
      {open && (
        <Modal
          title="Transformar edital em assuntos"
          subtitle="Nada será importado sem você revisar e confirmar."
          wide
          onClose={() => {
            setOpen(false);
            reset();
          }}
        >
          <div className="edital-import-body">
            {!asset && (
              <label className="edital-dropzone">
                <UploadCloud size={38} />
                <strong>
                  {uploading
                    ? "Lendo o edital..."
                    : "Selecione o edital em PDF ou DOCX"}
                </strong>
                <span>
                  Arquivo até 20 MB. PDF precisa ter texto selecionável; imagens
                  digitalizadas exigem OCR externo.
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  disabled={uploading}
                  onChange={(e) => load(e.target.files?.[0])}
                />
              </label>
            )}
            {error && (
              <div className="api-error">
                <AlertCircle size={17} />
                {error}
              </div>
            )}
            {asset && (
              <div className="edital-preview-file">
                <FileCheck size={19} />
                <span>
                  <strong>{asset.originalName}</strong>
                  <small>
                    {preview?.extractedLines || 0} linhas de texto detectadas
                  </small>
                </span>
                <Button
                  className="btn btn-subtle"
                  onClick={reset}
                  type="button"
                >
                  Trocar arquivo
                </Button>
              </div>
            )}
            {preview && (
              <>
                {preview.warnings.map((w, i) => (
                  <div className="edital-warning" key={i}>
                    <Info size={16} />
                    <span>{w}</span>
                  </div>
                ))}
                <div className="edital-preview-top">
                  <div>
                    <h3>Confira o conteúdo identificado</h3>
                    <p>
                      Você pode mudar os nomes e editar os assuntos, um por
                      linha. Itens já existentes serão ignorados ao salvar.
                    </p>
                  </div>
                  <strong>
                    {groups.length} disciplinas · {number} assuntos
                  </strong>
                </div>
                <div className="edital-preview-groups">
                  {groups.map((g, i) => (
                    <div className="edital-preview-group" key={i}>
                      <div className="edital-preview-group-head">
                        <span>Disciplina {i + 1}</span>
                        <Button
                          className="icon-button danger-hover"
                          onClick={() =>
                            setGroups((old) => old.filter((_, j) => j !== i))
                          }
                          aria-label="Excluir disciplina da prévia"
                          type="button"
                        >
                          <Trash2 size={17} />
                        </Button>
                      </div>
                      <Field label="Nome da disciplina">
                        <Input
                          maxLength="120"
                          value={g.discipline}
                          onChange={(e) =>
                            setGroups((old) =>
                              old.map((a, j) =>
                                i === j
                                  ? {
                                      ...a,
                                      discipline: e.target.value,
                                    }
                                  : a,
                              ),
                            )
                          }
                        />
                      </Field>
                      <Field label="Assuntos, um por linha">
                        <TextareaAutosize
                          rows={Math.min(
                            8,
                            Math.max(3, g.text.split("\n").length + 1),
                          )}
                          value={g.text}
                          onChange={(e) =>
                            setGroups((old) =>
                              old.map((a, j) =>
                                i === j
                                  ? {
                                      ...a,
                                      text: e.target.value,
                                    }
                                  : a,
                              ),
                            )
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
                <Button
                  className="btn btn-subtle"
                  onClick={() =>
                    setGroups((old) => [
                      ...old,
                      {
                        discipline: "",
                        text: "",
                      },
                    ])
                  }
                  type="button"
                >
                  <Plus size={16} /> Adicionar disciplina manualmente
                </Button>
                <div className="modal-actions">
                  <Button
                    className="btn btn-subtle"
                    onClick={() => {
                      setOpen(false);
                      reset();
                    }}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="btn btn-primary"
                    disabled={working || number === 0}
                    onClick={save}
                    type="button"
                  >
                    <Check size={17} /> Confirmar {number} assuntos
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
