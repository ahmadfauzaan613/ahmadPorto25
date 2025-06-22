import { PrismaClient } from '@/generated/prisma'
import { ParamType } from '@/types/ParamType'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { writeFile, unlink } from 'fs/promises'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  const formData = await req.formData()
  const jsonString = formData.get('data')?.toString() ?? ''
  const logoFiles = formData.getAll('logo') as File[]
  const imageFile = formData.get('image') as File | null

  if (isNaN(id)) {
    return NextResponse.json({ success: false, status: 400, message: 'Invalid ID', data: null }, { status: 400 })
  }

  try {
    if (!jsonString) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON data',
          error: {
            code: 'BAD_REQUEST',
            details: 'Format data tidak sesuai dengan skema yang diharapkan',
          },
        },
        { status: 400 }
      )
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
      image: string
      link: string
      logo: { file: string }[]
    }

    const { name, description, link, logo } = parsed

    const existing = await prisma.portofolio.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data tidak ditemukan',
          error: {
            code: 'NOT_FOUND',
          },
        },
        { status: 404 }
      )
    }

    let imageUrl = existing.image

    if (imageFile && imageFile.size > 0) {
      if (existing.image) {
        const oldImagePath = path.join(process.cwd(), 'public', existing.image)
        await unlink(oldImagePath).catch(() => {})
      }

      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = imageFile.name.replace(/\s+/g, '-')
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    // Update logo files
    let fileUploadIndex = 0
    const updatedLogos = await Promise.all(
      logo.map(async (item) => {
        let filePath = item.file || ''
        const file = logoFiles[fileUploadIndex]

        const isNewUpload = file && (!item.file.startsWith('/upload/') || item.file === 'new' || item.file === '')

        if (isNewUpload) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const fileName = file.name.replace(/\s+/g, '-')
          const fullPath = path.join(process.cwd(), 'public/upload/image', fileName)
          await writeFile(fullPath, buffer)
          filePath = `/upload/image/${fileName}`
          fileUploadIndex++
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

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Successfully updated data',
        data: updatedData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred',
        error: {
          code: 'INTERNAL_ERROR',
          details: (error as Error).message,
        },
      },
      { status: 500 }
    )
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
