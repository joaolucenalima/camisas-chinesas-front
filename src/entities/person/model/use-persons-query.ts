import { useQuery } from "@tanstack/react-query";
import { getPersons } from "../api/person-api";
import { personQueryKeys } from "../api/query-keys";

export function usePersonsQuery() {
  return useQuery({
    queryKey: personQueryKeys.all,
    queryFn: getPersons,
  });
}
