import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { writeFile, unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const formData = await req.formData()
  const jsonString = formData.get('json')?.toString() ?? ''
  const image = formData.get('image') as File | null

  try {
    const existing = await prisma.certificate.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
    }

    let imageUrl = existing.image

    if (image) {
      // Hapus image lama
      if (existing.image) {
        const oldPath = path.join(process.cwd(), 'public', existing.image)
        await unlink(oldPath).catch(() => {}) // Abaikan error jika file tidak ditemukan
      }

      // Simpan image baru
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        name: parsed.name,
        description: parsed.description,
        image: imageUrl,
      },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err) {
    console.error('[CERTIFICATE PUT ERROR]', err)
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 })
  }
}

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.certificate.findUnique({
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
    const deleted = await prisma.certificate.delete({ where: { id } })
    return NextResponse.json(deleted, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal Menghapus data' }, { status: 500 })
  }
}
