import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AddPersonForm } from "./components/add-person-form";
import { Button } from "./components/button";
import { PersonSection } from "./components/person-section";
import { useModal } from "./contexts/useModal";

type PersonType = {
  id: string;
  name: string;
};

function App() {
  const { openModal, modal } = useModal();

  const [persons, setPersons] = useState<PersonType[]>([]);

  useEffect(() => {
    if (modal) return;

    fetch(`${import.meta.env.VITE_API_URL}/person`)
      .then((response) => response.json())
      .then((data) => setPersons(data));
  }, [modal]);

  return (
    <>
      <h1 className="text-3xl font-semibold">Camisas chinesas</h1>

      <p>Aplicação para fazer pedidos de camisas de time da china</p>

      <Button
        onClick={() =>
          openModal({
            title: "Adicionar pessoa",
            modalElement: <AddPersonForm />,
          })
        }
      >
        Adicionar pessoa <Plus />
      </Button>

      <main className="w-full flex flex-col gap-4 mt-2">
        {persons && persons.map(person => (
          <PersonSection key={person.name} person={person} />
        ))}
      </main>
    </>
  );
}

export default App;
