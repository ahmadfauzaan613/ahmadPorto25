import CardPorto from '@/components/portofolio/CardPorto'
import Image from 'next/image'
import React from 'react'

export default function Portofolio() {
  return (
    <div className="my-3">
      <div className="bg-[#f04c1c] my-10">
        <h1 className="text-white font-bold text-[96px] p-5">PORTOFOLIO</h1>
        <div className="bg-black w-full h-[40vh] relative">
          <Image src="/images/Bersoreria12828-BW.jpg" alt="Gambar dari Pinterest" fill className="object-cover" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        <CardPorto />
      </div>
    </div>
  )
}
