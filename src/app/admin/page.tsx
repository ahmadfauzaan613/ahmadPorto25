'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })

    if (res?.ok) {
      router.push('/admin/dashboard')
    } else {
      alert('Username atau password salah')
    }
  }

  return (
    <div className="bg-[#f04c1c]">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-[90vw] sm:w-[60vw] md:w-[35vw] lg:w-[25vw] p-5 rounded-lg shadow">
          <p className="text-4xl text-center font-bold text-[#f04c1c]">LOGIN</p>
          <div>
            <div className="grid w-full items-center gap-1.5 my-5">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button variant={'outline'} onClick={handleLogin} className="mt-5 w-full border border-[#f04c1c] text-[#f04c1c] hover:text-white hover:bg-[#f04c1c]">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
