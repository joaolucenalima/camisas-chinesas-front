import type { FormEvent } from "react";
import { useModal } from "../contexts/useModal";
import { Button } from "./button";
import { Input } from "./input";

export function AddPersonForm({ personMutate }: { personMutate: () => void }) {
  const { closeModal } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    fetch(`${import.meta.env.VITE_API_URL}/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        personMutate();
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <Input label="Nome" name="name" autoComplete="off" required />

      <Button type="submit">Salvar</Button>
    </form>
  );
}
