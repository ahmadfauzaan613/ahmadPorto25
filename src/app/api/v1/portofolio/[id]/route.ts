import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { IlogoType } from '@/types/Portofolio'
import { writeFile, unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split('/').pop())
  const formData = await req.formData()

  const jsonString = formData.get('json')?.toString() ?? ''
  const logoFiles = formData.getAll('file') as File[] // multiple logo files
  const imageFile = formData.get('image') as File | null // main image

  try {
    const existing = await prisma.portofolio.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
    }

    if (!jsonString) {
      return NextResponse.json({ error: 'Data json tidak valid' }, { status: 400 })
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
      image: string
      link: string
      logo: IlogoType[]
    }

    const { name, description, link, logo } = parsed

    let imageUrl = existing.image

    // Handle update main image
    if (imageFile) {
      if (existing.image) {
        const oldImagePath = path.join(process.cwd(), 'public', existing.image)
        await unlink(oldImagePath).catch(() => {}) // ignore error jika tidak ada
      }
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-image-${imageFile.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    // Handle update multiple logos
    const updatedLogos = await Promise.all(
      logo.map(async (item, index) => {
        let filePath = item.file // default dari JSON

        const file = logoFiles[index]
        if (file) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const fileName = `${Date.now()}-logo-${index}-${file.name.replace(/\s+/g, '-')}`
          const fullPath = path.join(process.cwd(), 'public/upload/image', fileName)
          await writeFile(fullPath, buffer)
          filePath = `/upload/image/${fileName}`
        }

        return {
          ...item,
          file: filePath,
        }
      })
    )

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
