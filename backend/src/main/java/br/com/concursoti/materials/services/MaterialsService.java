package br.com.concursoti.materials.services;

import br.com.concursoti.assets.services.AssetService;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.materials.entities.Material;
import br.com.concursoti.materials.repositories.MaterialRepository;
import br.com.concursoti.materials.services.DocumentService;
import java.net.URI;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class MaterialsService {

  private final TopicRepository topics;
  private final MaterialRepository materials;
  private final PetService pet;
  private final AssetService assets;
  private final DocumentService documents;

  public MaterialsService(
    TopicRepository topics,
    MaterialRepository materials,
    PetService pet,
    AssetService assets,
    DocumentService documents
  ) {
    this.topics = topics;
    this.materials = materials;
    this.pet = pet;
    this.assets = assets;
    this.documents = documents;
  }

  private String required(String value, String field, int max) {
    if (value == null || value.isBlank()) throw new IllegalArgumentException(
      "Preencha o campo: " + field
    );
    if (value.trim().length() > max) throw new IllegalArgumentException(
      field + " excede " + max + " caracteres."
    );
    return value.trim();
  }

  private Topic topic(Long id) {
    if (id == null) throw new IllegalArgumentException("Informe um assunto.");
    return topics.findById(id).orElseThrow();
  }

  public record MaterialInput(
    String title,
    String url,
    Material.Type type,
    Long topicId,
    String description,
    String assetId,
    String previewAssetId
  ) {}

  public record MaterialStatus(
    Boolean readDone,
    Boolean reviewed,
    Topic.Mastery mastery,
    String notes
  ) {}

  public record DocumentEdit(String content) {}

  public List<Material> materials() {
    return materials.findAll(Sort.by("title"));
  }

  public Material addMaterial(MaterialInput request) {
    Material m = new Material();
    m.title = required(request.title(), "Título", 140);
    if (request.assetId() != null && !request.assetId().isBlank()) {
      assets.ensureDocument(request.assetId());
      m.assetId = request.assetId();
      m.originalAssetId = request.assetId();
    }
    if (request.url() != null && !request.url().isBlank()) {
      m.url = request.url().trim();
      if (m.url.length() > 2000) throw new IllegalArgumentException(
        "URL muito longa."
      );
      try {
        URI uri = URI.create(m.url);
        if (
          !Set.of("https", "http").contains(uri.getScheme()) ||
          uri.getHost() == null
        ) throw new Exception();
      } catch (Exception e) {
        throw new IllegalArgumentException(
          "Informe uma URL HTTP ou HTTPS válida."
        );
      }
    } else m.url = "";
    if (
      m.assetId == null && m.url.isBlank()
    ) throw new IllegalArgumentException(
      "Envie um arquivo ou informe um link."
    );
    m.type = request.type() == null ? Material.Type.OTHER : request.type();
    if (m.assetId != null) {
      String media = assets.type(m.assetId);
      m.type = media.equals("application/pdf")
        ? Material.Type.PDF
        : media.contains("wordprocessingml")
          ? Material.Type.DOCX
          : Material.Type.IMAGE;
    }
    if (
      request.previewAssetId() != null && !request.previewAssetId().isBlank()
    ) {
      assets.ensureImage(request.previewAssetId());
      m.previewAssetId = request.previewAssetId();
    }
    if (request.topicId() != null) m.topic = topic(request.topicId());
    m.description =
      request.description() == null
        ? ""
        : request
            .description()
            .substring(0, Math.min(400, request.description().length()));
    return materials.save(m);
  }

  public Material statusMaterial(Long id, MaterialStatus request) {
    Material m = materials.findById(id).orElseThrow();
    if (request.readDone() != null) {
      if (request.readDone() && !Boolean.TRUE.equals(m.readRewarded)) {
        pet.awardExperience(10);
        m.readRewarded = true;
      }
      m.readDone = request.readDone();
      m.readAt = request.readDone() ? LocalDate.now() : null;
    }
    if (request.reviewed() != null) {
      if (request.reviewed() && !Boolean.TRUE.equals(m.reviewRewarded)) {
        pet.awardExperience(15);
        m.reviewRewarded = true;
      }
      m.reviewed = request.reviewed();
      m.reviewedAt = request.reviewed() ? LocalDate.now() : null;
    }
    if (request.mastery() != null) m.mastery = request.mastery();
    if (request.notes() != null) {
      if (request.notes().length() > 12000) throw new IllegalArgumentException(
        "Notas limitadas a 12 mil caracteres."
      );
      m.notes = request.notes();
    }
    return materials.save(m);
  }

  public Map<String, Object> documentText(Long id) {
    Material m = materials.findById(id).orElseThrow();
    if (m.assetId == null) throw new IllegalArgumentException(
      "Este material é um link externo."
    );
    String type = assets.type(m.assetId);
    if (!type.contains("wordprocessingml")) throw new IllegalArgumentException(
      "O editor de texto é para DOCX. PDFs podem receber anotações."
    );
    return Map.of("content", assets.docxText(m.assetId));
  }

  public Material editDocument(Long id, DocumentEdit request) {
    Material m = materials.findById(id).orElseThrow();
    if (m.assetId == null) throw new IllegalArgumentException(
      "Envie um arquivo antes de editar."
    );
    String type = assets.type(m.assetId);
    if (
      request.content() == null || request.content().length() > 250000
    ) throw new IllegalArgumentException("Texto muito longo.");
    byte[] newBytes;
    if (type.contains("wordprocessingml")) newBytes = assets.docxFromText(
      request.content()
    );
    else if (type.equals("application/pdf")) {
      if (request.content().equals(m.notes)) return m; // evita anexar a mesma anotação duas vezes
      newBytes = documents.appendPdfNotes(m.assetId, request.content());
    } else throw new IllegalArgumentException(
      "Use um PDF ou DOCX para editar."
    );
    m.assetId = assets.version(m.assetId, newBytes).id;
    if (type.equals("application/pdf")) m.notes = request.content();
    m.readDone = true;
    m.readAt = LocalDate.now();
    return materials.save(m);
  }

  public void deleteMaterial(Long id) {
    materials.delete(materials.findById(id).orElseThrow());
  }
}
