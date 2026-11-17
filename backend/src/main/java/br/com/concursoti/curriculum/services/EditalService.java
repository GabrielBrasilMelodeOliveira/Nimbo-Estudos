package br.com.concursoti.curriculum.services;

import br.com.concursoti.assets.services.AssetService;
import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.EditalImport;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.EditalImportRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import java.io.*;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.*;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EditalService {

  private final AssetService assets;
  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final EditalImportRepository imports;

  public EditalService(
    AssetService assets,
    DisciplineRepository disciplines,
    TopicRepository topics,
    EditalImportRepository imports
  ) {
    this.assets = assets;
    this.disciplines = disciplines;
    this.topics = topics;
    this.imports = imports;
  }

  public record Group(String discipline, List<String> topics) {}

  public record Preview(
    String fileName,
    int extractedLines,
    List<Group> groups,
    List<String> warnings
  ) {}

  public record ImportRequest(
    String assetId,
    String examName,
    List<Group> groups
  ) {}

  private static final String[] SUBJECTS = {
    "Língua Portuguesa",
    "Língua Inglesa",
    "Matemática",
    "Matemática Financeira",
    "Raciocínio Lógico",
    "Estatística",
    "Atualidades",
    "Conhecimentos Bancários",
    "Conhecimentos de Informática",
    "Tecnologia da Informação",
    "Banco de Dados",
    "Redes de Computadores",
    "Segurança da Informação",
    "Engenharia de Software",
    "Governança de TI",
    "Desenvolvimento de Software",
    "Arquitetura de Computadores",
    "Sistemas Operacionais",
    "Algoritmos e Estruturas de Dados",
    "Direito Constitucional",
    "Direito Administrativo",
    "Direito Civil",
    "Direito Penal",
    "Direito Tributário",
    "Direito do Trabalho",
    "Legislação Específica",
    "Ética",
    "Atendimento",
    "Vendas e Negociação",
    "Probabilidade",
    "Economia",
    "Contabilidade",
    "Administração Pública",
    "Inteligência Artificial",
    "Computação em Nuvem",
    "Programação",
    "Análise de Dados",
    "Gestão de Projetos",
    "Inovação",
  };
  private static final Pattern NUM = Pattern.compile(
    "^(?:\\d{1,2}(?:\\.\\d{1,2}){0,3}[.)]?|[a-zA-Z][.)]|[•●▪–-])\\s+(.+)$"
  );
  private static final Pattern PAGE = Pattern.compile(
    "(?iu)^(?:p[aá]gina\\s*\\d+|\\d+\\s*/\\s*\\d+|edital\\s+n[oº°.]?.{0,30}|anexo\\s+[IVX0-9]+|concurso p[uú]blico.*)$"
  );

  public static String canonical(String s) {
    String normalized = Normalizer.normalize(
      s == null ? "" : s,
      Normalizer.Form.NFD
    ).replaceAll("\\p{M}", "");
    return normalized
      .toLowerCase(Locale.ROOT)
      .replaceAll("[^a-z0-9]+", " ")
      .trim();
  }

  private String sourceText(String id) {
    String type = assets.type(id);
    if (type.contains("wordprocessingml")) return assets.docxText(id);
    if (type.equals("application/pdf")) {
      try (PDDocument doc = Loader.loadPDF(assets.bytes(id))) {
        if (doc.getNumberOfPages() > 300) throw new IllegalArgumentException(
          "O PDF excede 300 páginas. Separe o anexo de conteúdo programático."
        );
        PDFTextStripper stripper = new PDFTextStripper();
        stripper.setSortByPosition(true);
        String text = stripper.getText(doc);
        if (text.length() > 750000) text = text.substring(0, 750000);
        return text;
      } catch (IOException e) {
        throw new IllegalArgumentException(
          "Não consegui ler o texto do PDF. Confira se não está protegido."
        );
      }
    }
    throw new IllegalArgumentException("Envie o edital em PDF ou DOCX.");
  }

  public Preview preview(String assetId) {
    if (assetId == null) throw new IllegalArgumentException(
      "Envie um edital antes de visualizar."
    );
    String text = sourceText(assetId);
    Preview parsed = parse(text);
    List<String> warnings = new ArrayList<>(parsed.warnings());
    if (text.strip().length() < 100) warnings.add(
      "Não encontrei texto suficiente. O PDF pode ser uma imagem escaneada. Use um arquivo com texto selecionável ou copie os assuntos manualmente."
    );
    return new Preview(
      assets.get(assetId).originalName,
      parsed.extractedLines(),
      parsed.groups(),
      warnings
    );
  }

  public static Preview parse(String text) {
    String[] source = (text == null ? "" : text)
      .replace('\u00a0', ' ')
      .replace('\r', '\n')
      .split("\\n");
    Map<String, LinkedHashSet<String>> found = new LinkedHashMap<>();
    String active = null;
    boolean contentSection = false;
    int count = 0;
    for (String original : source) {
      String line = original.replaceAll("\\s+", " ").trim();
      if (line.isEmpty() || PAGE.matcher(line).matches()) continue;
      count++;
      if (line.length() > 1200) line = line.substring(0, 1200);
      String test = line.replaceFirst("^\\d+(?:\\.\\d+){0,2}[.)-]?\\s*", "");
      String canon = canonical(test.replaceAll("[:;]$", ""));
      if (
        canon.contains("conteudo programatico") ||
        canon.contains("conteudos programaticos") ||
        canon.equals("conhecimentos especificos") ||
        canon.equals("conhecimentos basicos") ||
        canon.equals("objetos de avaliacao")
      ) {
        contentSection = true;
        continue;
      }
      // Em editais, títulos das disciplinas costumam ser linhas em maiúsculas ou terminar com dois pontos.
      // Evitamos reconhecer menções à disciplina dentro de instruções longas.
      int colon = test.indexOf(':');
      String candidate =
        colon >= 0 && colon < 85 ? test.substring(0, colon).trim() : test;
      String header = matchSubject(candidate);
      // Disciplina fora do catálogo, mas apresentada como título destacado no conteúdo programático.
      // É somente uma SUGESTÃO: o usuário aprova/edita todos os itens na prévia.
      if (
        header == null &&
        contentSection &&
        candidate.length() >= 5 &&
        candidate.length() <= 74 &&
        candidate.matches(".*[A-Za-zÀ-ÿ].*") &&
        !candidate.matches(".*\\d.*") &&
        candidate.trim().split("\\s+").length <= 7 &&
        (candidate.equals(candidate.toUpperCase(Locale.ROOT)) ||
          (colon >= 0 && test.trim().endsWith(":"))) &&
        !looksAdministrative(candidate) &&
        !canonical(candidate).matches(
          ".*\\b(edital|capitulo|anexo|pagina|inscricoes|avaliacao|prova|requisitos|habilidades|competencias)\\b.*"
        )
      ) header = candidate;
      boolean looksLikeHeader =
        header != null &&
        candidate.length() < 90 &&
        (colon >= 0 ||
          candidate.equals(candidate.toUpperCase(Locale.ROOT)) ||
          canonical(candidate).equals(canonical(header)));
      if (looksLikeHeader) {
        active = header;
        contentSection = true;
        found.computeIfAbsent(active, k -> new LinkedHashSet<>());
        if (colon >= 0 && colon < test.length() - 1) addTopics(
          found.get(active),
          test.substring(colon + 1)
        );
        continue;
      }
      // Não confundir regras de inscrição/avaliação com o conteúdo programático.
      if (!contentSection || active == null) continue;
      if (
        line.length() < 3 || line.length() > 350 || looksAdministrative(line)
      ) continue;
      Matcher numbered = NUM.matcher(line);
      if (numbered.matches()) line = numbered.group(1).trim();
      addTopics(found.get(active), line);
      if (found.values().stream().mapToInt(Set::size).sum() > 260) break;
    }
    List<Group> groups = found
      .entrySet()
      .stream()
      .filter(e -> !e.getValue().isEmpty())
      .map(e -> new Group(e.getKey(), new ArrayList<>(e.getValue())))
      .toList();
    List<String> warnings = new ArrayList<>();
    if (groups.isEmpty()) warnings.add(
      "Não consegui identificar automaticamente as disciplinas. Confira se o PDF tem texto selecionável e, se necessário, adicione os assuntos manualmente."
    );
    else warnings.add(
      "Extração automática por regras. Confira disciplina, assunto e possíveis trechos faltantes antes de confirmar: nenhum item é importado sem sua aprovação."
    );
    return new Preview("", count, groups, warnings);
  }

  private static boolean looksAdministrative(String line) {
    String s = canonical(line);
    return (
      s.startsWith("o candidato") ||
      s.startsWith("a banca") ||
      s.startsWith("as inscricoes") ||
      s.startsWith("sera eliminado") ||
      s.startsWith("a prova objetiva") ||
      s.startsWith("o prazo para") ||
      s.startsWith("as vagas") ||
      s.startsWith("nota minima") ||
      s.startsWith("local de prova") ||
      s.startsWith("data da prova") ||
      s.startsWith("capitulo ") ||
      s.contains("www ") ||
      s.matches(".*\\b(cpf|matricula|inscricao online)\\b.*")
    );
  }

  private static String matchSubject(String raw) {
    String text = canonical(raw);
    if (text.startsWith("nocoes de ")) text = text.substring(
      "nocoes de ".length()
    );
    if (text.startsWith("fundamentos de ")) text = text.substring(
      "fundamentos de ".length()
    );
    if (text.length() < 3) return null;
    for (String known : SUBJECTS) {
      String c = canonical(known);
      if (
        text.equals(c) ||
        text.equals("disciplina " + c) ||
        text.equals("conhecimentos de " + c)
      ) return known;
    }
    if (text.equals("portugues")) return "Língua Portuguesa";
    if (text.equals("ingles")) return "Língua Inglesa";
    if (text.equals("informatica")) return "Conhecimentos de Informática";
    if (text.equals("raciocinio logico matematico")) return "Raciocínio Lógico";
    if (text.equals("ti")) return "Tecnologia da Informação";
    if (text.equals("direito e legislacao")) return "Legislação Específica";
    return null;
  }

  private static void addTopics(Set<String> topics, String raw) {
    if (topics == null) return;
    String value = raw.replaceAll("\\s+", " ").trim();
    // Tópicos separados por ponto-e-vírgula ou enumeração numerada dentro do parágrafo.
    String[] chunks = value.split(
      "\\s*;\\s*|\\s+(?=\\d{1,2}\\.\\s+[A-ZÁÀÉÍÓÚÂÊÔÃÕÇ])"
    );
    for (String chunk : chunks) {
      String title = chunk
        .replaceFirst("^\\d{1,2}(?:\\.\\d+)*[.)]?\\s+", "")
        .replaceAll("^[\\s:.-]+|[\\s;.]+$", "")
        .trim();
      if (
        title.length() < 4 ||
        title.length() > 200 ||
        (title.matches("\\d+.*") && title.length() < 10)
      ) continue;
      topics.add(title);
      if (topics.size() > 120) return;
    }
  }

  @Transactional
  public EditalImport importReviewed(ImportRequest input) {
    if (
      input == null || input.assetId() == null
    ) throw new IllegalArgumentException("Informe o PDF/DOCX de origem.");
    String media = assets.type(input.assetId());
    if (
      !media.equals("application/pdf") && !media.contains("wordprocessingml")
    ) throw new IllegalArgumentException("O edital deve ser PDF ou DOCX.");
    if (
      input.groups() == null || input.groups().isEmpty()
    ) throw new IllegalArgumentException(
      "Inclua ao menos uma disciplina na prévia."
    );
    if (input.groups().size() > 60) throw new IllegalArgumentException(
      "Máximo de 60 disciplinas por importação."
    );
    List<Discipline> existing = disciplines.findAll();
    List<Topic> existingTopics = topics.findAll();
    Map<String, Discipline> byName = new HashMap<>();
    for (Discipline d : existing) byName.put(canonical(d.name), d);
    Map<Long, Set<String>> topicKeys = new HashMap<>();
    for (Topic t : existingTopics)
      topicKeys
        .computeIfAbsent(t.discipline.id, k -> new HashSet<>())
        .add(canonical(t.title));
    int inserted = 0,
      skipped = 0,
      newDisciplines = 0,
      totalInput = 0;
    for (Group g : input.groups()) {
      if (
        g == null ||
        g.discipline() == null ||
        g.discipline().isBlank() ||
        g.discipline().length() > 120
      ) throw new IllegalArgumentException("Confira o nome das disciplinas.");
      if (g.topics() == null) continue;
      Discipline d = byName.get(canonical(g.discipline()));
      if (d == null) {
        d = disciplines.save(
          new Discipline(
            g.discipline().trim(),
            "#4D8375",
            (int) disciplines.count()
          )
        );
        byName.put(canonical(d.name), d);
        newDisciplines++;
      }
      Set<String> keys = topicKeys.computeIfAbsent(d.id, k -> new HashSet<>());
      for (String raw : g.topics()) {
        if (raw == null || raw.isBlank()) continue;
        totalInput++;
        if (totalInput > 350) throw new IllegalArgumentException(
          "Limite de 350 assuntos por importação."
        );
        String title = raw.trim();
        if (title.length() > 200) throw new IllegalArgumentException(
          "Um assunto excede 200 caracteres: " + title.substring(0, 35)
        );
        if (!keys.add(canonical(title))) {
          skipped++;
          continue;
        }
        Topic t = new Topic();
        t.discipline = d;
        t.title = title;
        t.status = Topic.Status.NOT_STARTED;
        t.mastery = Topic.Mastery.WEAK;
        t.theoryDone = false;
        t.summaryDone = false;
        t.importance = 3;
        topics.save(t);
        inserted++;
      }
    }
    if (totalInput == 0) throw new IllegalArgumentException(
      "Adicione assuntos na prévia antes de importar."
    );
    EditalImport history = new EditalImport();
    history.assetId = input.assetId();
    history.fileName = assets.get(input.assetId()).originalName;
    history.addedDisciplines = newDisciplines;
    history.addedTopics = inserted;
    history.skippedTopics = skipped;
    return imports.save(history);
  }
}
