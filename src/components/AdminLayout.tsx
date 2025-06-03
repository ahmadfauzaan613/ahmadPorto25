'use client'

import React, { useState } from 'react'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith('/admin')
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div className={`${!isAdminPath && 'mx-auto container'}`}>{children}</div>
      </div>
    </QueryClientProvider>
  )
}
