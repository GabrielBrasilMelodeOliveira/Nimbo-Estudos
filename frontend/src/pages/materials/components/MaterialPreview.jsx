import { Alert, Box, Stack, Typography } from "@mui/material";
import { fileUrl } from "../../../shared/services/api.js";
import { youtubeVideo } from "../utils/youtube.js";
import DocxPreview from "./DocxPreview.jsx";

export default function MaterialPreview({ material, expanded = false }) {
  const source = material.assetId ? fileUrl(material.assetId) : material.url;
  const video = !material.assetId && youtubeVideo(material.url);
  const height = expanded ? "calc(100dvh - 170px)" : "65vh";
  if (video)
    return (
      <Stack spacing={1}>
        <Box
          component="iframe"
          title={`Vídeo ${material.title}`}
          src={video.embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            height: expanded ? height : "auto",
            minHeight: 240,
            border: 0,
            borderRadius: 2,
            bgcolor: "#111827",
          }}
        />
        <Typography variant="caption" color="text.secondary">
          Se o autor restringir a reprodução incorporada, use “Abrir link” para
          assistir no YouTube.
        </Typography>
      </Stack>
    );
  if (material.type === "PDF" && source)
    return (
      <Stack spacing={1}>
        <Box
          component="iframe"
          title={`Leitura do PDF ${material.title}`}
          src={`${source.split("#")[0]}#toolbar=1&view=FitH`}
          sx={{
            width: "100%",
            height,
            minHeight: 360,
            border: 0,
            borderRadius: 2,
          }}
        />
        <Typography variant="caption" color="text.secondary">
          Se o navegador não exibir o PDF, use o botão de download ou abra o
          link.
        </Typography>
      </Stack>
    );
  if (material.type === "DOCX" && source)
    return (
      <DocxPreview source={source} title={material.title} height={height} />
    );
  if (material.type === "IMAGE" && source)
    return (
      <Box
        sx={{
          bgcolor: "action.hover",
          borderRadius: 2,
          overflow: "auto",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={source}
          alt={material.title}
          sx={{ maxWidth: "100%", maxHeight: height, objectFit: "contain" }}
        />
      </Box>
    );
  return (
    <Alert severity="info">
      Este material está em outro site. Use “Abrir link” para acessá-lo. Para
      vídeos aqui, adicione o link de um vídeo do YouTube.
    </Alert>
  );
}
