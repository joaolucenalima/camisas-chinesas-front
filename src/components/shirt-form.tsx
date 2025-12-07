import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent } from "react";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { useAppContext } from "../hooks/use-app-context";
import { useFetch } from "../hooks/use-fetch";
import { useModal } from "../hooks/use-modal";
import { Button } from "./button";
import { Input } from "./input";

interface ShirtForm {
  id?: number;
  personId: string;
  refetch: () => void;
}

const SHIRTS_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export function ShirtForm({ id, personId, refetch }: ShirtForm) {
  const { dollarRate } = useAppContext();
  const { closeModal } = useModal();

  const { data: shirt } = useFetch<ShirtDTO>(`/shirt/${id}`, !!id);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<number>(shirt?.priceInCents || 0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    const cleanedValue = e.currentTarget.value.replace(/\D/g, "");
    const integerValue = parseInt(cleanedValue || "0", 10) / 100;
    setPrice(integerValue);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        if (file) {
          const url = URL.createObjectURL(file);
          setSelectedImage(url);
        }
        break;
      }
    }
  };

  function handleRemoveImage() {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const priceString = (formData.get("price") as string) || "0";
    const priceInCents = Math.round(Number(priceString.replace(/[$,]/g, "")) * 100);

    const submitData = new FormData();

    submitData.append("title", formData.get("title") as string);
    submitData.append("size", formData.get("size") as string);
    submitData.append("link", formData.get("link") as string);
    submitData.append("priceInCents", priceInCents.toString());
    submitData.append("personId", personId);

    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size > 0) {
      submitData.append("image", imageFile);
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `${import.meta.env.VITE_API_URL}/shirt/${id}`
      : `${import.meta.env.VITE_API_URL}/shirt`;

    fetch(url, {
      method: method,
      body: submitData,
    }).then(() => {
      closeModal();
      refetch();
    });
  }

  useEffect(() => {
    setPrice((shirt?.priceInCents || 0) / 100);
  }, [shirt]);

  useEffect(() => {
    if (shirt?.imageURL && !selectedImage) {
      const imageUrl = `${import.meta.env.VITE_API_URL}/getImage/${shirt.imageURL}`;
      setSelectedImage(imageUrl);
    }
  }, [shirt?.imageURL, selectedImage]);

  if (id && !shirt) return null;

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
      <Input label="Nome *" name="title" defaultValue={shirt?.title} />

      <div className="flex items-center gap-4">
        <Input
          label="Preço (dólares) *"
          value={price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          onChange={handleChangePrice}
          className="flex-1"
          name="price"
          id="price"
        />

        <span className="text-center">
          <p>Preço em reais:</p>
          <p>
            {(price * (dollarRate || 1)).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }) || "R$ 0"}
          </p>
        </span>
      </div>

      <div>
        <h2>Tamanho *</h2>

        <div className="flex flex-wrap items-center gap-4 mt-1">
						{SHIRTS_SIZES.map((size) => (
						<label
							key={size}
							htmlFor={size}
							className="cursor-pointer border border-zinc-600 w-10 h-10 
							flex items-center justify-center rounded-lg transition-colors 
							hover:bg-zinc-700 has-[input:checked]:bg-blue-500 
							has-[input:checked]:text-white has-[input:checked]:border-blue-600
							focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2"
						>
							<input
							className="sr-only"
							type="radio"
							name="size"
							id={size}
							value={size}
							defaultChecked={shirt?.size == size}
							/>
							<p className="text-sm font-medium select-none leading-none">{size}</p>
						</label>
						))}
        </div>
      </div>

      <Input label="Link" name="link" defaultValue={shirt?.link} />

      <div className="block" onPaste={handlePaste}>
        <span className="block mb-1 text-sm font-medium">Imagem</span>

        <div className="flex items-center gap-4">
          {selectedImage && (
            <div className="mb-3 relative inline-block">
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
                x
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block flex-1 text-sm text-gray-500
						file:mr-4 file:py-2 file:px-4
						file:rounded file:border-0
						file:text-sm file:font-semibold
						file:bg-blue-50 file:text-blue-700
						hover:file:bg-blue-100
						cursor-pointer"
          />
        </div>
      </div>

      <Button type="submit" className="self-end">
        Salvar
      </Button>
    </form>
  );
}
