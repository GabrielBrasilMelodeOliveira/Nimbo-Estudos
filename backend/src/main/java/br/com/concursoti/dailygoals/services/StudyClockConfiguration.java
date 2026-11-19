package br.com.concursoti.dailygoals.services;

import java.time.Clock;
import java.time.ZoneId;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudyClockConfiguration {

  @Bean
  public Clock studyClock() {
    return Clock.system(ZoneId.of("America/Fortaleza"));
  }
}
