import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ success: false, status: 400, message: 'Invalid ID', data: null }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.home.findUnique({
      where: { id },
    })
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully get data',
        data: getAboutDBDetail,
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

export async function DELETE(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ success: false, status: 400, message: 'Invalid ID', data: null }, { status: 400 })
  }
  try {
    await prisma.home.delete({ where: { id } })
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Data successfully deleted',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: 'A server error occurred',
      },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  const body = await req.json()
  const { role, dataLink } = body

  if (isNaN(id)) {
    return NextResponse.json({ success: false, status: 400, message: 'Invalid ID', data: null }, { status: 400 })
  }
  try {
    const updateData = await prisma.home.update({
      where: { id },
      data: { role, dataLink },
    })
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Data successfully updated',
        data: updateData,
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
