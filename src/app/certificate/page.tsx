import CertiCard from '@/components/certificate/CertiCard'
import React from 'react'

export default function Certificate() {
  return (
    <div>
      <div className="mt-10 bg-[#f04c1c] px-7">
        <h1 className="text-9xl pb-5 text-white font-bold">CERTIFICATE</h1>
      </div>
      <div className="grid grid-cols-2 my-5 gap-1">
        <CertiCard />
      </div>
    </div>
  )
}
