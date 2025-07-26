import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/shared/auth/auth-provider";
import { AppSidebar } from "@/app/app-sidebar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <>
      <SidebarProvider>
        <AuthProvider>
          <AppSidebar />
          <Outlet />
        </AuthProvider>
      </SidebarProvider>
    </>
  );
}
