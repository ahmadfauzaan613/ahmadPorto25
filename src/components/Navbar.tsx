'use client'

import { DataNav } from '@/types/NavbarType'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith('/admin')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`${isAdminPath && 'hidden'} relative border-[#f04c1c] border-b-2 py-3 px-4 z-50`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <p className="text-2xl text-[#f04c1c]">Ahmad Fauzan</p>
          </Link>

          {/* Hamburger icon for mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-[#f04c1c] focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation - Desktop */}
          <div className="hidden sm:flex flex-wrap gap-3">
            {DataNav.map((item, idx) => {
              const isActive = pathname === item.url
              return (
                <Link key={idx} href={item.url} className={`min-w-[96px] max-w-[128px] text-center text-sm sm:text-base px-3 py-1  transition-colors duration-200 ${isActive ? 'font-bold text-white bg-[#f04c1c]' : 'text-[#f04c1c] hover:bg-[#f04c1c] hover:text-white'}`}>
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile dropdown menu - absolute with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="absolute left-0 right-0 bg-white shadow-lg rounded-b-md flex flex-col sm:hidden mt-2 px-4 py-3 z-40">
              {DataNav.map((item, idx) => {
                const isActive = pathname === item.url
                return (
                  <Link
                    key={idx}
                    href={item.url}
                    className={`block text-center text-sm px-3 py-2  transition-colors duration-200 ${isActive ? 'font-bold text-white bg-[#f04c1c]' : 'text-[#f04c1c] hover:bg-[#f04c1c] hover:text-white'}`}
                    onClick={() => setIsOpen(false)} // close after click
                  >
                    {item.name}
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
