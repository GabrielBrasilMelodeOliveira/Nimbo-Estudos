package br.com.concursoti.studying.controllers;

import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.services.StudyingService;
import br.com.concursoti.studying.services.StudyingService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudyingController {

  private final StudyingService service;

  public StudyingController(StudyingService service) {
    this.service = service;
  }

  @GetMapping("/study-sessions")
  public List<StudySession> sessions() {
    return service.sessions();
  }

  @PostMapping("/study-sessions")
  public StudySession addSession(@RequestBody SessionInput request) {
    return service.addSession(request);
  }

  @DeleteMapping("/study-sessions/{id}")
  public void deleteSession(@PathVariable Long id) {
    service.deleteSession(id);
  }
}
