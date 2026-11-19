import { youtubeVideo } from "../utils/youtube.js";
import { useEffect, useState } from "react";
import { api, uploadFile } from "../../../shared/services/api.js";
import { blank } from "../utils/pageDefinitions.jsx";
export function useMaterials({ data, action, working }) {
  const [documentLoading, setDocumentLoading] = useState(false);
  const [open, setOpen] = useState(false),
    [form, setForm] = useState(blank),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [stateFilter, setStateFilter] = useState("all"),
    [masteryFilter, setMasteryFilter] = useState("all");
  const [uploading, setUploading] = useState(false),
    [formError, setFormError] = useState(""),
    [viewing, setViewing] = useState(null),
    [draft, setDraft] = useState(""),
    [editorBusy, setEditorBusy] = useState(false),
    [editorError, setEditorError] = useState("");
  const visible = data.materials.filter(
    (m) =>
      (filter === "all" || m.type === filter) &&
      (stateFilter === "all" ||
        (stateFilter === "read"
          ? m.readDone
          : stateFilter === "unread"
            ? !m.readDone
            : stateFilter === "reviewed"
              ? m.reviewed
              : !m.reviewed)) &&
      (masteryFilter === "all" || (m.mastery || "WEAK") === masteryFilter) &&
      `${m.title} ${m.topic?.title || ""} ${m.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const counts = {
    all: data.materials.length,
    files: data.materials.filter((m) => m.assetId).length,
    read: data.materials.filter((m) => m.readDone).length,
    reviewed: data.materials.filter((m) => m.reviewed).length,
    strong: data.materials.filter((m) => m.mastery === "STRONG").length,
  };
  const active = viewing ? data.materials.find((m) => m.id === viewing) : null;
  const currentType = active?.type;
  const hasTextEditor = currentType === "DOCX" && !!active?.assetId;
  useEffect(() => {
    if (!active) return;
    let current = true;
    setEditorError("");
    setDraft("");
    setDocumentLoading(hasTextEditor);
    if (hasTextEditor) {
      api(`materials/${active.id}/document`)
        .then((response) => {
          if (current) setDraft(response.content || "");
        })
        .catch((exception) => {
          if (current) setEditorError(exception.message);
        })
        .finally(() => {
          if (current) setDocumentLoading(false);
        });
    } else setDraft(active.notes || "");
    return () => {
      current = false;
    };
  }, [active?.id, active?.assetId, hasTextEditor]);
  const save = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.assetId && !form.url.trim()) {
      setFormError("Selecione um arquivo ou informe um link.");
      return;
    }
    const video = !form.assetId && youtubeVideo(form.url);
    if (!form.assetId && form.type === "VIDEO" && !video) {
      setFormError(
        "Informe o link de um vídeo do YouTube (watch, youtu.be, shorts ou live).",
      );
      return;
    }
    if (
      await action(
        "materials",
        "POST",
        {
          ...form,
          type: video ? "VIDEO" : form.type,
          topicId: form.topicId ? Number(form.topicId) : null,
        },
        "Material adicionado à biblioteca!",
      )
    ) {
      setOpen(false);
      setForm(blank);
    }
  };
  const attach = async (file, preview = false) => {
    if (!file) return;
    setUploading(true);
    setFormError("");
    try {
      const uploaded = await uploadFile(file);
      if (preview) {
        if (!uploaded.type.startsWith("image/"))
          throw new Error("A capa deve ser uma imagem.");
        setForm((f) => ({
          ...f,
          previewAssetId: uploaded.id,
        }));
      } else {
        setForm((f) => ({
          ...f,
          assetId: uploaded.id,
          title: f.title || file.name.replace(/\.[^.]+$/, ""),
          type: uploaded.type.includes("pdf")
            ? "PDF"
            : uploaded.type.includes("wordprocessingml")
              ? "DOCX"
              : "IMAGE",
        }));
      }
    } catch (e) {
      setFormError(e.message);
    } finally {
      setUploading(false);
    }
  };
  const updateStatus = async (m, field, value) => {
    await action(
      `materials/${m.id}/status`,
      "PATCH",
      {
        [field]: value,
      },
      "Progresso do material atualizado.",
    );
  };
  const saveDocument = async () => {
    if (!active || (hasTextEditor && (documentLoading || editorError))) return;
    setEditorBusy(true);
    setEditorError("");
    try {
      if (hasTextEditor) {
        await api(`materials/${active.id}/document`, "PUT", {
          content: draft,
        });
      } else if (currentType === "PDF" && active.assetId) {
        await api(`materials/${active.id}/document`, "PUT", {
          content: draft,
        });
      } else
        await api(`materials/${active.id}/status`, "PATCH", {
          notes: draft,
        });
      // Respeitar a atualização de dados ao retornar do editor.
      await action(
        `materials/${active.id}/status`,
        "PATCH",
        {
          readDone: true,
        },
        "Alterações salvas no seu material!",
      );
    } catch (e) {
      setEditorError(e.message);
    } finally {
      setEditorBusy(false);
    }
  };
  return {
    open,
    setOpen,
    form,
    setForm,
    search,
    setSearch,
    filter,
    setFilter,
    stateFilter,
    setStateFilter,
    masteryFilter,
    setMasteryFilter,
    uploading,
    setUploading,
    formError,
    setFormError,
    viewing,
    setViewing,
    draft,
    setDraft,
    editorBusy,
    setEditorBusy,
    editorError,
    setEditorError,
    visible,
    counts,
    active,
    currentType,
    hasTextEditor,
    documentLoading,
    save,
    attach,
    updateStatus,
    saveDocument,
  };
}
