import { X } from "lucide-react";
import { type ClipboardEvent, type FormEvent, useRef, useState } from "react";
import type { Shirt } from "@/entities/shirt/model/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useAddShirt } from "@/features/add-shirt/model/use-add-shirt";

const shirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

type AddShirtFormProps = {
  personId: string;
  personName: string;
  shirt?: Shirt;
};

export function AddShirtForm({ personId, personName, shirt }: AddShirtFormProps) {
  const { submitShirt, isPending } = useAddShirt({ personId, shirt });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState((shirt?.priceInCents || 0) / 100);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    shirt?.imageURL ? `${import.meta.env.VITE_API_URL}/getImage/${shirt.imageURL}` : null,
  );

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.currentTarget.value.replace(/\D/g, "");
    const integerValue = Number.parseInt(cleanedValue || "0", 10) / 100;
    setPrice(integerValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (readEvent) => {
      setSelectedImage(String(readEvent.target?.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData?.items;

    if (!items) {
      return;
    }

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];

      if (!item.type.includes("image")) {
        continue;
      }

      const file = item.getAsFile();

      if (!file) {
        break;
      }

      const url = URL.createObjectURL(file);
      setSelectedImage(url);

      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }

      break;
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const priceString = String(formData.get("price") || "0");
    const priceInCents = Math.round(
      Number(priceString.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".")) *
        100,
    );

    submitShirt({
      title: String(formData.get("title") || ""),
      size: String(formData.get("size") || ""),
      link: String(formData.get("link") || ""),
      priceInCents,
      image: (formData.get("image") as File)?.size
        ? (formData.get("image") as File)
        : undefined,
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
      <Input label="Pessoa" defaultValue={personName} readOnly disabled />

      <Input label="Nome *" id="title" name="title" defaultValue={shirt?.title} required />

      <Input
        label="Preco (R$) *"
        value={price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        onChange={handleChangePrice}
        name="price"
        id="price"
      />

      <div>
        <h2>Tamanho *</h2>

        <div className="flex flex-wrap items-center gap-4 mt-1">
          {shirtSizes.map((size) => (
            <label
              key={size}
              htmlFor={size}
              className="cursor-pointer border border-zinc-600 w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-zinc-700 has-[input:checked]:bg-blue-500 has-[input:checked]:text-white has-[input:checked]:border-blue-600 focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2"
            >
              <input
                className="sr-only"
                type="radio"
                name="size"
                id={size}
                value={size}
                defaultChecked={shirt?.size === size}
                required={!shirt}
              />
              <p className="text-sm font-medium select-none leading-none">{size}</p>
            </label>
          ))}
        </div>
      </div>

      <Input label="Link" id="link" name="link" defaultValue={shirt?.link} />

      <div onPaste={handlePaste}>
        <span className="block mb-1 text-sm font-medium">Imagem</span>

        <div className="flex items-center gap-4">
          {selectedImage ? (
            <div className="relative inline-block">
              <img
                src={selectedImage}
                alt="Preview"
                className="flex-1 w-32 h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="cursor-pointer absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
              >
                <X size={14} />
              </button>
            </div>
          ) : null}

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
      </div>

      <Button type="submit" className="self-end" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
