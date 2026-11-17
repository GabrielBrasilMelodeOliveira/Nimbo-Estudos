package br.com.concursoti.curriculum.controllers;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.services.CurriculumService;
import br.com.concursoti.curriculum.services.CurriculumService.*;
import br.com.concursoti.reviews.entities.ReviewTask;
import jakarta.transaction.Transactional;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CurriculumController {

  private final CurriculumService service;

  public CurriculumController(CurriculumService service) {
    this.service = service;
  }

  @GetMapping("/disciplines")
  public List<Discipline> disciplines() {
    return service.disciplines();
  }

  @PostMapping("/disciplines")
  public Discipline addDiscipline(@RequestBody DisciplineInput request) {
    return service.addDiscipline(request);
  }

  @PatchMapping("/disciplines/{id}/priority")
  public Discipline tuneDiscipline(
    @PathVariable Long id,
    @RequestBody DisciplineTuning request
  ) {
    return service.tuneDiscipline(id, request);
  }

  @PutMapping("/disciplines/reorder")
  public List<Discipline> reorderDisciplines(@RequestBody List<Long> order) {
    return service.reorderDisciplines(order);
  }

  @GetMapping("/topics")
  public List<Topic> topics() {
    return service.topics();
  }

  @PostMapping("/topics")
  public Topic addTopic(@RequestBody TopicInput request) {
    return service.addTopic(request);
  }

  @Transactional
  @PutMapping("/topics/{id}")
  public Topic updateTopic(
    @PathVariable Long id,
    @RequestBody TopicInput request
  ) {
    return service.updateTopic(id, request);
  }

  @PostMapping("/topics/{id}/assimilate")
  @Transactional
  public ReviewTask assessTopic(
    @PathVariable Long id,
    @RequestBody AssimilationInput request
  ) {
    return service.assessTopic(id, request);
  }

  @DeleteMapping("/topics/{id}")
  @Transactional
  public void deleteTopic(@PathVariable Long id) {
    service.deleteTopic(id);
  }
}
