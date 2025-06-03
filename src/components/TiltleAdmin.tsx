import React from 'react'

export default function TiltleAdmin({
  tilte,
  children,
}: Readonly<{
  children: React.ReactNode
  tilte: string
}>) {
  return (
    <div>
      <p className="text-7xl font-bold text-[#f04c1c]">{tilte}</p>
      {children}
    </div>
  )
}
