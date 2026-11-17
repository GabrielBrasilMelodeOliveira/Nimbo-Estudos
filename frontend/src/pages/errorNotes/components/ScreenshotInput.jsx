import { Button } from "@mui/material";
import { useState } from "react";
import { ImagePlus, ClipboardPaste, Camera } from "lucide-react";
import { uploadFile, fileUrl } from "../../../shared/services/api.js";
export function ScreenshotInput({ id, label, onChange, disabled }) {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const send = async (file) => {
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      if (!/\.(png|jpe?g|webp)$/i.test(file.name))
        throw new Error("Envie uma imagem PNG, JPG ou WEBP.");
      const uploaded = await uploadFile(file);
      if (!uploaded.type.startsWith("image/"))
        throw new Error("Este arquivo não é uma imagem.");
      onChange(uploaded.id);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const paste = (e) => {
    const image = Array.from(e.clipboardData?.items || []).find((item) =>
      item.type.startsWith("image/"),
    );
    if (image) {
      e.preventDefault();
      const original = image.getAsFile();
      if (original) {
        const ext =
          image.type === "image/jpeg"
            ? "jpg"
            : image.type === "image/webp"
              ? "webp"
              : "png";
        const file = new File([original], `captura-${Date.now()}.${ext}`, {
          type: image.type,
        });
        send(file);
      }
    }
  };
  return (
    <div
      className="screenshot-input"
      onPaste={paste}
      tabIndex={0}
      aria-label={`${label}; clique aqui e pressione Control V para colar uma captura`}
    >
      <div className="screenshot-title">
        <Camera size={17} />
        <strong>{label}</strong>
      </div>
      {id ? (
        <div className="screenshot-selected">
          <img src={fileUrl(id)} alt={`Print da ${label.toLowerCase()}`} />
          <Button
            type="button"
            className="btn btn-subtle"
            onClick={() => onChange(null)}
          >
            Remover captura
          </Button>
        </div>
      ) : (
        <div className="screenshot-drop">
          <ImagePlus size={22} />
          <span>Envie um print ou cole uma captura do computador.</span>
          <label className="screenshot-file-button">
            Selecionar imagem
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
              disabled={disabled || loading}
              aria-label={`Enviar ${label}`}
              onChange={(e) => send(e.target.files?.[0])}
            />
          </label>
          <Button
            type="button"
            className="screenshot-paste-button"
            onClick={(e) =>
              e.currentTarget.closest(".screenshot-input")?.focus()
            }
          >
            <ClipboardPaste size={14} /> Colar com Ctrl + V
          </Button>
        </div>
      )}
      {loading && <small>Enviando imagem...</small>}
      {error && <small className="input-error">{error}</small>}
    </div>
  );
}
