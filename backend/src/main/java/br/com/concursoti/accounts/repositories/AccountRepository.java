package br.com.concursoti.accounts.repositories;

import br.com.concursoti.accounts.entities.Account;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Repository;

@Repository
public class AccountRepository {

  private final JdbcTemplate jdbc;

  public AccountRepository(@Qualifier("accountJdbc") JdbcTemplate jdbc) {
    this.jdbc = jdbc;
    new ResourceDatabasePopulator(
      new ClassPathResource("accounts-schema.sql")
    ).execute(jdbc.getDataSource());
  }

  public Optional<Account> findByEmail(String email) {
    return jdbc
      .query(
        "select * from public.nimbo_accounts where email = ?",
        AccountRepository::map,
        email
      )
      .stream()
      .findFirst();
  }

  public boolean setupRequired() {
    return Boolean.FALSE.equals(
      jdbc.queryForObject(
        "select completed from public.nimbo_installation where id = 1",
        Boolean.class
      )
    );
  }

  public List<String> schemas() {
    return jdbc.queryForList(
      "select schema_name from public.nimbo_accounts where schema_name <> 'public'",
      String.class
    );
  }

  public void save(Account account) {
    jdbc.update(
      "insert into public.nimbo_accounts (id, name, email, password_hash, schema_name, legacy_owner) values (?, ?, ?, ?, ?, ?)",
      account.id(),
      account.name(),
      account.email(),
      account.passwordHash(),
      account.schemaName(),
      account.legacyOwner()
    );
  }

  private static Account map(ResultSet row, int number) throws SQLException {
    return new Account(
      row.getObject("id", UUID.class),
      row.getString("name"),
      row.getString("email"),
      row.getString("password_hash"),
      row.getString("schema_name"),
      row.getBoolean("legacy_owner")
    );
  }
}
