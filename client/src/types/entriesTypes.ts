import { z } from 'zod';

export const entrySchema = z.object({
  address: z.string(),
  description: z.string(),
  hostId: z.number().optional().nullable(),
  name: z.string(),
  key: z.string().optional().nullable(),
  image: z.string().optional(),
});

export type EntryType = z.infer<typeof entrySchema>;

export const entryFormSchema = z.object({
  address: z.string(),
  description: z.string(),
  hostId: z.number().optional().nullable(),
  name: z.string(),
  image: z.string().optional(),
});

export type EntryFormType = Omit<EntryType, 'key'>;

export type EntryStateType = {
  entries: EntryType[];
  currentEntry: EntryType | null;
  favorites: EntryType[];
};

export type UploadPhotoLinkType = {
  link: string;
};

export type UploadPhotoType = {
  photo: object;
};
