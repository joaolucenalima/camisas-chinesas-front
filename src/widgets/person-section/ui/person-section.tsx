import { PencilLine, Plus } from "lucide-react";
import { useMemo } from "react";
import type { Person } from "@/entities/person/model/types";
import { useShirtsQuery } from "@/entities/shirt/model/use-shirts-query";
import { AddPersonForm } from "@/features/add-person/ui/add-person-form";
import { AddShirtForm } from "@/features/add-shirt/ui/add-shirt-form";
import { SelectShirt } from "@/features/select-shirt/ui/select-shirt";
import { useModal } from "@/app/providers/modal/use-modal";

type PersonSectionProps = {
  person: Person;
};

export function PersonSection({ person }: PersonSectionProps) {
  const { openModal } = useModal();
  const { data: shirts } = useShirtsQuery(person.id);

  const shirtsAmount = useMemo(() => {
    const amount = shirts
      ?.filter((shirt) => shirt.status === 3)
      .reduce((accumulator, shirt) => accumulator + shirt.priceInCents, 0);

    if (!amount) {
      return null;
    }

    return {
      amountInReal: (amount / 100).toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
      }),
    };
  }, [shirts]);

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-4">
        <h2 className="text-2xl font-semibold">{person.name}</h2>

        <button
          type="button"
          onClick={() =>
            openModal({
              title: "Editar pessoa",
              modalElement: <AddPersonForm personId={person.id} defaultName={person.name} />,
            })
          }
          className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-300"
          title="Editar pessoa"
        >
          <PencilLine size={18} />
        </button>

        {shirtsAmount ? <p className="text-zinc-300 text-lg leading-none">Total: {shirtsAmount.amountInReal}</p> : null}
      </div>

      <div className="flex flex-wrap gap-4">
        {shirts?.map((shirt) => (
          <SelectShirt key={shirt.id} shirt={shirt} personName={person.name} />
        ))}

        <button
          type="button"
          className="w-60 min-h-[22rem] bg-zinc-900 border-2 border-dashed border-zinc-400 text-zinc-400 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800"
          title="Adicionar camisa"
          onClick={() =>
            openModal({
              title: "Adicionar camisa",
              modalElement: <AddShirtForm personId={person.id} personName={person.name} />,
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
