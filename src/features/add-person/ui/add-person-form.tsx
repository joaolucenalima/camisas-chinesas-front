import type { FormEvent } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useAddPerson } from "@/features/add-person/model/use-add-person";

type AddPersonFormProps = {
  personId?: string;
  defaultName?: string;
};

export function AddPersonForm({ personId, defaultName }: AddPersonFormProps) {
  const { submitPerson, isPending } = useAddPerson(personId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();

    if (!name) {
      return;
    }

    submitPerson(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Nome"
        id="name"
        name="name"
        placeholder="Digite o nome da pessoa"
        defaultValue={defaultName}
        autoComplete="off"
        autoFocus
        required
      />

      <Button type="submit" className="self-end" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
