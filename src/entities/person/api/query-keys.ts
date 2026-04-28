export const personQueryKeys = {
  all: ["person"] as const,
  detail: (personId: string) => ["person", personId] as const,
};
