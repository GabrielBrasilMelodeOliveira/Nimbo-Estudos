package br.com.concursoti.planning.controllers;

import br.com.concursoti.planning.services.DailyStudyPlanService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study-plan")
public class DailyStudyPlanController {

  private final DailyStudyPlanService service;

  public DailyStudyPlanController(DailyStudyPlanService service) {
    this.service = service;
  }

  @GetMapping
  public List<DailyStudyPlanService.PlanView> list() {
    return service.list();
  }

  @PutMapping("/{date}")
  public DailyStudyPlanService.PlanView save(
    @PathVariable LocalDate date,
    @RequestBody DailyStudyPlanService.PlanInput request
  ) {
    return service.save(date, request);
  }
}
