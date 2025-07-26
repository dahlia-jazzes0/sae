import type { User } from "firebase/auth";
import { use } from "react";
import { AuthContext } from "./auth-context";

export function useAuth(assert: true): User;
export function useAuth(assert?: false): User | null;
export function useAuth(assert = false) {
  const auth = use(AuthContext);
  if (assert && auth == null) throw new Error("no auth");
  return auth;
}
