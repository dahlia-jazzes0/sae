import { auth } from "@/shared/firebase/config";
import { memoizeAsync } from "@/shared/promise/memoize-async";
import { doc, getDoc } from "firebase/firestore";
import z from "zod";
import { usersCollection } from "./users-collection";

export type User = Awaited<ReturnType<typeof getUser>>;
export const getUser = memoizeAsync(
  async (uid: string) => {
    const user = auth.currentUser;
    if (user == null) throw "no authentication";
    z.string().parse(uid);
    const _doc = await getDoc(doc(usersCollection, uid));
    return { uid, ..._doc.data() };
  },
  (uid) => uid
);
