package br.com.concursoti.curriculum.controllers;

import br.com.concursoti.curriculum.entities.EditalImport;
import br.com.concursoti.curriculum.repositories.EditalImportRepository;
import br.com.concursoti.curriculum.services.EditalService;
import java.util.*;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/edital")
public class EditalImportController {

  private final EditalService service;
  private final EditalImportRepository repo;

  public EditalImportController(
    EditalService service,
    EditalImportRepository repo
  ) {
    this.service = service;
    this.repo = repo;
  }

  public record PreviewRequest(String assetId) {}

  @PostMapping("/preview")
  public EditalService.Preview preview(@RequestBody PreviewRequest request) {
    return service.preview(request.assetId());
  }

  @PostMapping("/import")
  public EditalImport importReviewed(
    @RequestBody EditalService.ImportRequest request
  ) {
    return service.importReviewed(request);
  }

  @GetMapping("/imports")
  public List<EditalImport> history() {
    return repo.findAll(Sort.by(Sort.Direction.DESC, "importedAt", "id"));
  }
}
