import { Pencil, Trash2 } from "lucide-react";
import { Popover } from "react-tiny-popover";
import { shirtStatusView, type Shirt } from "@/entities/shirt/model/types";
import { AddShirtForm } from "@/features/add-shirt/ui/add-shirt-form";
import { useSelectShirt } from "@/features/select-shirt/model/use-select-shirt";
import { useModal } from "@/app/providers/modal/use-modal";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

type SelectShirtProps = {
  shirt: Shirt;
  personName: string;
};

export function SelectShirt({ shirt, personName }: SelectShirtProps) {
  const { openModal } = useModal();
  const {
    statusPopoverIsOpen,
    setStatusPopoverIsOpen,
    changeStatus,
    deleteById,
    isDeleting,
    isUpdatingStatus,
  } = useSelectShirt({ personId: shirt.personId });

  return (
    <div className="flex flex-col gap-4 bg-zinc-800 border border-zinc-600 rounded-lg relative w-60 min-h-[22rem] p-4">
      <img
        src={`${import.meta.env.VITE_API_URL}/getImage/${shirt.imageURL}`}
        alt={shirt.title}
        className="flex-1 min-h-40 bg-zinc-700 object-cover rounded-lg"
      />

      {shirt.link ? (
        <a
          href={shirt.link}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors cursor-pointer text-blue-300 hover:text-blue-400 hover:underline"
        >
          {shirt.title}
        </a>
      ) : (
        <p>{shirt.title}</p>
      )}

      <div className="flex items-center justify-between">
        {shirt.priceInCents ? (
          <p className="text-zinc-300">
            {(shirt.priceInCents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        ) : (
          "-"
        )}

        <p className="py-1 px-3 bg-zinc-700 font-medium rounded-2xl">Tamanho {shirt.size}</p>
      </div>

      <Popover
        isOpen={statusPopoverIsOpen}
        positions={["bottom", "top", "right", "left"]}
        padding={4}
        onClickOutside={() => setStatusPopoverIsOpen(false)}
        align="end"
        content={
          <ul className="bg-zinc-800 text-white rounded-lg p-4 border border-zinc-600 shadow-sm shadow-zinc-500 flex flex-col gap-2">
            {Object.entries(shirtStatusView).map(([status, statusView]) => (
              <li className="flex-1" key={statusView.text}>
                <button
                  type="button"
                  title={`Selecionar status ${statusView.text}`}
                  className={`w-full px-2 py-1 rounded-lg cursor-pointer ${statusView.color} transition-opacity hover:opacity-85`}
                  onClick={() => {
                    changeStatus(shirt.id, Number(status) as 1 | 2 | 3 | 4);
                  }}
                  disabled={isUpdatingStatus}
                >
                  {statusView.text}
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
          className={`text-center font-medium px-2 h-10 rounded-lg cursor-pointer ${shirtStatusView[shirt.status].color} hover:opacity-85 transition-opacity`}
          disabled={isUpdatingStatus}
        >
          {shirtStatusView[shirt.status].text}
        </button>
      </Popover>

      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          aria-label="Apagar camisa"
          title="Apagar camisa"
          onClick={() =>
            openModal({
              title: "Apagar camisa",
              modalElement: (
                <ConfirmDialog
                  message={
                    <p>
                      Tem certeza que deseja apagar a camisa <strong>{shirt.title}</strong>?
                    </p>
                  }
                  onConfirm={() => deleteById(shirt.id)}
                />
              ),
            })
          }
          disabled={isDeleting}
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
              modalElement: <AddShirtForm personId={shirt.personId} personName={personName} shirt={shirt} />,
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
