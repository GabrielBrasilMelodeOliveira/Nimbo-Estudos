package br.com.concursoti.companions.services;

import br.com.concursoti.companions.dto.CompanionAppearance;
import java.util.*;

@org.springframework.stereotype.Service
public class CompanionsService {

  private final PetService pet;

  public CompanionsService(PetService pet) {
    this.pet = pet;
  }

  public record PetSelection(String species) {}

  public record PetInteraction(String action) {}

  public Map<String, Object> interactPet(PetInteraction request) {
    return pet.interact(request.action());
  }

  public Map<String, Object> getPet() {
    return pet.current();
  }

  public Map<String, Object> choosePet(PetSelection selection) {
    return pet.choose(selection.species());
  }

  public Map<String, Object> restartPet(Long id) {
    return pet.restart(id);
  }

  public Map<String, Object> customizePet(
    Long id,
    CompanionAppearance appearance
  ) {
    return pet.customize(id, appearance);
  }

  public Map<String, Object> activatePet(Long id) {
    return pet.activate(id);
  }
}
