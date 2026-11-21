package br.com.concursoti.accounts.services;

import br.com.concursoti.accounts.entities.Account;
import br.com.concursoti.accounts.repositories.AccountRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AccountService implements UserDetailsService {

  private final AccountRepository repository;
  private final AccountSchemaService schemas;
  private final JdbcTemplate jdbc;
  private final TransactionTemplate transactions;
  private final PasswordEncoder passwords;

  public AccountService(
    AccountRepository repository,
    AccountSchemaService schemas,
    @Qualifier("accountJdbc") JdbcTemplate jdbc,
    @Qualifier("accountTransactions") TransactionTemplate transactions,
    PasswordEncoder passwords
  ) {
    this.repository = repository;
    this.schemas = schemas;
    this.jdbc = jdbc;
    this.transactions = transactions;
    this.passwords = passwords;
  }

  public static String normalizeEmail(String email) {
    return email.strip().toLowerCase(Locale.ROOT);
  }

  public Account find(String email) {
    return repository
      .findByEmail(normalizeEmail(email))
      .orElseThrow(() ->
        new UsernameNotFoundException("E-mail ou senha inválidos.")
      );
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    Account account = find(email);
    return User.withUsername(account.email())
      .password(account.passwordHash())
      .roles("USER")
      .build();
  }

  public Account register(
    String name,
    String email,
    String password,
    String setupKey
  ) {
    if (
      password.getBytes(StandardCharsets.UTF_8).length > 72
    ) throw new IllegalArgumentException(
      "A senha deve ter até 72 bytes (acentos podem ocupar mais de um). "
    );
    String displayName = name.strip();
    if (displayName.length() < 2) throw new IllegalArgumentException(
      "Informe seu nome com pelo menos 2 caracteres."
    );
    String normalizedEmail = normalizeEmail(email),
      hash = passwords.encode(password);
    try {
      return transactions.execute(status -> {
        var installation = jdbc.queryForMap(
          "select completed, setup_key_hash from public.nimbo_installation where id=1 for update"
        );
        boolean initial = !Boolean.TRUE.equals(installation.get("completed"));
        if (
          initial &&
          !validSetupKey(setupKey, (String) installation.get("setup_key_hash"))
        ) throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "A chave de configuração inicial é inválida. Confira os logs da API."
        );
        UUID id = UUID.randomUUID();
        String schema = initial
          ? "public"
          : "nimbo_" + id.toString().replace("-", "");
        Account account = new Account(
          id,
          displayName,
          normalizedEmail,
          hash,
          schema,
          initial
        );
        repository.save(account);
        if (!initial) schemas.synchronize(schema);
        if (initial) jdbc.update(
          "update public.nimbo_installation set completed=true, setup_key_hash=null where id=1"
        );
        return account;
      });
    } catch (DataIntegrityViolationException exception) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Não foi possível cadastrar este e-mail. Se você já tem conta, entre com sua senha."
      );
    }
  }

  public static String setupDigest(String value) {
    try {
      return HexFormat.of().formatHex(
        MessageDigest.getInstance("SHA-256").digest(
          value.getBytes(StandardCharsets.UTF_8)
        )
      );
    } catch (NoSuchAlgorithmException exception) {
      throw new IllegalStateException(exception);
    }
  }

  private static boolean validSetupKey(String provided, String expected) {
    return (
      provided != null &&
      expected != null &&
      MessageDigest.isEqual(
        setupDigest(provided.strip()).getBytes(StandardCharsets.US_ASCII),
        expected.getBytes(StandardCharsets.US_ASCII)
      )
    );
  }
}
