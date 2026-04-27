export type ShirtStatus = 1 | 2 | 3 | 4;

export type Shirt = {
  id: number;
  title: string;
  link: string;
  imageURL: string;
  priceInCents: number;
  personId: string;
  size: string;
  status: ShirtStatus;
};

export type UpsertShirtInput = {
  title: string;
  size: string;
  link: string;
  personId: string;
  priceInCents: number;
  image?: File;
};

export const shirtStatusView = {
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
  4: {
    text: "Sem interesse",
    color: "bg-red-700",
  },
} as const;
