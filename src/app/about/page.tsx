'use client'

import React from 'react'
import { useAbout } from '../hooks/about/useAbout'

export default function About() {
  const { data } = useAbout()
  return (
    <div className="h-full w-full p-5 mt-10">
      <div className="">
        <h1 className="text-[#f04c1c] font-bold text-[96px]">ABOUT</h1>
        <div className="bg-black w-full h-[40vh] my-7"></div>
      </div>
      <p className="text-[#f04c1c]">{data?.text}</p>
    </div>
  )
}
