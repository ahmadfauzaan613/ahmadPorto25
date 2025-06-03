import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const getAboutDB = await prisma.about.findFirst()
    return NextResponse.json(getAboutDB, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { text } = body
  try {
    const newData = await prisma.about.create({
      data: { text },
    })
    return NextResponse.json(newData, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
