import { auth } from "@/shared/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { UserInsertSchema, type UserInsert } from "../schema";
import { usersCollection } from "./users-collection";

export async function updateUser(data: UserInsert) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  UserInsertSchema.parse(data);
  await updateDoc(doc(usersCollection, data.uid), {
    uid: data.uid,
    displayName: data.displayName,
    photoURL: data.photoURL,
    bannerURL: data.bannerURL,
    bio: data.bio,
  });
  return data.uid;
}
