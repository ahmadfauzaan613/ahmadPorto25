import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const getAboutDB = await prisma.about.findFirst()
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully get data',
        data: getAboutDB,
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
  const { text } = body
  try {
    const newData = await prisma.about.create({
      data: { text },
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
