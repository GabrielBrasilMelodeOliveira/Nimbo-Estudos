package br.com.concursoti.errornotes.controllers;

import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.services.ErrornotesService;
import br.com.concursoti.errornotes.services.ErrornotesService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ErrornotesController {

  private final ErrornotesService service;

  public ErrornotesController(ErrornotesService service) {
    this.service = service;
  }

  @GetMapping("/error-notes")
  public List<ErrorNote> errorNotes() {
    return service.errorNotes();
  }

  @PostMapping("/error-notes")
  public ErrorNote addError(@RequestBody ErrorInput request) {
    return service.addError(request);
  }

  @DeleteMapping("/error-notes/{id}")
  public void deleteError(@PathVariable Long id) {
    service.deleteError(id);
  }
}
