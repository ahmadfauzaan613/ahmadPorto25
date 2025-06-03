import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SidebarApp from '@/components/SidebarApp'

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <SidebarApp />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-16 w-full border-b-2 bg-[#f04c1c] px-4 flex items-center">
            <SidebarTrigger className="text-white" />
          </div>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
