package br.com.concursoti.analytics.controllers;

import br.com.concursoti.analytics.services.DashboardService;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final DashboardService service;

  public DashboardController(DashboardService service) {
    this.service = service;
  }

  @GetMapping
  public Map<String, Object> getDashboard() {
    return service.dashboard();
  }
}
