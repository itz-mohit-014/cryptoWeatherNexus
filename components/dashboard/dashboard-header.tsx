"use client"

import { Bell, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "./mobile-nav"
import React, { useState } from "react"
import { NotificationPanel } from "./notification-panel"
import { SidebarTrigger } from "../ui/sidebar"


export function DashboardHeader() {
  const { setTheme , theme } = useTheme()

  console.log(theme)

  const [currentTheme, setCurrentTheme] = useState(theme);

  const [showNotificaion, setShowNotification] = useState<boolean>(false)

  const changeTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark" );
    
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  }


  return (
    <>
    
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 pb-4 gap-1 items-center">

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden px-2 py-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <SidebarTrigger className="max-md:hidden"/>

        <Link href="/" className="mr-4 flex items-center space-x-2">
          <span className="font-bold  text-lg sm:text-xl">CryptoNexus</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button onClick={() => setShowNotification((prev) => !prev)} variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
              <span className="sr-only">Notifications</span>
            </Button>

                <Button onClick={changeTheme} variant="ghost" size="icon" className="p-1">
                  {
                    currentTheme === "light" 
                    ? <Sun className="h-5 w-5" />
                    : <Moon className="h-5 w-5" />
                  }

                  <span className="sr-only">Toggle theme</span>
                </Button>
          </nav>
        </div>
      </div>
    </header>
    { showNotificaion && <NotificationPanel onClose={() => setShowNotification(!showNotificaion)}/> }

    </>
  )
}

