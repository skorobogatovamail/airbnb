import { z } from 'zod';

export const entrySchema = z.object({
  address: z.string(),
  description: z.string(),
  hostId: z.string(),
  name: z.string(),
  key: z.string(),
});

export type EntryType = z.infer<typeof entrySchema>;

export type EntryFormType = Omit<EntryType, 'key'>;

export type EntryStateType = {
  entries: EntryType[];
  currentEntry: EntryType | null;
  favorites: EntryType[];
};
