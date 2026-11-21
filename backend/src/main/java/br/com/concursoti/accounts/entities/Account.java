package br.com.concursoti.accounts.entities;

import java.util.UUID;

public record Account(
  UUID id,
  String name,
  String email,
  String passwordHash,
  String schemaName,
  boolean legacyOwner
) {
  public AccountView view() {
    return new AccountView(id, name, email, legacyOwner);
  }

  public record AccountView(
    UUID id,
    String name,
    String email,
    boolean legacyOwner
  ) {}
}
