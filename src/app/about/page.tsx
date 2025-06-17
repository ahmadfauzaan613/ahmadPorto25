'use client'

import React from 'react'
import { useAbout } from '../hooks/about/useAbout'
import Image from 'next/image'
import { result } from 'lodash'

export default function About() {
  const { data, isLoading } = useAbout()
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }
  return (
    <div className="h-full w-full p-5 mt-10">
      <div className="">
        <h1 className="text-[#f04c1c] font-bold text-[96px]">ABOUT</h1>
        <div className="bg-black w-full h-[40vh] my-7 relative">
          <Image src="/images/IMG_3070.JPG" alt="Gambar dari Pinterest" fill className="object-cover object-top" />
        </div>
      </div>
      <p className="text-[#f04c1c]">{result(data, 'data.text', '')}</p>
    </div>
  )
}
