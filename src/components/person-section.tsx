import { Plus } from "lucide-react";
import { useMemo } from "react";
import type { PersonDTO } from "../dtos/personDTO";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { useAppContext } from "../hooks/use-app-context";
import { useFetch } from "../hooks/use-fetch";
import { useModal } from "../hooks/use-modal";
import { Shirt } from "./shirt";
import { ShirtForm } from "./shirt-form";

export function PersonSection({ person }: { person: PersonDTO }) {
  const { openModal } = useModal();
  const { dollarRate } = useAppContext();

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

  return (
    <section className="w-full">
      <div className="flex items-baseline gap-5 mb-4">
        <h2 className="text-3xl font-semibold">{person.name}</h2>

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
          className="w-60 h-[22rem] bg-zinc-900 border-2 border-dashed border-zinc-400 text-zinc-400 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800"
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
