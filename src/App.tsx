import { Plus } from "lucide-react";
import { AddPersonForm } from "./components/add-person-form";
import { Button } from "./components/button";
import { PersonSection } from "./components/person-section";
import { useModal } from "./contexts/useModal";
import { useFetch } from "./hooks/use-fetch";

type PersonType = {
  id: string;
  name: string;
};

function App() {
  const { openModal } = useModal();

  const { data: persons, refetch } = useFetch<PersonType[]>("/person")

  return (
    <>
      <h1 className="text-3xl font-semibold">Camisas chinesas</h1>

      <p>Aplicação para fazer pedidos de camisas de time da china</p>

      <Button
        onClick={() =>
          openModal({
            title: "Adicionar pessoa",
            modalElement: <AddPersonForm personMutate={refetch} />,
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
