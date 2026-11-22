import { Chip, Stack, Typography } from "@mui/material";
import { Award } from "lucide-react";
const titles = [
  { at: 0, name: "Aprendiz das penas" },
  { at: 30, name: "Parceiro de toca" },
  { at: 100, name: "Tutor da coruja" },
  { at: 300, name: "Mestre da pizza" },
  { at: 600, name: "Lenda do cobertor" },
];
export default function PetCareRewards({ pet }) {
  if (!pet.vitals) return null;
  const points = pet.vitals.carePoints;
  const title = titles.filter((item) => points >= item.at).at(-1);
  const next = titles.find((item) => points < item.at);
  return (
    <Stack spacing={0.75}>
      <Chip
        icon={<Award size={16} />}
        label={title.name}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      />
      <Typography variant="caption">
        {points} pontos de cuidado · {pet.vitals.completedCycles} ciclos
        completos
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {next
          ? `Faltam ${next.at - points} pontos para “${next.name}”. `
          : "Todos os títulos de cuidado conquistados! "}
        Esses títulos são recompensas de cuidado; a classe da coruja evolui com
        XP de estudo.
      </Typography>
    </Stack>
  );
}
