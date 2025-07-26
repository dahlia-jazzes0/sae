import { LogoView } from "@/shared/logo/ui";
import { Link, Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="flex flex-col max-w-sm w-full">
        <h1 className="flex justify-center">
          <Link to="/">
            <LogoView />
          </Link>
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
