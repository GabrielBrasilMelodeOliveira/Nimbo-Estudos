import {
  Input,
  SearchableSelect,
} from "../../shared/components/FormControls.jsx";
import { Button, TextareaAutosize } from "@mui/material";
import {
  LibraryBig,
  Plus,
  ExternalLink,
  Link2,
  FileText,
  Search,
  UploadCloud,
  Eye,
  Download,
  CheckCircle2,
  SlidersHorizontal,
  PencilLine,
  Save,
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
import { materialLabels } from "../../shared/utils/utils.js";
import { fileUrl, previewUrl } from "../../shared/services/api.js";
import { icons, blank, mastery, fmt } from "./utils/pageDefinitions.jsx";
import { useMaterials } from "./hooks/useMaterials.jsx";
export default function Materials({ data, action, working }) {
  const {
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
    save,
    attach,
    updateStatus,
    saveDocument,
  } = useMaterials({
    data,
    action,
    working,
  });
  return (
    <div className="view-stack material-vault">
      <div className="section-toolbar">
        <span className="toolbar-info">
          <LibraryBig size={19} /> Arquivos e links
        </span>
        <div className="toolbar-buttons">
          <PrimaryButton
            onClick={() => {
              setForm(blank);
              setFormError("");
              setOpen(true);
            }}
          >
            <Plus size={18} /> Novo material
          </PrimaryButton>
        </div>
      </div>
      <div className="vault-metrics">
        <div>
          <LibraryBig size={20} />
          <strong>{counts.all}</strong>
          <span>Total</span>
        </div>
        <div>
          <FileText size={20} />
          <strong>{counts.files}</strong>
          <span>Arquivos salvos</span>
        </div>
        <div>
          <CheckCircle2 size={20} />
          <strong>{counts.reviewed}</strong>
          <span>Revisados</span>
        </div>
      </div>
      <Panel
        title="Meus materiais"
        action={<span className="small-chip">{fmt(visible.length)}</span>}
      >
        <div className="vault-filters">
          <div className="search-wrap">
            <Search size={17} />
            <Input
              type="search"
              placeholder="Buscar título ou assunto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <label>
            <SlidersHorizontal size={15} />
            <SearchableSelect
              aria-label="Tipo de material"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos os tipos</option>
              {Object.entries({
                ...materialLabels,
                DOCX: "Documento Word",
                IMAGE: "Imagem",
              }).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </SearchableSelect>
          </label>
          <SearchableSelect
            aria-label="Leitura e revisão"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="all">Qualquer situação</option>
            <option value="read">Já lidos</option>
            <option value="unread">Não lidos</option>
            <option value="reviewed">Já revisados</option>
            <option value="notreviewed">Pendentes de revisão</option>
          </SearchableSelect>
          <SearchableSelect
            aria-label="Domínio"
            value={masteryFilter}
            onChange={(e) => setMasteryFilter(e.target.value)}
          >
            <option value="all">Todos os domínios</option>
            <option value="WEAK">Fraco</option>
            <option value="MEDIUM">Médio</option>
            <option value="STRONG">Forte</option>
          </SearchableSelect>
        </div>
        {visible.length ? (
          <div className="vault-grid">
            {visible.map((m) => {
              const Icon = icons[m.type] || Link2;
              const cover = m.previewAssetId || m.assetId;
              return (
                <article className="vault-card" key={m.id}>
                  <Button
                    className="vault-preview"
                    onClick={() =>
                      m.assetId
                        ? setViewing(m.id)
                        : m.url &&
                          window.open(m.url, "_blank", "noopener,noreferrer")
                    }
                    aria-label={`Abrir ${m.title}`}
                    type="button"
                  >
                    {cover ? (
                      <img
                        src={previewUrl(cover)}
                        alt={`Prévia do material ${m.title}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="vault-preview-empty">
                        <Icon size={42} />
                        <span>Link</span>
                      </div>
                    )}
                    <span className="vault-preview-action">
                      <Eye size={15} />{" "}
                      {m.assetId ? "Visualizar" : "Abrir link"}
                    </span>
                  </Button>
                  <div className="vault-card-body">
                    <div className="vault-card-title">
                      <span className="vault-type">
                        {m.type === "DOCX"
                          ? "WORD"
                          : materialLabels[m.type] || m.type}
                      </span>
                      <DeleteButton
                        onClick={() => {
                          if (
                            window.confirm(
                              "Excluir material da biblioteca? O arquivo original ficará preservado no armazenamento.",
                            )
                          )
                            action(
                              `materials/${m.id}`,
                              "DELETE",
                              undefined,
                              "Material removido.",
                            );
                        }}
                      />
                    </div>
                    <h4 title={m.title}>{m.title}</h4>
                    <small>{m.topic?.title || "Material geral"}</small>
                    <div className="vault-card-tags">
                      <span className={m.readDone ? "tag-done" : "tag-wait"}>
                        {m.readDone ? "✓ Lido" : "Não lido"}
                      </span>
                      <span className={m.reviewed ? "tag-done" : "tag-wait"}>
                        {m.reviewed ? "✓ Revisado" : "Revisar"}
                      </span>
                    </div>
                    <div className="vault-card-foot">
                      <span>{mastery[m.mastery || "WEAK"]}</span>
                      <Button onClick={() => setViewing(m.id)} type="button">
                        Detalhes <Eye size={14} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <Empty
            icon={LibraryBig}
            title="Nenhum material encontrado"
            description="Ajuste os filtros ou envie seu primeiro PDF, DOCX, imagem ou link."
          />
        )}
      </Panel>
      {open && (
        <Modal
          title="Adicionar material"
          subtitle="Upload salvo no próprio site ou link externo."
          onClose={() => !uploading && setOpen(false)}
          wide
        >
          <form className="form-stack" onSubmit={save}>
            <div className="vault-upload-zone">
              <UploadCloud size={28} />
              <strong>
                {form.assetId
                  ? "Arquivo enviado com sucesso!"
                  : "Envie PDF, DOCX ou imagem"}
              </strong>
              <small>
                Até 20 MB. O arquivo continuará salvo após reiniciar o Docker.
              </small>
              <input
                aria-label="Selecionar material"
                type="file"
                accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
                onChange={(e) => attach(e.target.files?.[0])}
                disabled={uploading}
              />
              {uploading && <span>Enviando...</span>}
            </div>
            <div className="vault-or">
              <span>ou continue com um link</span>
            </div>
            <Field label="Link externo (opcional para arquivos)">
              <Input
                type="url"
                maxLength="2000"
                placeholder="https://..."
                value={form.url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    url: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Título">
              <Input
                required
                maxLength="140"
                value={form.title}
                placeholder="Ex.: Apostila de SQL"
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </Field>
            {!form.assetId && (
              <Field label="Tipo de link">
                <SearchableSelect
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                >
                  {Object.entries(materialLabels).map(([k, v]) => (
                    <option value={k} key={k}>
                      {v}
                    </option>
                  ))}
                </SearchableSelect>
              </Field>
            )}
            <Field label="Assunto relacionado">
              <TopicSelect
                required={false}
                topics={data.topics}
                value={form.topicId}
                onChange={(v) =>
                  setForm({
                    ...form,
                    topicId: v,
                  })
                }
                placeholder="Geral / sem assunto"
              />
            </Field>
            <Field label="Descrição">
              <TextareaAutosize
                minRows="2"
                maxLength="400"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Imagem de capa (opcional para links)">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={(e) => attach(e.target.files?.[0], true)}
                disabled={uploading}
              />
              {form.previewAssetId && (
                <img
                  className="vault-cover-thumb"
                  src={previewUrl(form.previewAssetId)}
                  alt="Capa selecionada"
                />
              )}
            </Field>
            {formError && (
              <div className="inline-error" role="alert">
                {formError}
              </div>
            )}
            <div className="modal-actions">
              <SubtleButton type="button" onClick={() => setOpen(false)}>
                Cancelar
              </SubtleButton>
              <PrimaryButton type="submit" loading={working || uploading}>
                Salvar material
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
      {active && (
        <Modal
          title={active.title}
          subtitle={active.topic?.title || "Material geral"}
          wide
          onClose={() => setViewing(null)}
        >
          <div className="vault-reader">
            <div className="reader-toolbar">
              <div>
                <span className="vault-type">{active.type}</span>{" "}
                <span>
                  {active.assetId ? "Arquivo no Nimbo" : "Link externo"}
                </span>
              </div>
              <div className="reader-links">
                {active.assetId && (
                  <>
                    <a
                      className="btn btn-subtle"
                      href={fileUrl(active.assetId, true)}
                    >
                      <Download size={15} /> Baixar atual
                    </a>
                    {active.originalAssetId &&
                      active.originalAssetId !== active.assetId && (
                        <a
                          className="btn btn-subtle"
                          href={fileUrl(active.originalAssetId, true)}
                        >
                          Original
                        </a>
                      )}
                  </>
                )}
                {active.url && (
                  <a
                    className="btn btn-subtle"
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={15} /> Abrir link
                  </a>
                )}
              </div>
            </div>
            <div className="reader-layout">
              <div className="reader-primary">
                {active.assetId && active.type === "PDF" && (
                  <iframe
                    key={active.assetId}
                    className="reader-pdf"
                    title={`Leitura do PDF ${active.title}`}
                    src={`${fileUrl(active.assetId)}#toolbar=1`}
                  />
                )}
                {active.assetId && active.type === "IMAGE" && (
                  <img
                    className="reader-image"
                    src={fileUrl(active.assetId)}
                    alt={active.title}
                  />
                )}
                {active.assetId && active.type === "DOCX" && (
                  <div className="docx-editor">
                    <div className="docx-editor-header">
                      <PencilLine size={18} /> Editor de texto DOCX
                    </div>
                    <TextareaAutosize
                      aria-label="Texto editável do documento Word"
                      spellCheck
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Carregando texto do documento..."
                    />
                    <p>
                      Ao salvar, será criada uma nova versão DOCX em formatação
                      simples. O arquivo original permanece disponível para
                      download. Tabelas, imagens e formatação avançada não são
                      preservadas no texto editado.
                    </p>
                  </div>
                )}
                {!active.assetId && (
                  <div className="reader-empty">
                    <Link2 size={34} />
                    <h3>Material disponível em outro site</h3>
                    <p>
                      Abra o link acima. Você também pode registrar sua leitura
                      e domínio aqui.
                    </p>
                    {active.previewAssetId && (
                      <img
                        src={previewUrl(active.previewAssetId)}
                        alt="Capa do material"
                      />
                    )}
                  </div>
                )}
                {active.assetId && active.type === "PDF" && (
                  <div className="reader-notes">
                    <strong>
                      <PencilLine size={17} /> Escrever dentro do PDF — páginas
                      de anotação
                    </strong>
                    <p>
                      Leia acima e escreva aqui. Ao salvar, suas anotações são
                      adicionadas ao final do próprio PDF, sem alterar as
                      páginas originais.
                    </p>
                    <TextareaAutosize
                      minRows="5"
                      maxLength="12000"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="O que aprendi neste PDF..."
                    />
                  </div>
                )}
                {(!active.assetId || active.type === "IMAGE") && (
                  <div className="reader-notes">
                    <strong>Anotações pessoais</strong>
                    <TextareaAutosize
                      minRows="4"
                      maxLength="12000"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Escreva suas anotações..."
                    />
                  </div>
                )}
                {editorError && (
                  <div className="inline-error" role="alert">
                    {editorError}
                  </div>
                )}
                <PrimaryButton
                  onClick={saveDocument}
                  loading={editorBusy || working}
                >
                  <Save size={16} />{" "}
                  {active.type === "PDF" && active.assetId
                    ? "Gravar anotação no PDF"
                    : active.type === "DOCX"
                      ? "Salvar nova versão DOCX"
                      : "Salvar anotações"}
                </PrimaryButton>
              </div>
              <aside className="reader-aside">
                <h3>Meu acompanhamento</h3>
                <label className="reader-check">
                  <input
                    type="checkbox"
                    checked={!!active.readDone}
                    onChange={(e) =>
                      updateStatus(active, "readDone", e.target.checked)
                    }
                  />{" "}
                  Já li este material
                </label>
                <label className="reader-check">
                  <input
                    type="checkbox"
                    checked={!!active.reviewed}
                    onChange={(e) =>
                      updateStatus(active, "reviewed", e.target.checked)
                    }
                  />{" "}
                  Já revisei
                </label>
                <Field label="Quanto domino?">
                  <SearchableSelect
                    value={active.mastery || "WEAK"}
                    onChange={(e) =>
                      updateStatus(active, "mastery", e.target.value)
                    }
                  >
                    <option value="WEAK">🔴 Fraco</option>
                    <option value="MEDIUM">🟡 Médio</option>
                    <option value="STRONG">🟢 Forte</option>
                  </SearchableSelect>
                </Field>
              </aside>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
