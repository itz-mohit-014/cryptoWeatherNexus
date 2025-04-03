"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Cloud,
  Heart,
  HomeIcon,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Weather",
      icon: Cloud,
      href: "/weather",
    },
    {
      title: "Crypto",
      icon: CircleDollarSign,
      href: "/crypto",
    },
    {
      title: "My Favorites",
      icon: Heart,
      href: "/my-favorites",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <div
          className={state === "expanded" ? "flex items-center gap-2 px-2" : ""}
        >
          <div className="flex h-8 w-8 items-center shrink-0   justify-center rounded-lg bg-primary text-primary-foreground">
            <HomeIcon className="h-4 w-4" />
          </div>
          {state === "expanded" && (
            <div
              className={`font-semibold overflow-hidden transition-all duration-300 delay-300 text-nowrap ${
                state === "expanded"
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }`}
            >
              {" "}
              Crypto Nexus
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={state === "expanded" ? "px-2 mt-3" : "" }>
        <SidebarMenu className="space-y-2">
          {routes.map((route) => (
            <SidebarMenuItem key={route.href} className="px-2">
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.title}
                className={cn( pathname === route.href || ( route.href !== "/" && pathname.includes(route.href)) ? "bg-secondary" : "bg-transparent" , "hover:bg-secondary cursor-pointer py-2 rounded-lg")}
              >
                <Link
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href || ( route.href !== "/" && pathname.includes(route.href))
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  href={route.href}
                >
                  <route.icon className="h-5 w-5 mr-2 inline-block" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
