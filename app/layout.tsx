import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/redux/provider"
import { Inter } from "next/font/google"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Toaster } from "react-hot-toast"
import './globals.css'


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Modern Dashboard",
  description: "A modern dashboard with weather, crypto, and news data"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} sm:p-4`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full relative">
                  <DashboardSidebar />
                <div className="flex flex-col relative flex-1">
                  <DashboardHeader />
                  <main className="flex-1">{children}</main>
                </div>
              </div>
            </SidebarProvider>
            <Toaster/>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

