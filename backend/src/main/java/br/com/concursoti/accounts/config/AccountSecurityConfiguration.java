package br.com.concursoti.accounts.config;

import br.com.concursoti.accounts.services.AccountService;
import java.util.List;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.session.*;
import org.springframework.security.web.context.*;
import org.springframework.security.web.csrf.*;

@Configuration
public class AccountSecurityConfiguration {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AccountService accounts,
    PasswordEncoder encoder
  ) {
    var provider = new DaoAuthenticationProvider(accounts);
    provider.setPasswordEncoder(encoder);
    return new ProviderManager(provider);
  }

  @Bean
  public SecurityContextRepository securityContextRepository() {
    return new DelegatingSecurityContextRepository(
      new RequestAttributeSecurityContextRepository(),
      new HttpSessionSecurityContextRepository()
    );
  }

  @Bean
  public HttpSessionCsrfTokenRepository csrfTokenRepository() {
    return new HttpSessionCsrfTokenRepository();
  }

  @Bean
  public SessionAuthenticationStrategy sessionAuthenticationStrategy(
    HttpSessionCsrfTokenRepository csrf
  ) {
    return new CompositeSessionAuthenticationStrategy(
      List.of(
        new ChangeSessionIdAuthenticationStrategy(),
        new CsrfAuthenticationStrategy(csrf)
      )
    );
  }

  @Bean
  public SecurityFilterChain securityFilterChain(
    HttpSecurity http,
    AccountService accounts,
    SecurityContextRepository context,
    HttpSessionCsrfTokenRepository csrf
  ) throws Exception {
    return http
      .cors(Customizer.withDefaults())
      .csrf(config -> config.csrfTokenRepository(csrf))
      .securityContext(config -> config.securityContextRepository(context))
      .sessionManagement(config ->
        config.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
      )
      .authorizeHttpRequests(config ->
        config
          .requestMatchers(
            "/api/auth/session",
            "/api/auth/login",
            "/api/auth/register",
            "/error"
          )
          .permitAll()
          .anyRequest()
          .authenticated()
      )
      .exceptionHandling(config ->
        config
          .authenticationEntryPoint((request, response, exception) -> {
            response.setStatus(401);
            response.setContentType("application/json;charset=UTF-8");
            response
              .getWriter()
              .write("{\"error\":\"Entre na sua conta para continuar.\"}");
          })
          .accessDeniedHandler((request, response, exception) -> {
            response.setStatus(403);
            response.setContentType("application/json;charset=UTF-8");
            response
              .getWriter()
              .write(
                "{\"error\":\"Sua sessão precisa ser atualizada. Recarregue a página e tente novamente.\"}"
              );
          })
      )
      .requestCache(config -> config.disable())
      .headers(config -> config.frameOptions(frame -> frame.sameOrigin()))
      .logout(config ->
        config
          .logoutUrl("/api/auth/logout")
          .deleteCookies("NIMBOSESSION")
          .logoutSuccessHandler((request, response, authentication) ->
            response.setStatus(204)
          )
      )
      .addFilterAfter(
        new AccountScopeFilter(accounts),
        SecurityContextHolderFilter.class
      )
      .build();
  }
}
