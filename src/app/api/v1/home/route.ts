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
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully get data',
        data: getHomeDB,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred',
        data: null,
        status: 500,
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { role, dataLink } = body
  try {
    const newData = await prisma.home.create({
      data: { role, dataLink },
    })
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully create data',
        data: newData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred',
        data: null,
        status: 500,
      },
      { status: 500 }
    )
  }
}
