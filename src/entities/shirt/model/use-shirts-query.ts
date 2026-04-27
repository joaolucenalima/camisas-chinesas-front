import { useQuery } from "@tanstack/react-query";
import { getShirtsByPerson, shirtQueryKeys } from "@/entities/shirt/api/shirt-api";

export function useShirtsQuery(personId: string) {
  return useQuery({
    queryKey: shirtQueryKeys.byPerson(personId),
    queryFn: () => getShirtsByPerson(personId),
  });
}
