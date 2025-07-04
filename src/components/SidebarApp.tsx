'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { LinkSidebar } from '@/types/Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function SidebarApp() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/admin')
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-[#f04c1c] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-xl">Admin</SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {LinkSidebar.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex-grow" />
        <div className="p-4 border-t border-white/20">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <p onClick={handleLogout} className="flex items-center gap-2 text-white">
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
