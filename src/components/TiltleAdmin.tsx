import React from 'react'
import { Button } from './ui/button'

export default function TiltleAdmin({
  tilte,
  children,
  addButton,
  onClick,
}: Readonly<{
  children: React.ReactNode
  tilte: string
  addButton: boolean
  onClick: () => void
}>) {
  return (
    <div>
      {addButton ? (
        <div className="flex items-center justify-between">
          <h1 className={`text-7xl font-bold text-[#f04c1c]`}>{tilte}</h1>
          <Button className="bg-[#f04c1c] hover:bg-[#b83912]" onClick={onClick}>
            Add Data
          </Button>
        </div>
      ) : (
        <h1 className={`text-7xl font-bold text-[#f04c1c]`}>{tilte}</h1>
      )}

      {children}
    </div>
  )
}
