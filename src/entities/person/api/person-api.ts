import { httpClient } from "@/shared/api/http-client";
import type { Person, UpsertPersonInput } from "@/entities/person/model/types";

export const personQueryKeys = {
  all: ["person"] as const,
  detail: (personId: string) => ["person", personId] as const,
};

export async function getPersons() {
  const { data } = await httpClient.get<Person[]>("/person");
  return data;
}

export async function getPersonById(personId: string) {
  const { data } = await httpClient.get<Person>(`/person/${personId}`);
  return data;
}

export async function createPerson(payload: UpsertPersonInput) {
  const { data } = await httpClient.post<Person>("/person", payload);
  return data;
}

export async function updatePerson(personId: string, payload: UpsertPersonInput) {
  const { data } = await httpClient.put<Person>(`/person/${personId}`, payload);
  return data;
}
