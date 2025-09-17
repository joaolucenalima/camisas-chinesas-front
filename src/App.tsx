import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AddPersonForm } from "./components/add-person-form";
import { Button } from "./components/button";
import { PersonSection } from "./components/person-section";
import { useModal } from "./contexts/useModal";

type ShirtType = {
  files: string[];
};

function App() {
  const { openModal } = useModal();

  const [shirts, setShirts] = useState<ShirtType>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/files`)
      .then((response) => response.json())
      .then((data) => setShirts(data));
  }, []);

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
        {shirts &&
          Object.entries(shirts?.files).map(([person, shirts]) => (
            <PersonSection key={person} personName={person} shirts={shirts} />
          ))}
      </main>
    </>
  );
}

export default App;
