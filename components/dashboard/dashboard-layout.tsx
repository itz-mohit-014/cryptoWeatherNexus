import type React from "react"
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <main className="container py-6 space-y-6">{children}</main>
}

