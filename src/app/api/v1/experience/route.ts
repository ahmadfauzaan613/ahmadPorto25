import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getData = await prisma.experience.findMany()
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully get data',
        data: getData,
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
  const { company, role, description, startDate, endDate, location } = body
  const parsedStartDate = new Date(startDate)
  const parsedEndDate = new Date(endDate)
  try {
    const newData = await prisma.experience.create({
      data: {
        company,
        role,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location,
      },
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
