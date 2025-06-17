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
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Invalid ID',
          data: null,
        },
        { status: 400 }
      )
    }

    const parsed = JSON.parse(jsonString) as Partial<{
      name: string
      description: string
    }>

    let imageUrl = existing.image

    // ✅ Jika ada image baru, upload
    if (image && image.size > 0) {
      if (existing.image) {
        const oldPath = path.join(process.cwd(), 'public', existing.image)
        await unlink(oldPath).catch(() => {})
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${image.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        name: parsed.name ?? existing.name,
        description: parsed.description ?? existing.description,
        image: imageUrl,
      },
    })

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Data successfully updated',
        data: updated,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[CERTIFICATE PUT ERROR]', err)
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

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ success: false, status: 400, message: 'Invalid ID', data: null }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.certificate.findUnique({
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
    await prisma.certificate.delete({ where: { id } })
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
