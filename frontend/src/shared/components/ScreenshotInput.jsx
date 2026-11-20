import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Camera, ClipboardPaste, ImagePlus } from "lucide-react";
import { uploadFile, fileUrl } from "../services/api.js";

export function ScreenshotInput({
  id,
  label,
  onChange,
  disabled = false,
  onUploadingChange,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const input = useRef(null);
  const container = useRef(null);
  const pending = useRef(false);
  const send = async (file) => {
    if (!file || disabled || pending.current) return;
    pending.current = true;
    setError("");
    setLoading(true);
    onUploadingChange?.(true);
    try {
      if (
        !/\.(png|jpe?g|webp)$/i.test(file.name) ||
        !["image/png", "image/jpeg", "image/webp"].includes(file.type)
      ) {
        throw new Error("Envie uma imagem PNG, JPG ou WEBP.");
      }
      const uploaded = await uploadFile(file);
      if (!uploaded.type?.startsWith("image/"))
        throw new Error("Este arquivo não é uma imagem.");
      onChange(uploaded.id);
    } catch (exception) {
      setError(exception.message);
    } finally {
      pending.current = false;
      setLoading(false);
      onUploadingChange?.(false);
      if (input.current) input.current.value = "";
    }
  };
  const paste = (event) => {
    if (disabled || loading) return;
    const image = Array.from(event.clipboardData?.items || []).find((item) =>
      item.type.startsWith("image/"),
    );
    if (!image) return;
    event.preventDefault();
    const original = image.getAsFile();
    if (!original) return;
    const extension =
      image.type === "image/jpeg"
        ? "jpg"
        : image.type === "image/webp"
          ? "webp"
          : "png";
    send(
      new File([original], `captura-${Date.now()}.${extension}`, {
        type: image.type,
      }),
    );
  };
  return (
    <Paper
      ref={container}
      variant="outlined"
      onPaste={paste}
      tabIndex={disabled ? -1 : 0}
      aria-label={`${label}; clique aqui e pressione Control V para colar uma captura`}
      aria-busy={loading}
      sx={{
        p: 2,
        minWidth: 0,
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Camera size={18} />
          <Typography variant="subtitle2">{label}</Typography>
        </Stack>
        {id && (
          <Box
            component="img"
            src={fileUrl(id)}
            alt={`Print da ${label.toLowerCase()}`}
            sx={{
              width: "100%",
              maxHeight: 220,
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        )}
        <Typography variant="caption" color="text.secondary">
          PNG, JPG ou WEBP · até 20 MB. Selecione uma foto ou cole um print com
          Ctrl + V / ⌘ V.
        </Typography>
        <Box
          component="input"
          ref={input}
          type="file"
          accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          disabled={disabled || loading}
          aria-label={`Enviar ${label}`}
          onChange={(event) => send(event.target.files?.[0])}
          sx={{ display: "none" }}
        />
        <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            startIcon={<ImagePlus size={16} />}
            variant="outlined"
            disabled={disabled || loading}
            onClick={() => input.current?.click()}
          >
            {id ? "Trocar imagem" : "Selecionar imagem"}
          </Button>
          <Button
            startIcon={<ClipboardPaste size={16} />}
            disabled={disabled || loading}
            onClick={() => container.current?.focus()}
          >
            Colar print
          </Button>
          {id && (
            <Button
              disabled={disabled || loading}
              onClick={() => {
                onChange(null);
                setError("");
              }}
            >
              Remover captura
            </Button>
          )}
        </Stack>
        {loading && (
          <>
            <Typography role="status" variant="caption">
              Enviando imagem...
            </Typography>
            <LinearProgress aria-label={`Enviando ${label}`} />
          </>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  );
}
