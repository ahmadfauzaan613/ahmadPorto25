import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import React from 'react'

export default function Portofolio() {
  return (
    <AdminLayout>
      <div className="my-3">
        <div className="bg-[#f04c1c] my-10">
          <p className="text-white font-bold text-[96px] p-5">PORTOFOLIO</p>
          <div className="bg-black w-full h-[40vh]"></div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="border border-[#f04c1c]">
            <div className="bg-[#f04c1c] w-full h-[25vh]"></div>
            <div className=" px-4">
              <p className="text-4xl font-bold text-[#f04c1c]">xxx</p>
              <p className="text-sm pt-3 text-[#f04c1c]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quaerat et a neque. Aspernatur hic aliquam illum molestiae veniam illo aperiam magni ullam, qui quibusdam vero perspiciatis dolores saepe eaque!</p>
            </div>
            <div className="flex items-end justify-between px-4 py-4">
              <div className=" flex items-center gap-3">
                <div className="bg-[#f04c1c] w-10 h-10"></div>
                <div className="bg-[#f04c1c] w-10 h-10"></div>
                <div className="bg-[#f04c1c] w-10 h-10"></div>
              </div>
              <Link href={''} className="text-[#f04c1c] hover:font-bold">
                Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
