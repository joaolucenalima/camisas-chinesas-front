import { PencilLine, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import type { PersonDTO } from "../dtos/personDTO";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { WebSocketsMessages } from "../dtos/webSocketDTO";
import { useAppContext } from "../hooks/use-app-context";
import { useFetch } from "../hooks/use-fetch";
import { useModal } from "../hooks/use-modal";
import { PersonForm } from "./person-form";
import { Shirt } from "./shirt";
import { ShirtForm } from "./shirt-form";

export function PersonSection({
  person,
  getPersons,
}: {
  person: PersonDTO;
  getPersons: () => void;
}) {
  const { openModal } = useModal();
  const { dollarRate, socket } = useAppContext();

  const { data: shirts, refetch } = useFetch<ShirtDTO[]>(`/shirt/by-person/${person.id}`);

  const shirtsAmount = useMemo(() => {
    const amount = shirts
      ?.filter((shirt) => shirt.status === 3)
      .reduce((amount, shirt) => {
        return (amount += shirt.priceInCents);
      }, 0);

    if (amount) {
      return {
        amountInDollar: (amount / 100).toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        }),
        amountInReal: ((amount / 100) * (dollarRate || 1)).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        }),
      };
    }

    return null;
  }, [shirts, dollarRate]);

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener("message", (event) => {
      if (event.data.includes(WebSocketsMessages.SHIRT_MODIFICATION)) {
        refetch();
      }
    });
  }, [refetch, socket]);

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-4">
        <h2 className="text-3xl font-semibold">{person.name}</h2>

        <button
          onClick={() =>
            openModal({
              title: "Editar pessoa",
              modalElement: <PersonForm personId={person.id} refetch={getPersons} />,
            })
          }
          className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-300"
          title="Editar pessoa"
        >
          <PencilLine size={18} />
        </button>

        {shirtsAmount ? (
          <p className="text-zinc-300 text-lg leading-none">
            Total: {shirtsAmount.amountInDollar} ({shirtsAmount.amountInReal})
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {shirts?.map((shirt) => (
          <Shirt key={shirt.id} shirt={shirt} refetch={refetch} />
        ))}

        <button
          className="w-60 min-h-[22rem] bg-zinc-900 border-2 border-dashed border-zinc-400 text-zinc-400 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800"
          title="Adicionar camisa"
          onClick={() =>
            openModal({
              title: "Adicionar camisa",
              modalElement: <ShirtForm personId={person.id} refetch={refetch} />,
            })
          }
        >
          <Plus size={80} strokeWidth={1} />
          <p className="font-medium text-lg">Adicionar camisa</p>
        </button>
      </div>
    </section>
  );
}
