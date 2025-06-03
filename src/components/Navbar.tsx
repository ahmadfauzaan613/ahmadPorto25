'use client'

import { DataNav } from '@/types/NavbarType'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith('/admin')

  return (
    <div className={`${isAdminPath && 'hidden'} border-[#f04c1c] border-b-2 py-3 px-4`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <p className="font-thin text-xl text-[#f04c1c]">Ahmad Fauzan</p>
          </Link>
          <div className="flex items-center gap-5">
            {DataNav.map((item, idx) => (
              <Link key={idx} href={item.url} className="font-thin text-[#f04c1c] text-sm">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
