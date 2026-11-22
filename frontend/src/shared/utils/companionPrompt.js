import { TODAY } from "./utils.js";

/** Concrete study cues, with the same irritable little librarian in every message. */
export function companionPrompt(pet, data = {}) {
  const vitals = pet?.vitals;
  if (pet?.care?.dead) return { text: pet.message };
  if (vitals?.activity === "SLEEPING")
    return {
      text: "Zzz… quem mexer no meu cobertor vai revisar o edital INTEIRO. Volto em oito horas, mesmo se você sair.",
    };
  if (vitals?.activity === "TRAINING")
    return {
      text: "Óculos no bico. Silêncio, estou ficando intelectualmente perigoso! Estude comigo: o treino cuida das penas; seu estudo dá XP.",
      page: "cycle",
      link: "Estudar junto",
    };
  if (vitals?.activity === "EATING")
    return {
      text: "PIZZA! Uma fatia para mim, outra para mim e a última também. Energia entrando, drama diminuindo.",
    };
  if (vitals?.criticalUntil)
    return {
      text: "ALERTA VERMELHO NAS PENAS! Uma barra zerou. Tenho 12 horas desde o início da crise para sair dessa. Cuide de mim agora.",
    };
  if (vitals?.satiety < 35)
    return {
      text: "Meu estômago fez uma questão discursiva de 40 linhas. A resposta é PIZZA. Clique em Comer antes que ele recorra da nota.",
    };
  if (vitals?.energy < 35)
    return {
      text: "Estou rodando com uma pena de bateria. Complete treino e refeição para liberar meu sono de oito horas.",
    };
  if (vitals?.readiness < 35)
    return {
      text: "Meu preparo está derretendo! Me coloque para treinar: 30 minutos de óculos e livro. Nada de fugir da aba.",
    };
  if (pet?.care?.missedDays >= 3)
    return {
      text: pet.message,
      page: "cycle",
      link: "Estudar antes do fechamento do dia",
    };
  const today = TODAY();
  const reviews = (data.reviews || []).filter(
    (review) =>
      !review.completedAt && !review.cancelledAt && review.dueDate <= today,
  );
  if (reviews.length)
    return {
      text: `${reviews.length} revisão${reviews.length === 1 ? " está" : "ões estão"} batendo na porta. Eu finjo que não ouvi, mas VOCÊ vai abrir. Concluí-las rende XP!`,
      page: "reviews",
      link: "Enfrentar revisões",
    };
  const scheduled = (data["study-plan"] || []).find(
    (plan) => plan.studyDate === today,
  )?.disciplines?.[0];
  if (scheduled)
    return {
      text: `Você escalou ${scheduled.name} para hoje. Convocação aceita, fuga negada! Registre um estudo para fazer minha classe evoluir.`,
      page: "cycle",
      options: { disciplineId: scheduled.id },
      link: "Iniciar estudo planejado",
    };
  const pending = (data.agenda || []).filter(
    (item) => !item.completed && item.scheduledDate === today,
  );
  if (pending.length)
    return {
      text: `Tem ${pending.length} atividade${pending.length > 1 ? "s" : ""} esperando na agenda. Marcar a caixinha organiza; registrar estudo, questões ou revisão é o que me dá XP.`,
      page: "weekly",
      link: "Ver agenda de hoje",
    };
  const topic = (data.topics || []).find((item) => !item.theoryDone);
  if (topic)
    return {
      text: `“${topic.title}” ainda está espiando do edital. Bora encarar? Meu capacete novo depende desse estudo, criatura!`,
      page: "cycle",
      options: { topicId: topic.id, disciplineId: topic.discipline?.id },
      link: "Estudar este assunto",
    };
  if ((data["error-notes"] || []).length)
    return {
      text: "Seu caderno de erros está cheio de pistas. Revise os flashcards e registre a prática em Questões para ganhar XP. Quero revanche!",
      page: "errors",
      link: "Preparar a revanche",
    };
  return {
    text:
      pet?.message ||
      "Penas prontas, drama aquecido. Abra o cronômetro e registre um estudo: é assim que eu viro lenda!",
    page: "cycle",
    link: "Estudar e ganhar XP",
  };
}
