import { useQuery } from "@tanstack/react-query";
import { getShirtsByPerson } from "@/entities/shirt/api/shirt-api";
import { shirtQueryKeys } from "../api/query-keys";

export function useShirtsQuery(personId: string) {
  return useQuery({
    queryKey: shirtQueryKeys.byPerson(personId),
    queryFn: () => getShirtsByPerson(personId),
  });
}
