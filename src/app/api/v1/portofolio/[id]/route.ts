import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { writeFile, unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split('/').pop())
  const formData = await req.formData()

  const jsonString = formData.get('json')?.toString() ?? ''
  const logoFiles = formData.getAll('file') as File[]
  const imageFile = formData.get('image') as File | null

  try {
    const existing = await prisma.portofolio.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
      image: string
      link: string
      logo: { name: string; file: string }[]
    }

    const { name, description, link, logo } = parsed

    let imageUrl = existing.image

    if (imageFile && imageFile.size > 0) {
      if (existing.image) {
        const oldImagePath = path.join(process.cwd(), 'public', existing.image)
        await unlink(oldImagePath).catch(() => {})
      }
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${imageFile.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }
    let fileUploadIndex = 0
    const updatedLogos = await Promise.all(
      logo.map(async (item) => {
        if (!item.file) {
          const file = logoFiles[fileUploadIndex]
          fileUploadIndex++

          if (file && file.size > 0) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const fileName = `${file.name.replace(/\s+/g, '-')}`
            const fullPath = path.join(process.cwd(), 'public/upload/image', fileName)
            await writeFile(fullPath, buffer)
            return {
              ...item,
              file: `/upload/image/${fileName}`,
            }
          }
        }

        return item
      })
    )

    // ✅ Update ke DB
    const updatedData = await prisma.portofolio.update({
      where: { id },
      data: {
        name,
        description,
        image: imageUrl,
        link,
        logo: updatedLogos,
      },
    })

    return NextResponse.json(updatedData, { status: 200 })
  } catch (err) {
    console.error('[PORTOFOLIO PUT ERROR]', err)
    return NextResponse.json({ error: 'Gagal update data' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const deleted = await prisma.portofolio.delete({ where: { id } })
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
    const getAboutDBDetail = await prisma.portofolio.findUnique({
      where: { id },
    })
    return NextResponse.json(getAboutDBDetail, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}
