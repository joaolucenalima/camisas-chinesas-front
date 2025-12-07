import type { FormEvent } from "react";
import type { PersonDTO } from "../dtos/personDTO";
import { useFetch } from "../hooks/use-fetch";
import { useModal } from "../hooks/use-modal";
import { Button } from "./button";
import { Input } from "./input";

export function PersonForm({ refetch, personId }: { refetch: () => void; personId?: string }) {
  const { closeModal } = useModal();

  const { data: person } = useFetch<PersonDTO>(`/person/${personId}`, !!personId);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const method = personId ? "PUT" : "POST";
    const url = personId
      ? `${import.meta.env.VITE_API_URL}/person/${personId}`
      : `${import.meta.env.VITE_API_URL}/person`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      closeModal();
      refetch();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Nome"
        name="name"
        placeholder="Digite o nome da pessoa"
        defaultValue={person?.name}
        autoComplete="off"
        autoFocus
        required
      />

      <Button type="submit" className="self-end">
        Salvar
      </Button>
    </form>
  );
}
