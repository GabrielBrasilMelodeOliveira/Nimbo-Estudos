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
        <Typography fontWeight={600}>Como as metas cuidam do Nimbo</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          <Typography variant="body2">
            Metas completas deixam o Nimbo feliz e aumentam a sequência.
            Qualquer progresso registrado no dia o deixa neutro: sem fome ou
            cansaço, mas sem contar um dia completo. Um dia parcial interrompe
            tanto a sequência positiva quanto a de faltas.
          </Typography>
          <Typography variant="body2">
            Dias encerrados sem nenhum progresso: 1 dia dá fome; 2 dias dão
            cansaço; 3 dias trazem tristeza pela manhã e irritação à tarde. O
            quarto dia consecutivo sem progresso causa a morte.
          </Typography>
          <Typography variant="body2">
            O dia termina à meia-noite, no horário de Fortaleza. O resultado
            fechado fica preservado; registros retroativos ou metas alteradas
            depois não reescrevem a vida do aventureiro. A contagem começa na
            atualização ou no recrutamento, sem penalidades anteriores.
          </Typography>
          <Typography variant="body2">
            Todos os companheiros acompanham suas metas, inclusive os que estão
            na coleção. Incentivo, conversa, treino e descanso fortalecem o
            vínculo, mas não substituem estudar nem revertem a morte.
          </Typography>
          <Alert severity="info">
            Ajuste metas realistas no “Fechamento do dia”, no Início ou na
            Agenda. As regras fazem parte do jogo; o histórico de estudos nunca
            é apagado ao recomeçar.
          </Alert>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
