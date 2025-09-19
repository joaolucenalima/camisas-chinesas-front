import { useState, type FormEvent } from "react";
import { useAppContext } from "../contexts/app-context";
import { useModal } from "../contexts/useModal";
import { Button } from "./button";
import { Input } from "./input";

const SHIRTS_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export function AddShirtForm({ personId, refetch }: { personId: string; refetch: () => void }) {
  const { dollarRate } = useAppContext();
	const { closeModal } = useModal();

  const [priceInBRL, setPriceInBRL] = useState<number>();

  function maskCurrency(event: React.FormEvent<HTMLInputElement>) {
    const cleanedValue = event.currentTarget.value.replace(/\D/g, "");
    const integerValue = parseInt(cleanedValue || "0", 10) / 100;

    if (dollarRate) {
      setPriceInBRL(integerValue * dollarRate);
    }

    event.preventDefault();

    event.currentTarget.value = integerValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    fetch(`${import.meta.env.VITE_API_URL}/shirt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
				...data,
				priceInCents: data.price * 100,
				personId
			}),
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        refetch();
      });
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input label="Nome" name="title" />

      <div className="flex items-center gap-4">
        <Input
          label="Preço (dólares)"
          onChange={maskCurrency}
          defaultValue={"$0.00"}
          className="flex-1"
          name="price"
        />

        <span className="text-center">
          <p>Preço em reais:</p>
          <p>
            {priceInBRL?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }) || "R$ 0"}
          </p>
        </span>
      </div>

      <div>
        <h2>Tamanho</h2>

        <div className="flex items-center justify-between mt-1">
          {SHIRTS_SIZES.map((size) => (
            <label
              key={size}
              htmlFor={size}
              className="cursor-pointer border border-zinc-400 w-9 h-9 flex items-center justify-center rounded hover:border-blue-400 has-[input:checked]:bg-blue-500 has-[input:checked]:text-white has-[input:checked]:border-blue-600"
            >
              <input className="sr-only" type="radio" name="shirtSize" id={size} value={size} />
              <p className="text-sm select-none">{size}</p>
            </label>
          ))}
        </div>
      </div>

      <Input label="Link" name="link" />

      <label className="block cursor-pointer">
        <span className="block mb-1 text-sm font-medium text-gray-700">Imagem</span>
        <input
          type="file"
          name="image"
          id="image"
          className="block w-full text-sm text-gray-500
						file:mr-4 file:py-2 file:px-4
						file:rounded file:border-0
						file:text-sm file:font-semibold
						file:bg-blue-50 file:text-blue-700
						hover:file:bg-blue-100
						cursor-pointer"
        />
      </label>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
