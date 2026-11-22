import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
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
      <Box sx={{ mb: 1.5 }}>
        {disciplines.map((discipline) => (
          <Stack
            key={discipline.id}
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}
            >
              {discipline.name}
            </Typography>
            <Tooltip title="Retirar do planejamento deste dia">
              <span>
                <IconButton
                  size="small"
                  disabled={working}
                  aria-label={`Retirar ${discipline.name} de ${dateBR(day)}`}
                  onClick={() =>
                    action(
                      `study-plan/${day}`,
                      "PUT",
                      {
                        disciplineIds: disciplines
                          .filter((item) => item.id !== discipline.id)
                          .map((item) => item.id),
                      },
                      "Disciplina retirada deste dia. Seu histórico foi mantido.",
                    )
                  }
                >
                  <Trash2 size={14} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        ))}
        <Button
          fullWidth
          size="small"
          variant="outlined"
          disabled={working}
          startIcon={disciplines.length ? <Pencil size={14} /> : undefined}
          sx={{
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
          {disciplines.length ? "Alterar disciplinas" : "Planejar disciplinas"}
        </Button>
      </Box>
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
                allowClear
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
            {disciplines.length > 0 && (
              <Button
                color="error"
                startIcon={<Trash2 size={16} />}
                disabled={working}
                onClick={async () => {
                  if (
                    await action(
                      `study-plan/${day}`,
                      "PUT",
                      { disciplineIds: [] },
                      "Planejamento deste dia removido.",
                    )
                  )
                    setOpen(false);
                }}
              >
                Limpar planejamento do dia
              </Button>
            )}
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
