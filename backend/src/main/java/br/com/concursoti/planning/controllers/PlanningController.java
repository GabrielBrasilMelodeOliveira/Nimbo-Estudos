package br.com.concursoti.planning.controllers;

import br.com.concursoti.planning.entities.StudyPlan;
import br.com.concursoti.planning.services.PlanningService;
import br.com.concursoti.planning.services.PlanningService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PlanningController {

  private final PlanningService service;

  public PlanningController(PlanningService service) {
    this.service = service;
  }

  @GetMapping("/plan")
  public StudyPlan plan() {
    return service.plan();
  }

  @PutMapping("/plan")
  public StudyPlan updatePlan(@RequestBody PlanInput request) {
    return service.updatePlan(request);
  }
}
