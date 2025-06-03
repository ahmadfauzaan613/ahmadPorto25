import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  const body = await req.json()
  const { company, role, description, startDate, endDate, location } = body
  const parsedStartDate = new Date(startDate)
  const parsedEndDate = new Date(endDate)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const updateData = await prisma.experience.update({
      where: { id },
      data: {
        company,
        role,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location,
      },
    })
    return NextResponse.json(updateData, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const deleted = await prisma.experience.delete({ where: { id } })
    return NextResponse.json(deleted, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal Menghapus data' }, { status: 500 })
  }
}

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.experience.findUnique({
      where: { id },
    })
    return NextResponse.json(getAboutDBDetail, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}
