import { useState } from "react";
export function useCollection({ data, action, working, navigate }) {
  const pet = data.pet,
    team = pet?.collection || [],
    [adopt, setAdopt] = useState(false);
  const activate = (id) =>
    action(`pet/active/${id}`, "PUT", undefined, "Companheiro ativado.");
  return {
    pet,
    team,
    adopt,
    setAdopt,
    activate,
  };
}
