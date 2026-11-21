package br.com.concursoti.accounts.config;

import br.com.concursoti.accounts.services.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class AccountScopeFilter extends OncePerRequestFilter {

  private final AccountService accounts;

  public AccountScopeFilter(AccountService accounts) {
    this.accounts = accounts;
  }

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain chain
  ) throws ServletException, IOException {
    var authentication = SecurityContextHolder.getContext().getAuthentication();
    response.setHeader("Cache-Control", "no-store");
    if (
      authentication == null ||
      !authentication.isAuthenticated() ||
      authentication instanceof AnonymousAuthenticationToken
    ) {
      chain.doFilter(request, response);
      return;
    }
    var account = accounts.find(authentication.getName());
    String expected = request.getHeader("X-Nimbo-Account");
    if (expected == null) expected = request.getParameter("account");
    if (expected != null && !expected.equals(account.id().toString())) {
      response.setStatus(409);
      response.setContentType("application/json;charset=UTF-8");
      response
        .getWriter()
        .write(
          "{\"error\":\"A conta mudou em outra aba. Entre novamente antes de continuar.\",\"code\":\"ACCOUNT_CHANGED\"}"
        );
      return;
    }
    try (var ignored = AccountScope.open(account.schemaName())) {
      chain.doFilter(request, response);
    }
  }
}
