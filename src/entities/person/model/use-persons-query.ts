import { useQuery } from "@tanstack/react-query";
import { getPersons, personQueryKeys } from "@/entities/person/api/person-api";

export function usePersonsQuery() {
  return useQuery({
    queryKey: personQueryKeys.all,
    queryFn: getPersons,
  });
}
