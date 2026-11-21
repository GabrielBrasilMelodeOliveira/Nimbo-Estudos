package br.com.concursoti.accounts.services;

import java.time.*;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class SignInLimiter {

  private record AttemptWindow(Instant start, int attempts) {}

  private final ConcurrentHashMap<String, AttemptWindow> attempts =
    new ConcurrentHashMap<>();

  public void check(String address, String email) {
    Instant now = Instant.now();
    attempts
      .entrySet()
      .removeIf(entry ->
        entry.getValue().start().plus(Duration.ofMinutes(15)).isBefore(now)
      );
    checkKey("address:" + address, 100, now);
    checkKey(
      "login:" + address + ":" + AccountService.normalizeEmail(email),
      12,
      now
    );
  }

  private void checkKey(String key, int maximum, Instant now) {
    if (attempts.size() > 10000) throw limited();
    var window = attempts.compute(key, (ignored, previous) ->
      previous == null
        ? new AttemptWindow(now, 1)
        : new AttemptWindow(previous.start(), previous.attempts() + 1)
    );
    if (window.attempts() > maximum) throw limited();
  }

  private ResponseStatusException limited() {
    return new ResponseStatusException(
      HttpStatus.TOO_MANY_REQUESTS,
      "Muitas tentativas. Aguarde 15 minutos antes de tentar novamente."
    );
  }
}
