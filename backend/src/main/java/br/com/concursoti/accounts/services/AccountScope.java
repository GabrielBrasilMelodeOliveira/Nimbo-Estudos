package br.com.concursoti.accounts.services;

/** Never populated from request parameters; only from the authenticated account. */
public final class AccountScope implements AutoCloseable {

  private static final ThreadLocal<String> CURRENT = new ThreadLocal<>();
  private final String previous;

  private AccountScope(String schema) {
    if (
      !"public".equals(schema) && !schema.matches("nimbo_[a-f0-9]{32}")
    ) throw new IllegalArgumentException("Área de usuário inválida.");
    previous = CURRENT.get();
    CURRENT.set(schema);
  }

  public static AccountScope open(String schema) {
    return new AccountScope(schema);
  }

  public static String schema() {
    return CURRENT.get() == null ? "public" : CURRENT.get();
  }

  @Override
  public void close() {
    if (previous == null) CURRENT.remove();
    else CURRENT.set(previous);
  }
}
