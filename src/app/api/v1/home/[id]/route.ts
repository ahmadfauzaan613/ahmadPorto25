import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.home.findUnique({
      where: { id },
    })
    return NextResponse.json(getAboutDBDetail, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const deleted = await prisma.home.delete({ where: { id } })
    return NextResponse.json(deleted, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal Menghapus data' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  const body = await req.json()
  const { role, dataLink } = body

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const updateData = await prisma.home.update({
      where: { id },
      data: { role, dataLink },
    })
    return NextResponse.json(updateData, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 })
  }
}
