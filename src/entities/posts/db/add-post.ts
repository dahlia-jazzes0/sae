import { auth } from "@/shared/firebase/config";
import { addDoc, Timestamp } from "firebase/firestore";
import { PostInsertSchema, type PostInsert } from "../schema";
import { postsCollection } from "./posts-collection";

export async function addPost(data: PostInsert) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  PostInsertSchema.parse(data);
  const res = await addDoc(postsCollection, {
    content: data.content,
    author: { uid: user.uid },
    createdAt: Timestamp.fromDate(new Date()),
  });
  return res.id;
}
