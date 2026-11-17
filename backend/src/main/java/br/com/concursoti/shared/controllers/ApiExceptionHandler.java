package br.com.concursoti.shared.controllers;

import java.util.Map;
import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiExceptionHandler {

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
}
