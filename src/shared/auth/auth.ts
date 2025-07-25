import * as db from "@/entities/users/db/set-user";
import { auth } from "@/shared/firebase/config";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  signInOptionsSchema,
  signUpOptionsSchema,
  type SignInOptions,
  type SignUpOptions,
} from "./schema";

export const signUp = async (options: SignUpOptions) => {
  const { email, password, displayName } = signUpOptionsSchema.parse(options);
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credential.user;
  if (user) {
    await updateProfile(user, {
      displayName,
    });
    await db.setUser(user);
  }
  return credential;
};
export const signIn = async (options: SignInOptions) => {
  const { email, password } = signInOptionsSchema.parse(options);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};
