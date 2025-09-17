import type { FormEvent } from "react";
import { useModal } from "../contexts/useModal";
import { Button } from "./button";
import { Input } from "./input";

export function AddPersonForm() {
  const { closeModal } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    fetch(`${import.meta.env.VITE_API_URL}/files`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => closeModal());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <Input label="Nome" name="name" autoComplete="off" required />

      <Button type="submit">Salvar</Button>
    </form>
  );
}
