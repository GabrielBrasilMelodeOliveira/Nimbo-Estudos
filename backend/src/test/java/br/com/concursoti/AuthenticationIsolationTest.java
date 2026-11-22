package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import br.com.concursoti.accounts.services.AccountSchemaService;
import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import com.fasterxml.jackson.databind.*;
import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Table;
import jakarta.servlet.http.Cookie;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.*;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationIsolationTest {

  static final EmbeddedPostgres database;

  static {
    try {
      database = EmbeddedPostgres.builder()
        .setPort(0)
        .setServerConfig("unix_socket_directories", "")
        .start();
    } catch (Exception exception) {
      throw new ExceptionInInitializerError(exception);
    }
  }

  @DynamicPropertySource
  static void databaseProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", () ->
      database.getJdbcUrl("postgres", "postgres")
    );
    registry.add("spring.datasource.username", () -> "postgres");
    registry.add("spring.datasource.password", () -> "");
    registry.add(
      "nimbo.accounts.setup-key",
      () -> "test-only-installation-key"
    );
  }

  @Autowired
  MockMvc mvc;

  @Autowired
  ObjectMapper mapper;

  @Autowired
  DisciplineRepository disciplines;

  @Autowired
  EntityManagerFactory entities;

  @Autowired
  AccountSchemaService accountSchemas;

  @Autowired
  @Qualifier("accountJdbc")
  JdbcTemplate jdbc;

  @Test
  void accountsHavePersistentSessionsAndCompletelyIsolatedStudyAreas() throws Exception {
    // The migration must cover every existing business entity, including assets and singleton tables.
    Set<String> entityTables = new HashSet<>();
    entities
      .getMetamodel()
      .getEntities()
      .forEach(entity ->
        entityTables.add(entity.getJavaType().getAnnotation(Table.class).name())
      );
    assertEquals(entityTables, new HashSet<>(AccountSchemaService.TABLES));
    Discipline legacy = new Discipline();
    legacy.name = "Histórico do proprietário";
    legacy.color = "#3282B8";
    disciplines.save(legacy);
    Client owner = new Client();
    owner.session();
    assertTrue(owner.last.path("setupRequired").asBoolean());
    for (String endpoint : List.of(
      "disciplines",
      "topics",
      "questions",
      "study-sessions",
      "reviews",
      "mock-exams",
      "materials",
      "error-notes",
      "plan",
      "dashboard",
      "pet",
      "analytics",
      "agenda",
      "study-plan",
      "daily-progress",
      "agenda/goals",
      "edital/imports",
      "flashcards"
    ))
      owner.call(get("/api/" + endpoint), 401);
    mvc
      .perform(
        post("/api/auth/login")
          .contentType(MediaType.APPLICATION_JSON)
          .content(
            "{\"email\":\"owner@example.test\",\"password\":\"Example-password-123\"}"
          )
      )
      .andExpect(result -> assertEquals(403, result.getResponse().getStatus()));
    owner.call(
      post("/api/auth/register").content(
        json(
          Map.of(
            "name",
            "Proprietário",
            "email",
            "owner@example.test",
            "password",
            "Example-password-123",
            "setupKey",
            "wrong"
          )
        )
      ),
      403
    );
    Cookie anonymous = owner.cookie;
    String anonymousCsrf = owner.csrf;
    owner.register("owner@example.test", "test-only-installation-key");
    assertNotEquals(anonymous.getValue(), owner.cookie.getValue());
    assertTrue(owner.cookie.isHttpOnly());
    assertEquals("Lax", owner.cookie.getAttribute("SameSite"));
    mvc
      .perform(
        post("/api/disciplines")
          .cookie(owner.cookie)
          .header("X-CSRF-TOKEN", anonymousCsrf)
          .contentType(MediaType.APPLICATION_JSON)
          .content(json(Map.of("name", "Token antigo", "color", "#3282B8")))
      )
      .andExpect(result -> assertEquals(403, result.getResponse().getStatus()));
    assertTrue(owner.last.path("user").path("legacyOwner").asBoolean());
    owner.call(get("/api/disciplines"), 200);
    assertEquals(
      "Histórico do proprietário",
      owner.last.get(0).path("name").asText()
    );
    owner.call(
      post("/api/disciplines").content(
        json(Map.of("name", "Só da primeira conta", "color", "#3282B8"))
      ),
      200
    );
    long ownerOnlyId = owner.last.path("id").asLong();
    owner.call(
      post("/api/topics").content(
        json(Map.of("disciplineId", ownerOnlyId, "title", "Assunto privado"))
      ),
      200
    );
    long ownerTopic = owner.last.path("id").asLong();
    owner.call(
      post("/api/flashcards/manual").content(
        json(
          Map.of(
            "title",
            "Privado",
            "question",
            "Segredo",
            "answer",
            "Resposta",
            "disciplineId",
            ownerOnlyId,
            "topicId",
            ownerTopic
          )
        )
      ),
      201
    );
    String assetId = UUID.randomUUID().toString();
    jdbc.update(
      "insert into public.stored_assets(id, original_name,media_type,size_bytes,created_at) values(?, 'private.png','image/png',3,now())",
      assetId
    );
    jdbc.update(
      "insert into public.asset_blobs(id,content) values(?,?)",
      assetId,
      new byte[] { 1, 2, 3 }
    );

    Client second = new Client();
    second.session();
    assertFalse(second.last.path("setupRequired").asBoolean());
    second.register("second@example.test", "");
    second.call(get("/api/disciplines"), 200);
    assertEquals(0, second.last.size());
    second.call(get("/api/flashcards"), 200);
    assertEquals(0, second.last.size());
    second.call(get("/api/uploads/" + assetId + "/content"), 400);
    second.call(
      post("/api/topics").content(
        json(
          Map.of("disciplineId", ownerOnlyId, "title", "Tentativa de vínculo")
        )
      ),
      404
    );
    second.call(delete("/api/topics/" + ownerTopic), 404);
    second.call(
      post("/api/disciplines").content(
        json(Map.of("name", "Segunda conta", "color", "#BBE1FA"))
      ),
      200
    );
    long secondDiscipline = second.last.path("id").asLong();
    second.call(
      post("/api/topics").content(
        json(
          Map.of(
            "disciplineId",
            secondDiscipline,
            "title",
            "Assunto da segunda conta"
          )
        )
      ),
      200
    );
    second.call(get("/api/topics"), 200);
    assertEquals(
      "Segunda conta",
      second.last.get(0).path("discipline").path("name").asText()
    );
    for (String endpoint : List.of(
      "plan",
      "dashboard",
      "analytics",
      "pet",
      "daily-progress",
      "agenda/goals",
      "study-plan"
    ))
      second.call(get("/api/" + endpoint), 200);
    // Maintenance uses bulk JPQL deletes: these must never reach another schema.
    second.call(
      post("/api/maintenance/clear").content(
        json(Map.of("scope", "all", "confirmation", "EXCLUIR"))
      ),
      200
    );
    second.call(get("/api/topics"), 200);
    assertEquals(0, second.last.size());
    owner.call(get("/api/topics"), 200);
    assertEquals(1, owner.last.size());
    owner.call(get("/api/flashcards"), 200);
    assertEquals(1, owner.last.size());
    owner.call(get("/api/uploads/" + assetId + "/content"), 200);
    // Care sessions and additive upgrades must stay in the authenticated account too.
    owner.call(post("/api/pet").content(json(Map.of("species", "nori"))), 200);
    long ownerPet = owner.last.path("id").asLong();
    owner.call(
      post("/api/pet/interact").content(json(Map.of("action", "TRAIN"))),
      200
    );
    owner.call(
      post("/api/pet/" + ownerPet + "/presence").content(
        json(Map.of("present", true))
      ),
      200
    );
    assertEquals(
      "TRAINING",
      owner.last.path("vitals").path("activity").asText()
    );
    assertEquals(0, owner.last.path("xp").asInt());
    second.call(get("/api/pet"), 200);
    assertTrue(second.last.isNull());
    second.call(post("/api/pet").content(json(Map.of("species", "nori"))), 200);
    second.call(
      post("/api/pet/interact").content(json(Map.of("action", "FEED"))),
      200
    );
    assertEquals(
      "EATING",
      second.last.path("vitals").path("activity").asText()
    );
    owner.call(get("/api/pet"), 200);
    assertEquals(
      "TRAINING",
      owner.last.path("vitals").path("activity").asText()
    );
    String secondSchema = jdbc.queryForObject(
      "select schema_name from public.nimbo_accounts where email='second@example.test'",
      String.class
    );
    jdbc.execute(
      "alter table " + secondSchema + ".pet_companions drop column care_points"
    );
    accountSchemas.synchronize(secondSchema);
    accountSchemas.synchronize(secondSchema);
    second.call(get("/api/pet"), 200);
    assertEquals(0, second.last.path("vitals").path("carePoints").asInt());
    assertEquals(
      "EATING",
      second.last.path("vitals").path("activity").asText()
    );
    // Old browser tabs cannot accidentally write to the newly selected account.
    second.call(
      post("/api/disciplines")
        .header("X-Nimbo-Account", owner.id)
        .content(json(Map.of("name", "Conta errada", "color", "#3282B8"))),
      409
    );
    assertEquals("ACCOUNT_CHANGED", second.last.path("code").asText());
    assertFalse(
      jdbc
        .queryForObject(
          "select password_hash from public.nimbo_accounts where email='owner@example.test'",
          String.class
        )
        .contains("Example-password")
    );
    assertTrue(
      jdbc.queryForObject(
        "select count(*) from public.nimbo_sessions where principal_name='owner@example.test'",
        Integer.class
      ) > 0
    );
    assertTrue(
      jdbc.queryForObject(
        "select count(*) from public.nimbo_sessions_attributes where attribute_name='SPRING_SECURITY_CONTEXT'",
        Integer.class
      ) > 0
    );
    // FK definitions must target the same account, even for lazy loading by ID.
    assertEquals(
      0,
      jdbc.queryForObject(
        "select count(*) from pg_constraint c join pg_class s on s.oid=c.conrelid join pg_namespace ns on ns.oid=s.relnamespace join pg_class t on t.oid=c.confrelid join pg_namespace nt on nt.oid=t.relnamespace where c.contype='f' and ns.nspname like 'nimbo_%' and ns.nspname<>nt.nspname",
        Integer.class
      )
    );
    Client login = new Client();
    login.session();
    login.call(
      post("/api/auth/login").content(
        json(
          Map.of("email", "owner@example.test", "password", "wrong-password")
        )
      ),
      401
    );
    login.call(
      post("/api/auth/login").content(
        json(
          Map.of(
            "email",
            "OWNER@example.test",
            "password",
            "Example-password-123"
          )
        )
      ),
      200
    );
    login.session();
    assertEquals(owner.id, login.id);
    Cookie signedIn = login.cookie;
    login.call(post("/api/auth/logout"), 204);
    mvc
      .perform(get("/api/disciplines").cookie(signedIn))
      .andExpect(result -> assertEquals(401, result.getResponse().getStatus()));
    // Reuse pooled connections in alternating scopes to catch search_path leaks.
    for (int index = 0; index < 5; index++) {
      owner.call(get("/api/disciplines"), 200);
      assertEquals(2, owner.last.size());
      second.call(get("/api/disciplines"), 200);
      assertEquals(0, second.last.size());
    }
  }

  @org.junit.jupiter.api.AfterAll
  static void stopDatabase() throws Exception {
    database.close();
  }

  String json(Object value) throws Exception {
    return mapper.writeValueAsString(value);
  }

  class Client {

    Cookie cookie;
    String csrf;
    String id;
    JsonNode last;

    void session() throws Exception {
      call(get("/api/auth/session"), 200);
      csrf = last.path("csrfToken").asText();
      if (last.path("user").has("id")) id = last
        .path("user")
        .path("id")
        .asText();
    }

    void register(String email, String setup) throws Exception {
      call(
        post("/api/auth/register").content(
          json(
            Map.of(
              "name",
              "Estudante",
              "email",
              email,
              "password",
              "Example-password-123",
              "setupKey",
              setup
            )
          )
        ),
        200
      );
      session();
    }

    void call(
      MockHttpServletRequestBuilder request,
      int expected
    ) throws Exception {
      if (cookie != null) request.cookie(cookie);
      if (csrf != null) request.header("X-CSRF-TOKEN", csrf);
      var response = mvc
        .perform(request.contentType(MediaType.APPLICATION_JSON))
        .andReturn()
        .getResponse();
      assertEquals(
        expected,
        response.getStatus(),
        response.getContentAsString()
      );
      Cookie replacement = response.getCookie("NIMBOSESSION");
      if (replacement != null && replacement.getMaxAge() != 0) cookie =
        replacement;
      String content = response.getContentAsString();
      last =
        content.startsWith("{") || content.startsWith("[")
          ? mapper.readTree(content)
          : mapper.nullNode();
    }
  }
}
