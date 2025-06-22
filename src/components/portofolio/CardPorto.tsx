'use client'
import { usePorto } from '@/app/hooks/portofolio/usePorto'
import { IPortofolioType } from '@/types/Portofolio'
import { result } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardPorto() {
  const { data, isLoading } = usePorto()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }
  return result(data, 'data', []).map((Item: IPortofolioType, idx: number) => (
    <div className="border border-[#f04c1c]" key={idx}>
      <div className="bg-[#f04c1c] w-full h-[25vh]">
        <Image src={Item.image} alt={`logo-${idx}`} className="w-full h-full object-cover rounded" width={500} height={300} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className=" px-4">
        <p className="text-4xl font-bold text-[#f04c1c]">{Item.name}</p>
        <p className="text-sm pt-3 text-[#f04c1c]">{Item.description}</p>
      </div>
      <div className="flex items-end justify-between px-4 py-4">
        <div className=" flex items-center gap-3">
          {result(Item, 'logo', []).map((item, idx) => (
            <div className="bg-[#f04c1c] w-10 h-10" key={idx}>
              <Image src={result(item, 'file', '')} alt={`logo-${idx}`} width={500} height={500} className="w-full h-full object-cover rounded" />
            </div>
          ))}
        </div>
        <Link href={Item.link} target="_blank" className="text-[#f04c1c] hover:font-bold">
          Visit
        </Link>
      </div>
    </div>
  ))
}
