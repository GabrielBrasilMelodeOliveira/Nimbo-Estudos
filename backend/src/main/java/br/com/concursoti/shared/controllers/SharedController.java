package br.com.concursoti.shared.controllers;

import br.com.concursoti.shared.services.SharedService;
import br.com.concursoti.shared.services.SharedService.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SharedController {

  private final SharedService service;

  public SharedController(SharedService service) {
    this.service = service;
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return service.health();
  }
}
