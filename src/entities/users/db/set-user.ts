import { auth } from "@/shared/firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { UserInsertSchema, type UserInsert } from "../schema";
import { usersCollection } from "./users-collection";

export async function setUser(data: UserInsert) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  UserInsertSchema.parse(data);
  await setDoc(doc(usersCollection, data.uid), {
    uid: data.uid,
    displayName: data.displayName,
    photoURL: data.photoURL,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return data.uid;
}
