import z from "zod";

export type UserSelectWithId = { id: string } & UserSelect;
export type UserSelect = { createdAt: number } & UserInsert;
export type UserInsert = z.infer<typeof UserInsertSchema>;
export const UserInsertSchema = z.object({
  uid: z.string(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable(),
});
