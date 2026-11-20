import PetCareStatus from "../../shared/components/pet/PetCareStatus.jsx";
import PetCareRules from "../../shared/components/pet/PetCareRules.jsx";
import { Paper, Button } from "@mui/material";
import { ArrowRight, Check, LockKeyhole, Sparkles } from "lucide-react";
import {
  PetArt,
  PetPicker,
  speciesInfo,
  displayName,
} from "../../shared/components/Pet.jsx";
import { useCollection } from "./hooks/useCollection.jsx";
export default function Collection({ data, action, working, navigate }) {
  const { pet, team, adopt, setAdopt, activate } = useCollection({
    data,
    action,
    working,
    navigate,
  });
  return (
    <div className="view-stack">
      <Paper
        component="div"
        variant="outlined"
        className="nimbo-collection-banner"
      >
        <div>
          <h2>Seus companheiros</h2>
          <div className="collection-hero-tags">
            <span>{team.length} companheiros</span>
            <span>{team.filter((t) => t.stage === 3).length} evoluídos</span>
          </div>
        </div>
        <PetArt
          species={pet?.species || "nori"}
          stage={pet?.stage || 1}
          mood={pet?.mood}
          large
        />
      </Paper>
      <PetCareRules />
      <div className="section-intro">
        <div>
          <h2>Coleção</h2>
        </div>
        {pet?.canAdopt && (
          <Button
            className="btn btn-primary"
            onClick={() => setAdopt(!adopt)}
            type="button"
          >
            <Sparkles size={16} /> Conhecer outro
          </Button>
        )}
      </div>
      <div className="nimbo-collection-grid">
        {team.map((member) => (
          <Paper
            component="article"
            variant="outlined"
            className={`nimbo-collection-card ${member.active ? "active" : ""}`}
            key={member.id}
          >
            <div
              className="nimbo-collection-visual"
              style={{
                "--nimbo-tone": speciesInfo(member.species).light,
              }}
            >
              <PetArt
                species={member.species}
                stage={member.stage}
                mood={member.mood}
                large
              />
            </div>
            <div className="nimbo-collection-info">
              <div className="nimbo-collection-name">
                <strong>{displayName(member.species, member.stage)}</strong>
                {member.active && (
                  <span>
                    <Check size={13} /> Ativo
                  </span>
                )}
              </div>
              <p>
                Nível {member.level} · {member.xp} XP · Energia {member.energy}%
              </p>
              <div className="nimbo-meter">
                <i
                  style={{
                    width: `${member.energy}%`,
                  }}
                />
              </div>
              <PetCareStatus pet={member} action={action} working={working} />
              <Button
                className="btn btn-subtle"
                disabled={working || member.active}
                onClick={() => activate(member.id)}
                type="button"
              >
                {member.active
                  ? "Seu companheiro atual"
                  : "Escolher este companheiro"}{" "}
                <ArrowRight size={15} />
              </Button>
            </div>
          </Paper>
        ))}
      </div>
      {team.length === 0 && (
        <Paper component="div" variant="outlined" className="simple-card">
          <p>Escolha seu primeiro Nimbo na tela inicial.</p>
          <Button
            className="btn btn-primary"
            onClick={() => navigate("dashboard")}
            type="button"
          >
            Ir ao início
          </Button>
        </Paper>
      )}
      {adopt && (
        <PetPicker
          compact
          availableSpecies={pet.availableSpecies}
          working={working}
          onSelect={async (species) => {
            if (
              await action(
                "pet",
                "POST",
                {
                  species,
                },
                "Novo Nimbo adicionado!",
              )
            )
              setAdopt(false);
          }}
        />
      )}
      {team.length > 0 && !pet?.canAdopt && (
        <div className="nimbo-lock-note">
          <LockKeyhole size={18} /> Para acolher outra variação, eleve todos os
          Nimbos da sua coleção à forma radiante, no nível 13.
        </div>
      )}
    </div>
  );
}
