package br.com.concursoti.exams.controllers;

import br.com.concursoti.exams.entities.MockExam;
import br.com.concursoti.exams.services.ExamsService;
import br.com.concursoti.exams.services.ExamsService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExamsController {

  private final ExamsService service;

  public ExamsController(ExamsService service) {
    this.service = service;
  }

  @GetMapping("/mock-exams")
  public List<MockExam> mockExams() {
    return service.mockExams();
  }

  @PostMapping("/mock-exams")
  public MockExam addExam(@RequestBody ExamInput request) {
    return service.addExam(request);
  }

  @DeleteMapping("/mock-exams/{id}")
  public void deleteExam(@PathVariable Long id) {
    service.deleteExam(id);
  }
}
