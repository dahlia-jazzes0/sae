import { db } from "@/shared/firebase/config";
import { collection, CollectionReference } from "firebase/firestore";
import type { PostSelect } from "../schema";

export const postsCollection = collection(
  db,
  "posts"
) as CollectionReference<PostSelect>;
