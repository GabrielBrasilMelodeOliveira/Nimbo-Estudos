package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;

import br.com.concursoti.curriculum.services.EditalService;
import org.junit.jupiter.api.Test;

class EditalParsingTest {

  @Test
  void reconheceAssuntosComDisciplinaSemImportarInstrucoesAdministrativas() {
    String texto = """
    EDITAL Nº 01/2026
    Inscrições até 20/11/2026.
    CONTEÚDO PROGRAMÁTICO
    LÍNGUA PORTUGUESA
    1 Compreensão e interpretação de textos
    2 Ortografia e acentuação
    BANCO DE DADOS:
    1 SQL e consultas avançadas; 2 Normalização e modelos relacionais
    O candidato deverá comparecer ao local de prova no horário previsto
    """;
    var preview = EditalService.parse(texto);
    assertEquals(2, preview.groups().size());
    assertEquals("Língua Portuguesa", preview.groups().get(0).discipline());
    assertTrue(
      preview
        .groups()
        .get(0)
        .topics()
        .contains("Compreensão e interpretação de textos")
    );
    assertEquals("Banco de Dados", preview.groups().get(1).discipline());
    assertTrue(
      preview
        .groups()
        .get(1)
        .topics()
        .stream()
        .anyMatch(t -> t.contains("Normalização"))
    );
    assertFalse(
      preview
        .groups()
        .get(1)
        .topics()
        .stream()
        .anyMatch(t -> t.contains("candidato"))
    );
  }

  @Test
  void naoInventaDisciplinasQuandoConteudoEstaVazio() {
    var preview = EditalService.parse(
      "ANEXO I\nCRONOGRAMA DE INSCRIÇÕES\nO candidato deve preencher o formulário"
    );
    assertTrue(preview.groups().isEmpty());
    assertFalse(preview.warnings().isEmpty());
  }
}
