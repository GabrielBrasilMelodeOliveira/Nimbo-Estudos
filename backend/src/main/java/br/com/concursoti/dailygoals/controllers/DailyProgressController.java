package br.com.concursoti.dailygoals.controllers;

import br.com.concursoti.dailygoals.services.DailyProgressService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/daily-progress")
public class DailyProgressController {

  private final DailyProgressService service;

  public DailyProgressController(DailyProgressService service) {
    this.service = service;
  }

  @GetMapping
  public DailyProgressService.ProgressView current() {
    return service.current();
  }

  @PutMapping
  public DailyProgressService.ProgressView update(
    @RequestBody DailyProgressService.GoalInput input
  ) {
    return service.update(input);
  }
}
