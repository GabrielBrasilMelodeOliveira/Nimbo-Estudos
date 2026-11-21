package br.com.concursoti.companions.dto;

import br.com.concursoti.companions.entities.PetCompanion;
import java.util.Locale;
import java.util.Set;

public record CompanionAppearance(
  String path,
  String featherColor,
  String scarfColor,
  String eyeColor,
  String headAccessory,
  String bodyAccessory
) {
  public static CompanionAppearance from(PetCompanion companion) {
    return new CompanionAppearance(
      companion.heroPath == null ? "WARRIOR" : companion.heroPath,
      companion.featherColor == null
        ? defaultFeatherColor(companion.species)
        : companion.featherColor,
      companion.scarfColor == null ? "#17475F" : companion.scarfColor,
      companion.eyeColor == null ? "#244B62" : companion.eyeColor,
      companion.headAccessory == null ? "AUTO" : companion.headAccessory,
      companion.bodyAccessory == null ? "SATCHEL" : companion.bodyAccessory
    );
  }

  private static String defaultFeatherColor(String species) {
    return switch (species == null ? "nori" : species) {
      case "luma" -> "#AB8DD8";
      case "favo" -> "#D8AF60";
      case "brisa" -> "#86C9E7";
      case "mimo" -> "#DC8AA5";
      case "foli" -> "#87B484";
      case "fira" -> "#D8916D";
      case "tuca" -> "#64C8BE";
      case "duna" -> "#C5AE83";
      case "noa" -> "#7C91C2";
      case "iris" -> "#B89FDF";
      default -> "#55BDD5";
    };
  }

  public CompanionAppearance validated() {
    if (
      !Set.of("WARRIOR", "MAGE", "RANGER").contains(path == null ? "" : path)
    ) throw new IllegalArgumentException(
      "Escolha Guerreiro, Mago ou Patrulheiro."
    );
    if (
      !Set.of("AUTO", "NONE", "GOGGLES", "HAT", "CROWN", "HOOD").contains(
        headAccessory == null ? "" : headAccessory
      )
    ) throw new IllegalArgumentException("Acessório de cabeça inválido.");
    if (
      !Set.of("SATCHEL", "CAPE", "NONE").contains(
        bodyAccessory == null ? "" : bodyAccessory
      )
    ) throw new IllegalArgumentException("Acessório do corpo inválido.");
    return new CompanionAppearance(
      path,
      color(featherColor),
      color(scarfColor),
      color(eyeColor),
      headAccessory,
      bodyAccessory
    );
  }

  private static String color(String value) {
    if (
      value == null || !value.matches("#[0-9a-fA-F]{6}")
    ) throw new IllegalArgumentException(
      "Use uma cor hexadecimal com seis dígitos, como #55BDD5."
    );
    return value.toUpperCase(Locale.ROOT);
  }

  public void applyTo(PetCompanion companion) {
    companion.heroPath = path;
    companion.featherColor = featherColor;
    companion.scarfColor = scarfColor;
    companion.eyeColor = eyeColor;
    companion.headAccessory = headAccessory;
    companion.bodyAccessory = bodyAccessory;
  }
}
