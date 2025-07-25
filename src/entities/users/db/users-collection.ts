import { db } from "@/shared/firebase/config";
import { collection, CollectionReference } from "firebase/firestore";
import type { UserSelect } from "../schema";

export const usersCollection = collection(
  db,
  "users"
) as CollectionReference<UserSelect>;
