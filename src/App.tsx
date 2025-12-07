import { Plus } from "lucide-react";
import { AddPersonForm } from "./components/add-person-form";
import { Button } from "./components/button";
import { PersonSection } from "./components/person-section";
import { useAppContext } from "./hooks/use-app-context";
import { useFetch } from "./hooks/use-fetch";
import { useModal } from "./hooks/use-modal";

type PersonType = {
  id: string;
  name: string;
};

function App() {
  const { openModal } = useModal();
  const { dollarRate } = useAppContext();

  const { data: persons, refetch } = useFetch<PersonType[]>("/person");

  return (
    <>
      <header className="flex items-center justify-between p-6 w-full">
        <h1 className="text-2xl font-semibold">Camisas chinesas</h1>

        <div className="flex items-center gap-8">
          <div className="bg-zinc-800 font-semibold py-3 px-5 rounded-lg leading-none">
            <p>
              Dólar hoje:{" "}
              {dollarRate?.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
          </div>

          <Button
            onClick={() =>
              openModal({
                title: "Adicionar pessoa",
                modalElement: <AddPersonForm personMutate={refetch} />,
              })
            }
          >
            <Plus /> Adicionar pessoa
          </Button>
        </div>
      </header>

      <main className="w-full flex flex-col gap-4 p-6">
        {persons && persons.map((person) => <PersonSection key={person.id} person={person} />)}
      </main>
    </>
  );
}

export default App;
