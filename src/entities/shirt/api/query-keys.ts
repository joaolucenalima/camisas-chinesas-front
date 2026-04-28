export const shirtQueryKeys = {
  all: ["shirt"] as const,
  byPerson: (personId: string) => ["shirt", "person", personId] as const,
  detail: (shirtId: number) => ["shirt", shirtId] as const,
};
