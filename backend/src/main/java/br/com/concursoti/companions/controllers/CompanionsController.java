package br.com.concursoti.companions.controllers;

import br.com.concursoti.companions.services.CompanionsService;
import br.com.concursoti.companions.services.CompanionsService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CompanionsController {

  private final CompanionsService service;

  public CompanionsController(CompanionsService service) {
    this.service = service;
  }

  @PostMapping("/pet/interact")
  public Map<String, Object> interactPet(@RequestBody PetInteraction request) {
    return service.interactPet(request);
  }

  @GetMapping("/pet")
  public Map<String, Object> getPet() {
    return service.getPet();
  }

  @PostMapping("/pet")
  public Map<String, Object> choosePet(@RequestBody PetSelection selection) {
    return service.choosePet(selection);
  }

  @PutMapping("/pet/active/{id}")
  public Map<String, Object> activatePet(@PathVariable Long id) {
    return service.activatePet(id);
  }
}
