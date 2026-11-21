package br.com.concursoti.accounts.services;

import br.com.concursoti.accounts.repositories.AccountRepository;
import java.security.SecureRandom;
import java.util.Base64;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.*;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class AccountBootstrap implements ApplicationRunner {

  private final AccountRepository accounts;
  private final AccountSchemaService schemas;
  private final JdbcTemplate jdbc;
  private final TransactionTemplate transactions;
  private final String configuredKey;

  public AccountBootstrap(
    AccountRepository accounts,
    AccountSchemaService schemas,
    @Qualifier("accountJdbc") JdbcTemplate jdbc,
    @Qualifier("accountTransactions") TransactionTemplate transactions,
    @Value("${nimbo.accounts.setup-key:}") String key
  ) {
    this.accounts = accounts;
    this.schemas = schemas;
    this.jdbc = jdbc;
    this.transactions = transactions;
    this.configuredKey = key;
  }

  @Override
  public void run(ApplicationArguments arguments) {
    if (accounts.setupRequired()) {
      byte[] bytes = new byte[24];
      new SecureRandom().nextBytes(bytes);
      String key = configuredKey.isBlank()
        ? Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
        : configuredKey.strip();
      jdbc.update(
        "update public.nimbo_installation set setup_key_hash=? where id=1 and completed=false",
        AccountService.setupDigest(key)
      );
      LoggerFactory.getLogger(getClass()).warn(
        "Primeira conta Nimbo: use a chave de configuração NIMBO_SETUP_KEY={} . Ela dá acesso aos dados já existentes e deixa de valer após o primeiro cadastro.",
        key
      );
    }
    for (String schema : accounts.schemas())
      transactions.executeWithoutResult(status -> schemas.synchronize(schema));
  }
}
