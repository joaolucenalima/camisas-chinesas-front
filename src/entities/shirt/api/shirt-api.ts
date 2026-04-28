import { httpClient } from "@/shared/api/http-client";
import type { Shirt, ShirtStatus, UpsertShirtInput } from "@/entities/shirt/model/types";

export async function getShirtsByPerson(personId: string) {
  const data = await httpClient.get<Shirt[]>(`/shirt/by-person/${personId}`);
  return data;
}

export async function getShirtById(shirtId: number) {
  const data = await httpClient.get<Shirt>(`/shirt/${shirtId}`);
  return data;
}

export async function createShirt(payload: UpsertShirtInput) {
  const formData = buildShirtFormData(payload);
  const data = await httpClient.post<Shirt>("/shirt", formData);
  return data;
}

export async function updateShirt(shirtId: number, payload: UpsertShirtInput) {
  const formData = buildShirtFormData(payload);
  const data = await httpClient.put<Shirt>(`/shirt/${shirtId}`, formData);
  return data;
}

export async function deleteShirt(shirtId: number) {
  await httpClient.delete(`/shirt/${shirtId}`);
}

export async function updateShirtStatus(shirtId: number, status: ShirtStatus) {
  const data = await httpClient.put<Shirt>(`/shirt/${shirtId}`, { status });
  return data;
}

function buildShirtFormData(payload: UpsertShirtInput) {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("size", payload.size);
  formData.append("link", payload.link);
  formData.append("personId", payload.personId);
  formData.append("priceInCents", payload.priceInCents.toString());

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
}
