import { auth } from "@/shared/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import z from "zod";
import { usersCollection } from "./users-collection";

export async function getUser(uid: string) {
  const user = auth.currentUser;
  if (user == null) throw "no authentication";
  z.string().parse(uid);
  const _doc = await getDoc(doc(usersCollection, uid));
  return { uid, ..._doc.data() };
}
