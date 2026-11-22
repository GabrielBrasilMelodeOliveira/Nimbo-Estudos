import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
export default function PetCareRules() {
  return (
    <Accordion variant="outlined" disableGutters>
      <AccordionSummary expandIcon={<ChevronDown size={18} />}>
        <Typography fontWeight={600}>
          Regras da toca: estudo, cuidados e recompensas
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Duas jornadas:</strong> XP de estudo sobe o nível e a
            classe; só vem de estudos, questões e revisões registrados. Treinar,
            comer e descansar cuidam dos sinais vitais. Treinos completos dão 20
            pontos de cuidado; sonos completos dão 10. Esses pontos desbloqueiam
            títulos de cuidador em 30, 100, 300 e 600 pontos, sem conceder XP.
          </Typography>
          <Typography variant="body2">
            <strong>Treinar:</strong> 30 minutos com uma aba do Nimbo visível,
            inclusive navegando entre páginas ou com a bolinha recolhida. Sair,
            minimizar, trocar para outro site ou ficar sem conexão pausa a
            contagem; voltar retoma o que já foi confirmado. Concluir enche o
            preparo. O início consome 10 de saciedade e energia e exige ambas em
            pelo menos 20%. Novo treino oito horas após o anterior.
          </Typography>
          <Typography variant="body2">
            <strong>Comer:</strong> a pizza enche a saciedade e recupera 25 de
            energia. Uma refeição a cada quatro horas. Durante os 12 segundos da
            refeição, o Nimbo termina de mastigar antes da próxima ação.
          </Typography>
          <Typography variant="body2">
            <strong>Descansar:</strong> só após concluir um treino e comer desde
            o último sono. Dura oito horas e continua com o site fechado. As
            barras ficam protegidas durante o sono; ao acordar, energia vai a
            100%, saciedade a pelo menos 60% e preparo a pelo menos 70%. Os
            estudos do usuário podem continuar normalmente.
          </Typography>
          <Typography variant="body2">
            <strong>Mantenha as três barras em 35% ou mais.</strong> Enquanto o
            companheiro está ativo e acordado, saciedade cai 4 pontos por hora,
            energia 3 e preparo 2, inclusive fora do site. Uma barra zerada
            inicia uma crise de 12 horas. Se qualquer barra continuar zerada
            durante toda essa crise, a vida termina. Recuperar todas para acima
            de zero encerra a crise; dormir a interrompe. Companheiros em
            reserva não sofrem desgaste vital.
          </Typography>
          <Typography variant="body2">
            <strong>As metas continuam valendo para toda a coleção.</strong> Um
            dia encerrado sem progresso dá fome; dois dão cansaço; três trazem
            tristeza pela manhã e irritação à tarde. O quarto dia consecutivo
            sem progresso causa a morte, mesmo se os cuidados estiverem em dia.
            Progresso parcial interrompe a sequência de faltas e deixa o humor
            de estudo neutro; metas completas geram felicidade e marcos em 3, 7,
            14 e 30 dias. Estudar não preenche as barras de cuidado.
          </Typography>
          <Typography variant="body2">
            O fechamento usa o horário de Fortaleza. Alterações retroativas não
            reescrevem os dias encerrados. As novas barras começam em 80%, sem
            cobrança retroativa. Recomeçar uma vida zera o XP dessa vida,
            preservando histórico de estudo, aparência, recordes e títulos de
            cuidado.
          </Typography>
          <Alert severity="info">
            Os tempos e recompensas são verificados no servidor e salvos na sua
            conta. Abrir várias abas não multiplica o tempo de treino.
          </Alert>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
