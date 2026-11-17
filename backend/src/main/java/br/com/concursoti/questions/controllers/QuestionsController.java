package br.com.concursoti.questions.controllers;

import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.services.QuestionsService;
import br.com.concursoti.questions.services.QuestionsService.*;
import jakarta.transaction.Transactional;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class QuestionsController {

  private final QuestionsService service;

  public QuestionsController(QuestionsService service) {
    this.service = service;
  }

  @GetMapping("/questions")
  public List<QuestionRecord> questions() {
    return service.questions();
  }

  @PostMapping("/questions")
  @Transactional
  public QuestionRecord addQuestions(@RequestBody QuestionInput request) {
    return service.addQuestions(request);
  }

  @DeleteMapping("/questions/{id}")
  public void deleteQuestions(@PathVariable Long id) {
    service.deleteQuestions(id);
  }
}
