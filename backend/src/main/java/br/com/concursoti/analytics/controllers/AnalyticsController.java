package br.com.concursoti.analytics.controllers;

import br.com.concursoti.analytics.services.AnalyticsService;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

  private final AnalyticsService service;

  public AnalyticsController(AnalyticsService service) {
    this.service = service;
  }

  @GetMapping
  public Map<String, Object> getAnalytics() {
    return service.analytics();
  }
}
