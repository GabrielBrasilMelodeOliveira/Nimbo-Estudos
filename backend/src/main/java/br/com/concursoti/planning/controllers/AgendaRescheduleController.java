package br.com.concursoti.planning.controllers;

import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.services.AgendaRescheduleService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agenda/reschedule")
public class AgendaRescheduleController {

  private final AgendaRescheduleService service;

  public AgendaRescheduleController(AgendaRescheduleService service) {
    this.service = service;
  }

  @PostMapping
  public List<AgendaItem> reschedule(
    @RequestBody AgendaRescheduleService.RescheduleInput input
  ) {
    return service.reschedule(input);
  }
}
