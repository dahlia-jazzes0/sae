import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "@/shared/auth/auth";
import { useAuth } from "@/shared/auth/use-auth";
import { LogoView } from "@/shared/logo/ui";
import { UserAvatar } from "@/shared/user-avatar/ui/user-avatar";
import { HomeIcon, SettingsIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

export function AppSidebar() {
  const auth = useAuth();

  const menus = [
    { label: "홈", to: "/", icon: HomeIcon },
    { label: "설정", to: "/settings", icon: SettingsIcon },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/">
          <LogoView size={32} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menus.map((menu) => (
          <SidebarMenuItem key={menu.to}>
            <SidebarMenuButton asChild>
              <NavLink
                to={menu.to}
                className="border-l-4 border-transparent [&.active]:border-primary [&.active]:font-bold rounded-none transition-colors"
              >
                <menu.icon />
                <span>{menu.label}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <UserAvatar src={auth?.photoURL} />
            <div className="font-bold">{auth?.displayName}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to={`/users/${auth?.uid}`}>계정</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                로그아웃
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
