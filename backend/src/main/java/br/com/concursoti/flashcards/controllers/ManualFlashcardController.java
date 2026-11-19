package br.com.concursoti.flashcards.controllers;

import br.com.concursoti.flashcards.dto.FlashcardView;
import br.com.concursoti.flashcards.dto.ManualFlashcardInput;
import br.com.concursoti.flashcards.services.ManualFlashcardService;
import io.github.openspacedrepetition.Rating;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flashcards/manual")
public class ManualFlashcardController {

  private final ManualFlashcardService service;

  public ManualFlashcardController(ManualFlashcardService service) {
    this.service = service;
  }

  public record ReviewInput(Rating rating, Long expectedRevision) {}

  public record UndoInput(Long expectedRevision) {}

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public FlashcardView create(@RequestBody ManualFlashcardInput input) {
    return service.create(input);
  }

  @PutMapping("/{id}")
  public FlashcardView update(
    @PathVariable Long id,
    @RequestBody ManualFlashcardInput input
  ) {
    return service.update(id, input);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }

  @PostMapping("/{id}/review")
  public FlashcardView review(
    @PathVariable Long id,
    @RequestBody ReviewInput input
  ) {
    return service.review(id, input.rating(), input.expectedRevision());
  }

  @PostMapping("/{id}/undo")
  public FlashcardView undo(
    @PathVariable Long id,
    @RequestBody UndoInput input
  ) {
    return service.undo(id, input.expectedRevision());
  }
}
