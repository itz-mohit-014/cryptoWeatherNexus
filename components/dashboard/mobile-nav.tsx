"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Cloud,
  LayoutDashboard,
  HomeIcon,
} from "lucide-react";
import { Button } from "../ui/button";

export function MobileNav() {
  const pathname = usePathname();

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
  ];

  return (
    <div className="flex flex-col space-y-3 p-2">
      <Link href="/" className="flex items-center space-x-2 my-4 px-2">
          <div className="flex h-8 w-8 items-center shrink-0   justify-center rounded-lg bg-primary text-primary-foreground">
            <HomeIcon className="h-4 w-4" />
          </div>
        <span className="font-bold text-xl">Crypto Nexus</span>
      </Link>
      <div className="flex flex-col space-y-2 pr-2 mt-3">
        {routes.map((route) => (
          <Link
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary hover:bg-secondary cursor-pointer py-2 rounded-lg px-2.5",
              pathname === route.href ? "text-primary bg-secondary" : "text-muted-foreground bg-transparent"
            )}
            href={route.href}
            >
            <route.icon className="h-5 w-5 mr-2 inline-block" />
            <span>{route.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
