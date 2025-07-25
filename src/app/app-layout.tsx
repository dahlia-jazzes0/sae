import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/shared/auth/auth-provider";
import { MainSidebar } from "@/shared/sidebar/ui/main-sidebar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <>
      <SidebarProvider>
        <AuthProvider>
          <MainSidebar />
          <Outlet />
        </AuthProvider>
      </SidebarProvider>
    </>
  );
}
