import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="bg-[#f04c1c]">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-[25vw] p-5">
          <p className="text-4xl text-center font-bold text-[#f04c1c]">LOGIN</p>
          <div>
            <div className="grid w-full items-center gap-1.5 my-5">
              <Label htmlFor="text">Username</Label>
              <Input type="text" id="text" placeholder="Username" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="password" />
            </div>
          </div>
          <Button variant={'outline'} className="mt-5 w-full border border-[#f04c1c] text-[#f04c1c] hover:text-white hover:bg-[#f04c1c]">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
