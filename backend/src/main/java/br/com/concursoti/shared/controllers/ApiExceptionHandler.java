package br.com.concursoti.shared.controllers;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(
    org.springframework.web.bind.MethodArgumentNotValidException.class
  )
  public ResponseEntity<Map<String, String>> invalidFields(
    org.springframework.web.bind.MethodArgumentNotValidException exception
  ) {
    return ResponseEntity.badRequest().body(
      Map.of(
        "error",
        "Confira os campos: nome de 2 a 80 caracteres, e-mail válido e senha com pelo menos 10 caracteres."
      )
    );
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> invalid(
    IllegalArgumentException ex
  ) {
    return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<Map<String, String>> missing(
    NoSuchElementException ex
  ) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
      Map.of("error", "Registro não encontrado.")
    );
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Map<String, String>> conflict(
    DataIntegrityViolationException ex
  ) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(
      Map.of(
        "error",
        "Há registros vinculados. Exclua os registros relacionados primeiro."
      )
    );
  }

  @ExceptionHandler(
    org.springframework.web.server.ResponseStatusException.class
  )
  public ResponseEntity<Map<String, String>> status(
    org.springframework.web.server.ResponseStatusException exception
  ) {
    return ResponseEntity.status(exception.getStatusCode()).body(
      Map.of(
        "error",
        Objects.toString(
          exception.getReason(),
          "Não foi possível atualizar o registro."
        )
      )
    );
  }

  @ExceptionHandler(
    org.springframework.orm.ObjectOptimisticLockingFailureException.class
  )
  public ResponseEntity<Map<String, String>> staleRecord(Exception exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(
      Map.of("error", "O registro mudou. Atualize a página e tente novamente.")
    );
  }
}
