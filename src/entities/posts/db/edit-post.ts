import { auth } from "@/shared/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { PostInsertSchema, type PostInsert } from "../schema";
import { postsCollection } from "./posts-collection";

export async function editPost(id: string, data: Partial<PostInsert>) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  PostInsertSchema.parse(data);
  await updateDoc(doc(postsCollection, id), data);
}
