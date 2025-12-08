import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import type { ShirtDTO } from "../dtos/shirtDTO";
import { useModal } from "../hooks/use-modal";
import { Button } from "./button";
import { ShirtForm } from "./shirt-form";

const SHIRT_STATUS = {
  1: {
    text: "Decidindo",
    color: "bg-zinc-600",
  },
  2: {
    text: "Aguardando resposta",
    color: "bg-yellow-600",
  },
  3: {
    text: "Para compra",
    color: "bg-green-600",
  },
  4: { text: "Sem interesse", color: "bg-red-700" },
};

export function Shirt({ shirt, refetch }: { shirt: ShirtDTO; refetch: () => void }) {
  const { openModal, confirm } = useModal();

  const [statusPopoverIsOpen, setStatusPopoverIsOpen] = useState(false);

  function handleChangeShirtStatus(status: number, shirtId: number) {
    fetch(`${import.meta.env.VITE_API_URL}/shirt/${shirtId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }).then(() => {
      refetch();
    });
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-800 border border-zinc-600 rounded-lg relative w-60 min-h-[22rem] p-4">
      <img
        src={`${window.location.origin}/api/getImage/${shirt.imageURL}`}
        alt={shirt.title}
        className="flex-1 bg-zinc-700 object-cover rounded-lg"
      />

      {shirt.link ? (
        <a
          href={shirt.link}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors cursor-pointer text-blue-300 hover:text-blue-400 w-max"
        >
          {shirt.title}
        </a>
      ) : (
        <p>{shirt.title}</p>
      )}

      <div className="flex items-center justify-between">
        {shirt.priceInCents ? (
          <p className="text-zinc-300">
            {(shirt.priceInCents / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        ) : (
          "-"
        )}

        <p className="py-1 px-3 bg-zinc-700 font-medium rounded-2xl">Tamanho {shirt.size}</p>
      </div>

      {SHIRT_STATUS[shirt.status] ? (
        <Popover
          isOpen={statusPopoverIsOpen}
          positions={["bottom", "top", "right", "left"]}
          padding={4}
          onClickOutside={() => setStatusPopoverIsOpen(false)}
          align="end"
          content={
            <ul className="bg-zinc-800 text-white rounded-lg p-4 border border-zinc-600 shadow-sm shadow-zinc-500 flex flex-col gap-2">
              {Object.values(SHIRT_STATUS).map((status, index) => (
                <li className="flex-1">
                  <button
                    type="button"
                    title={`Selecionar status ${status.text}`}
                    className={`w-full px-2 py-1 rounded-lg cursor-pointer ${status.color} transition-opacity hover:opacity-85`}
                    onClick={() => {
                      handleChangeShirtStatus(index + 1, shirt.id);
                      setStatusPopoverIsOpen(false);
                    }}
                  >
                    {status.text}
                  </button>
                </li>
              ))}
            </ul>
          }
        >
          <button
            type="button"
            title="Mudar status"
            aria-label="Mudar status"
            onClick={() => setStatusPopoverIsOpen((prev) => !prev)}
            className={`text-center font-medium px-2 h-10 rounded-lg cursor-pointer ${
              SHIRT_STATUS[shirt.status].color
            } hover:opacity-85 transition-opacity`}
          >
            {SHIRT_STATUS[shirt.status].text}
          </button>
        </Popover>
      ) : (
        ""
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          aria-label="Apagar camisa"
          title="Apagar camisa"
          onClick={() =>
            confirm({
              message: (
                <p>
                  Tem certeza que deseja apagar a camisa <strong>{shirt.title}</strong>?
                </p>
              ),
              onConfirm: () => {
                fetch(`${import.meta.env.VITE_API_URL}/shirt/${shirt.id}`, {
                  method: "DELETE",
                }).then(() => {
                  refetch();
                });
              },
              title: "Apagar camisa",
            })
          }
        >
          <Trash2 size={16} />
        </Button>

        <Button
          variant="secondary"
          className="flex-1"
          title="Editar camisa"
          aria-label="Editar camisa"
          onClick={() =>
            openModal({
              modalElement: <ShirtForm id={shirt.id} personId={shirt.personId} refetch={refetch} />,
              title: "Editar camisa",
            })
          }
        >
          <Pencil size={16} /> Editar
        </Button>
      </div>
    </div>
  );
}
