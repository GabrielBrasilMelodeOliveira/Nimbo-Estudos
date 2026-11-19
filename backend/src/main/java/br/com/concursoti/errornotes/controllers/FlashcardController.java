package br.com.concursoti.errornotes.controllers;

import br.com.concursoti.errornotes.services.FlashcardService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({ "/api/flashcards", "/api/error-notes/flashcards" })
public class FlashcardController {

  private final FlashcardService flashcardService;

  public FlashcardController(FlashcardService flashcardService) {
    this.flashcardService = flashcardService;
  }

  @GetMapping
  public List<FlashcardService.FlashcardView> list() {
    return flashcardService.list();
  }

  @PatchMapping("/{id}/link")
  @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
  public void setLinked(
    @PathVariable Long id,
    @RequestBody FlashcardService.LinkInput request
  ) {
    flashcardService.setLinked(id, request);
  }

  @PostMapping("/{id}/undo")
  public FlashcardService.FlashcardView undo(
    @PathVariable Long id,
    @RequestBody FlashcardService.UndoInput request
  ) {
    return flashcardService.undo(id, request);
  }

  @PostMapping("/{id}/review")
  public FlashcardService.FlashcardView review(
    @PathVariable Long id,
    @RequestBody FlashcardService.ReviewInput request
  ) {
    return flashcardService.review(id, request);
  }
}
