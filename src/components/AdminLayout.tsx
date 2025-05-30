'use client'

import React from 'react'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith('/admin')
  return (
    <div>
      <Navbar />
      <div className={`${!isAdminPath && 'mx-auto container'}`}>{children}</div>
    </div>
  )
}
