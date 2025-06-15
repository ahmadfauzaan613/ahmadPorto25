import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getHomeDB = await prisma.home.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(getHomeDB, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { role, dataLink } = body
  try {
    const newData = await prisma.home.create({
      data: { role, dataLink },
    })
    return NextResponse.json(newData, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 })
  }
}
