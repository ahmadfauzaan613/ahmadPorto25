import AdminLayout from '@/components/AdminLayout'
import React from 'react'

export default function Experience() {
  return (
    <AdminLayout>
      <div className="mt-10">
        <p className="text-9xl font-bold text-[#f04c1c]">EXPERIENCE</p>
        <div className="mt-10 grid grid-cols-2 gap-5">
          <div className="grid grid-cols-2 border-2 border-[#f04c1c]">
            <div className="bg-[#f04c1c] col-span-1 w-full h-full"></div>
            <p className="p-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorum, dolor voluptatem sequi voluptates quidem ipsam totam adipisci esse consectetur consequuntur aliquid, facilis beatae quis ex quasi temporibus aut culpa.</p>
          </div>
          <div className="grid grid-cols-2 border-2 border-[#f04c1c]">
            <div className="bg-[#f04c1c] col-span-1 w-full h-full"></div>
            <p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorum, dolor voluptatem sequi voluptates quidem ipsam totam adipisci esse consectetur consequuntur aliquid, facilis beatae quis ex quasi temporibus aut culpa.</p>
          </div>
          <div className="grid grid-cols-2 border-2 border-[#f04c1c]">
            <div className="bg-[#f04c1c] col-span-1 w-full h-full"></div>
            <p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorum, dolor voluptatem sequi voluptates quidem ipsam totam adipisci esse consectetur consequuntur aliquid, facilis beatae quis ex quasi temporibus aut culpa.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
