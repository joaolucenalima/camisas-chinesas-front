export interface ShirtDTO {
  id: number;
  title: string;
  link: string;
  imageURL: string;
  priceInCents: number;
  personId: string;
  size: string;
  status: 1 | 2 | 3 | 4;
}
