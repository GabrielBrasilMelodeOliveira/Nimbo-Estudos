import { designColors } from "../../../shared/theme/designColors.js";
import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { renderDocumentPreview } from "../services/documentPreview.js";

export default function DocxPreview({ source, title, height }) {
  const [preview, setPreview] = useState({ source: "", html: "", error: "" });
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(source, { signal: controller.signal });
        if (!response.ok)
          throw new Error("Não foi possível carregar o documento.");
        const html = await renderDocumentPreview(await response.arrayBuffer());
        if (!controller.signal.aborted) setPreview({ source, html, error: "" });
      } catch (exception) {
        if (!controller.signal.aborted)
          setPreview({
            source,
            html: "",
            error:
              "Não foi possível visualizar este DOCX. Se for um link externo, envie o arquivo ao Nimbo para lê-lo aqui. O original continua disponível para download.",
          });
      }
    };
    load();
    return () => controller.abort();
  }, [source]);
  if (preview.source !== source)
    return (
      <Stack direction="row" spacing={2} sx={{ p: 4 }}>
        <CircularProgress size={24} />
        <Typography>Preparando visualização do DOCX…</Typography>
      </Stack>
    );
  if (preview.error) return <Alert severity="warning">{preview.error}</Alert>;
  return (
    <Box
      component="iframe"
      title={`Leitura do DOCX ${title}`}
      srcDoc={preview.html}
      sandbox="allow-same-origin"
      sx={{
        width: "100%",
        height,
        border: 0,
        bgcolor: designColors.surface,
        borderRadius: 2,
      }}
    />
  );
}
