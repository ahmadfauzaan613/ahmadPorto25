'use client'

import React from 'react'
import { useAbout } from '../hooks/useAbout'

export default function About() {
  const { data, isLoading } = useAbout()
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="bg-[#f04c1c] h-full w-full p-5 mt-10">
      <div className=" ">
        <h1 className="text-white font-bold text-8xl">ABOUT</h1>
        <div className="bg-white w-full h-[40vh] my-7"></div>
      </div>
      <p className="text-white">{data?.text}</p>
    </div>
  )
}
