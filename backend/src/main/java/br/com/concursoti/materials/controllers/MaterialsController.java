package br.com.concursoti.materials.controllers;

import br.com.concursoti.materials.entities.Material;
import br.com.concursoti.materials.services.MaterialsService;
import br.com.concursoti.materials.services.MaterialsService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MaterialsController {

  private final MaterialsService service;

  public MaterialsController(MaterialsService service) {
    this.service = service;
  }

  @GetMapping("/materials")
  public List<Material> materials() {
    return service.materials();
  }

  @PostMapping("/materials")
  public Material addMaterial(@RequestBody MaterialInput request) {
    return service.addMaterial(request);
  }

  @PatchMapping("/materials/{id}/status")
  public Material statusMaterial(
    @PathVariable Long id,
    @RequestBody MaterialStatus request
  ) {
    return service.statusMaterial(id, request);
  }

  @GetMapping("/materials/{id}/document")
  public Map<String, Object> documentText(@PathVariable Long id) {
    return service.documentText(id);
  }

  @PutMapping("/materials/{id}/document")
  public Material editDocument(
    @PathVariable Long id,
    @RequestBody DocumentEdit request
  ) {
    return service.editDocument(id, request);
  }

  @DeleteMapping("/materials/{id}")
  public void deleteMaterial(@PathVariable Long id) {
    service.deleteMaterial(id);
  }
}
