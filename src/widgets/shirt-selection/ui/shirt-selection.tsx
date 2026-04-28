import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePersonsQuery } from "@/entities/person/model/use-persons-query";
import { AddPersonForm } from "@/features/add-person/ui/add-person-form";
import { useModal } from "@/app/providers/modal/use-modal";
import { websocketMessages } from "@/shared/lib/websocket-messages";
import { Button } from "@/shared/ui/button";
import { PersonSection } from "@/widgets/person-section/ui/person-section";
import { useSocket } from "@/app/providers/socket/use-socket";
import { personQueryKeys } from "@/entities/person/api/query-keys";
import { shirtQueryKeys } from "@/entities/shirt/api/query-keys";

export function ShirtSelection() {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const { socket } = useSocket();
  const { data: persons } = usePersonsQuery();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const onMessage = (event: MessageEvent) => {
      const rawData = String(event.data || "");

      if (rawData.includes(websocketMessages.personModification)) {
        queryClient.invalidateQueries({ queryKey: personQueryKeys.all });
      }

      if (rawData.includes(websocketMessages.shirtModification)) {
        queryClient.invalidateQueries({ queryKey: shirtQueryKeys.all });
      }
    };

    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [queryClient, socket]);

  return (
    <>
      <header className="flex items-center justify-between flex-wrap gap-4 p-6 w-full">
        <h1 className="flex-1 text-2xl font-semibold">Camisas chinesas</h1>

        <Button
          onClick={() =>
            openModal({
              title: "Adicionar pessoa",
              modalElement: <AddPersonForm />,
            })
          }
        >
          <Plus /> Adicionar pessoa
        </Button>
      </header>

      <main className="w-full flex flex-col gap-4 p-6">
        {persons?.map((person) => (
          <PersonSection key={person.id} person={person} />
        ))}
      </main>
    </>
  );
}
