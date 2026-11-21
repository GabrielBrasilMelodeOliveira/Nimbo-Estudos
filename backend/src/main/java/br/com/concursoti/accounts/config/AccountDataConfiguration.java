package br.com.concursoti.accounts.config;

import br.com.concursoti.accounts.services.AccountScope;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.session.jdbc.config.annotation.SpringSessionDataSource;
import org.springframework.session.jdbc.config.annotation.SpringSessionTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Configuration
public class AccountDataConfiguration {

  @Bean
  @ConfigurationProperties("spring.datasource")
  public DataSourceProperties accountDataSourceProperties() {
    return new DataSourceProperties();
  }

  @Bean(destroyMethod = "close")
  public HikariDataSource connectionPool(
    @Qualifier("accountDataSourceProperties") DataSourceProperties properties
  ) {
    HikariDataSource pool = properties
      .initializeDataSourceBuilder()
      .type(HikariDataSource.class)
      .build();
    pool.setMaximumPoolSize(12);
    return pool;
  }

  @Bean
  @Primary
  public DataSource dataSource(HikariDataSource connectionPool) {
    return new SchemaDataSource(connectionPool, AccountScope::schema);
  }

  @Bean
  @SpringSessionDataSource
  public DataSource accountDataSource(HikariDataSource connectionPool) {
    return new SchemaDataSource(connectionPool, () -> "public");
  }

  @Bean
  public JdbcTemplate accountJdbc(
    @Qualifier("accountDataSource") DataSource dataSource
  ) {
    return new JdbcTemplate(dataSource);
  }

  @Bean
  @SpringSessionTransactionManager
  public DataSourceTransactionManager accountTransactionManager(
    @Qualifier("accountDataSource") DataSource dataSource
  ) {
    return new DataSourceTransactionManager(dataSource);
  }

  @Bean
  public TransactionTemplate accountTransactions(
    @Qualifier("accountTransactionManager") DataSourceTransactionManager manager
  ) {
    return new TransactionTemplate(manager);
  }

  @Bean
  @Primary
  public JpaTransactionManager transactionManager(
    EntityManagerFactory entityManagerFactory
  ) {
    return new JpaTransactionManager(entityManagerFactory);
  }
}
