import { auth } from "@/shared/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import z from "zod";
import { postsCollection } from "./posts-collection";

export async function deletePost(id: string) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  z.string().parse(id);
  await deleteDoc(doc(postsCollection, id));
}
