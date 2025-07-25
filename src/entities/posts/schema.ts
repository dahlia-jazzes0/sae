import type { Timestamp } from "firebase/firestore";
import z from "zod";
import type { UserSelect } from "../users/schema";

export type PostSelectWithId = { id: string } & PostSelect;
export type PostSelect = {
  author: { uid: string } & Partial<UserSelect>;
  createdAt: Timestamp;
} & PostInsert;
export type PostInsert = z.infer<typeof PostInsertSchema>;
export const PostInsertSchema = z.object({
  content: z.string().max(1024),
});
