import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isProtectedPath = req.nextUrl.pathname.startsWith('/admin/dashboard')

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}
