package br.com.concursoti.accounts.controllers;

import br.com.concursoti.accounts.entities.Account.AccountView;
import br.com.concursoti.accounts.repositories.AccountRepository;
import br.com.concursoti.accounts.services.*;
import jakarta.servlet.http.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.Map;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

  private final AccountService accounts;
  private final AccountRepository repository;
  private final AuthenticationManager authentication;
  private final SessionAuthenticationStrategy sessions;
  private final SecurityContextRepository contexts;
  private final SignInLimiter limiter;

  public AuthenticationController(
    AccountService accounts,
    AccountRepository repository,
    AuthenticationManager authentication,
    SessionAuthenticationStrategy sessions,
    SecurityContextRepository contexts,
    SignInLimiter limiter
  ) {
    this.accounts = accounts;
    this.repository = repository;
    this.authentication = authentication;
    this.sessions = sessions;
    this.contexts = contexts;
    this.limiter = limiter;
  }

  public record Registration(
    @NotBlank @Size(min = 2, max = 80) String name,
    @NotBlank @Email @Size(max = 254) String email,
    @NotBlank @Size(min = 10, max = 128) String password,
    String setupKey
  ) {}

  public record Credentials(
    @NotBlank @Email @Size(max = 254) String email,
    @NotBlank @Size(max = 128) String password
  ) {}

  public record SessionView(
    AccountView user,
    String csrfToken,
    boolean setupRequired
  ) {}

  @GetMapping("/session")
  public SessionView session(Authentication current, CsrfToken csrf) {
    var user = current == null ? null : accounts.find(current.getName()).view();
    return new SessionView(user, csrf.getToken(), repository.setupRequired());
  }

  @PostMapping("/register")
  public AccountView register(
    @Valid @RequestBody Registration input,
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    ensureAnonymous();
    limiter.check(request.getRemoteAddr(), input.email());
    var account = accounts.register(
      input.name(),
      input.email(),
      input.password(),
      input.setupKey()
    );
    signIn(input.email(), input.password(), request, response);
    return account.view();
  }

  @PostMapping("/login")
  public AccountView login(
    @Valid @RequestBody Credentials input,
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    ensureAnonymous();
    limiter.check(request.getRemoteAddr(), input.email());
    signIn(input.email(), input.password(), request, response);
    return accounts.find(input.email()).view();
  }

  private void ensureAnonymous() {
    var current = SecurityContextHolder.getContext().getAuthentication();
    if (
      current != null && !(current instanceof AnonymousAuthenticationToken)
    ) throw new ResponseStatusException(
      HttpStatus.CONFLICT,
      "Saia da conta atual antes de entrar em outra."
    );
  }

  private void signIn(
    String email,
    String password,
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    Authentication result = authentication.authenticate(
      UsernamePasswordAuthenticationToken.unauthenticated(
        AccountService.normalizeEmail(email),
        password
      )
    );
    sessions.onAuthentication(result, request, response);
    var context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(result);
    SecurityContextHolder.setContext(context);
    contexts.saveContext(context, request, response);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<Map<String, String>> invalidCredentials(
    AuthenticationException exception
  ) {
    return ResponseEntity.status(401).body(
      Map.of("error", "E-mail ou senha inválidos.")
    );
  }
}
