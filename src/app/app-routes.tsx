import { AuthLayout } from "@/pages/auth/_auth-layout.tsx";
import { SignInPage } from "@/pages/auth/sign-in/_sign-in-page.tsx";
import { SignUpPage } from "@/pages/auth/sign-up/_sign-up-page.tsx";
import { IndexPage } from "@/pages/index/index-page.tsx";
import { Route, Routes } from "react-router";
import { AppLayout } from "./app-layout.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<IndexPage />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
