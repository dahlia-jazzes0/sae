import { AuthLayout } from "@/pages/auth/layout.tsx";
import { SignInPage } from "@/pages/auth/sign-in/page.tsx";
import { SignUpPage } from "@/pages/auth/sign-up/page.tsx";
import { IndexPage } from "@/pages/index/page.tsx";
import { SettingsProfilePage } from "@/pages/settings/profile/page.tsx";
import { SettingsLayout } from "@/pages/settings/layout.tsx";
import { SettingsGeneralPage } from "@/pages/settings/general/page.tsx";
import { UserPage } from "@/pages/users/page.tsx";
import { Route, Routes } from "react-router";
import { AppLayout } from "./app-layout.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="users/:userId" element={<UserPage />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route path="general?" element={<SettingsGeneralPage />} />
          <Route path="profile" element={<SettingsProfilePage />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
