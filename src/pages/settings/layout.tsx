import { withAuthGuard } from "@/shared/auth/with-auth-guard";
import { NavLink, Outlet } from "react-router";

export const SettingsLayout = withAuthGuard(() => {
  return (
    <div className="w-full max-w-sm">
      <header>
        <nav>
          <NavLink
            className="border-transparent border-y-2 [&.active]:border-b-primary px-2"
            to="/settings/general"
          >
            일반
          </NavLink>
          <NavLink
            className="border-transparent border-y-2 [&.active]:border-b-primary px-2"
            to="/settings/profile"
          >
            프로필
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
});
