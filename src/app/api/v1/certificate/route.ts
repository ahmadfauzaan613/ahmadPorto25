import { PrismaClient } from '@/generated/prisma'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getData = await prisma.certificate.findMany()
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
  const formData = await req.formData()
  const jsonString = formData.get('json')?.toString() ?? ''
  const image = formData.get('image') as File | null

  try {
    if (!jsonString) {
      return NextResponse.json({ error: 'Data json tidak valid' }, { status: 400 })
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
    }

    let imageUrl = ''

    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${image.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)

      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    } else {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Image file is required.',
        },
        { status: 400 }
      )
    }

    const newData = await prisma.certificate.create({
      data: {
        name: parsed.name,
        description: parsed.description,
        image: imageUrl,
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
  } catch (err) {
    console.error('[CERTIFICATE POST ERROR]', err)
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
