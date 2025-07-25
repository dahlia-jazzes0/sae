import { use } from "react";
import { AuthContext } from "./auth-context";

export function useAuth() {
  return use(AuthContext);
}
