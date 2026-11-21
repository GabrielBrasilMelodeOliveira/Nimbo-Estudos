package br.com.concursoti.accounts.config;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.function.Supplier;
import javax.sql.DataSource;
import org.springframework.jdbc.datasource.AbstractDataSource;

/** Every borrowed connection gets an explicit search_path, including reused pool connections. */
public final class SchemaDataSource extends AbstractDataSource {

  private final DataSource delegate;
  private final Supplier<String> schema;

  public SchemaDataSource(DataSource delegate, Supplier<String> schema) {
    this.delegate = delegate;
    this.schema = schema;
  }

  @Override
  public Connection getConnection() throws SQLException {
    return prepare(delegate.getConnection());
  }

  @Override
  public Connection getConnection(
    String username,
    String password
  ) throws SQLException {
    return prepare(delegate.getConnection(username, password));
  }

  private Connection prepare(Connection connection) throws SQLException {
    try {
      connection.setSchema(schema.get());
      return connection;
    } catch (SQLException | RuntimeException exception) {
      connection.close();
      throw exception;
    }
  }
}
