import z from "zod";

export type UserSelect = { createdAt: number } & UserInsert;
export type UserInsert = z.infer<typeof UserInsertSchema>;
export const UserInsertSchema = z.object({
  uid: z.string(),
  displayName: z.string().nullish(),
  photoURL: z.string().nullish(),
  bio: z.string().nullish(),
  bannerURL: z.string().nullish(),
});
