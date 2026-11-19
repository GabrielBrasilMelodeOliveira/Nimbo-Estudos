import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Modal } from "../../../shared/components/UI.jsx";
import { SearchableSelect } from "../../../shared/components/FormControls.jsx";
import { dateBR } from "../../../shared/utils/utils.js";
export default function DailyStudyPlan({ day, data, action, working }) {
  const disciplines =
    (data["study-plan"] || []).find((plan) => plan.studyDate === day)
      ?.disciplines || [];
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(["", ""]);
  return (
    <>
      <Button
        fullWidth
        size="small"
        variant="outlined"
        disabled={working}
        sx={{
          mb: 1.5,
          textAlign: "left",
          justifyContent: "flex-start",
          whiteSpace: "normal",
          fontSize: 12,
        }}
        onClick={() => {
          setSelectedIds([
            String(disciplines[0]?.id || ""),
            String(disciplines[1]?.id || ""),
          ]);
          setOpen(true);
        }}
      >
        {disciplines.length
          ? disciplines.map((discipline) => discipline.name).join(" · ")
          : "Planejar disciplinas"}
      </Button>
      {open && (
        <Modal
          title={`Disciplinas de ${dateBR(day)}`}
          onClose={() => setOpen(false)}
        >
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography color="text.secondary">
              Escolha até duas disciplinas. Elas orientarão seu próximo passo na
              página inicial.
            </Typography>
            {[0, 1].map((index) => (
              <SearchableSelect
                key={index}
                label={`Disciplina ${index + 1}`}
                value={selectedIds[index]}
                onChange={(event) =>
                  setSelectedIds((current) =>
                    current.map((value, position) =>
                      position === index ? event.target.value : value,
                    ),
                  )
                }
              >
                <option value="">Nenhuma</option>
                {(data.disciplines || [])
                  .filter(
                    (discipline) =>
                      String(discipline.id) !== selectedIds[1 - index],
                  )
                  .map((discipline) => (
                    <option key={discipline.id} value={discipline.id}>
                      {discipline.name}
                    </option>
                  ))}
              </SearchableSelect>
            ))}
            <Button
              variant="contained"
              disabled={working}
              onClick={async () => {
                if (
                  await action(
                    `study-plan/${day}`,
                    "PUT",
                    { disciplineIds: selectedIds.filter(Boolean).map(Number) },
                    "Planejamento do dia salvo.",
                  )
                )
                  setOpen(false);
              }}
            >
              Salvar planejamento
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
