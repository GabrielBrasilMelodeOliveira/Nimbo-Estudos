package br.com.concursoti.assets.controllers;

import br.com.concursoti.assets.entities.StoredAsset;
import br.com.concursoti.assets.services.AssetService;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

  private final AssetService assets;

  public UploadController(AssetService assets) {
    this.assets = assets;
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public Map<String, Object> upload(@RequestPart("file") MultipartFile file) {
    StoredAsset a = assets.save(file);
    return Map.of(
      "id",
      a.id,
      "name",
      a.originalName,
      "type",
      a.mediaType,
      "size",
      a.sizeBytes,
      "contentUrl",
      "/api/uploads/" + a.id + "/content",
      "previewUrl",
      "/api/uploads/" + a.id + "/preview"
    );
  }

  @GetMapping("/{id}/content")
  public ResponseEntity<byte[]> content(
    @PathVariable String id,
    @RequestParam(defaultValue = "false") boolean download
  ) {
    StoredAsset a = assets.get(id);
    ContentDisposition disposition = (
      download ? ContentDisposition.attachment() : ContentDisposition.inline()
    )
      .filename(a.originalName, StandardCharsets.UTF_8)
      .build();
    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(a.mediaType))
      .contentLength(a.sizeBytes)
      .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
      .header("X-Content-Type-Options", "nosniff")
      .body(assets.bytes(id));
  }

  @GetMapping("/{id}/preview")
  public ResponseEntity<byte[]> preview(@PathVariable String id) {
    byte[] png = assets.preview(id);
    String type = assets.type(id);
    MediaType mime = type.startsWith("image/")
      ? MediaType.parseMediaType(type)
      : MediaType.IMAGE_PNG;
    return ResponseEntity.ok()
      .contentType(mime)
      .header("Cache-Control", "no-store")
      .header("X-Content-Type-Options", "nosniff")
      .body(png);
  }
}
