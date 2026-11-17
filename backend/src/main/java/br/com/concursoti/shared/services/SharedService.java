package br.com.concursoti.shared.services;

import java.util.*;

@org.springframework.stereotype.Service
public class SharedService {

  public SharedService() {}

  public Map<String, String> health() {
    return Map.of("status", "ok");
  }
}
