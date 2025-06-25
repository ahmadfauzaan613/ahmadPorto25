import { PrismaClient } from '@/generated/prisma'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getData = await prisma.portofolio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
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
  try {
    const formData = await req.formData()

    const jsonString = formData.get('data')?.toString() ?? '{}'
    const parsed = JSON.parse(jsonString)

    const { name, description, link } = parsed
    const imageFile = formData.get('image') as File | null
    const logoFiles = formData.getAll('logo') as File[]

    // Upload image utama
    let imageUrl = ''
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = imageFile.name.replace(/\s+/g, '-')
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    // Upload semua logo
    const updatedLogos = await Promise.all(
      logoFiles.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const fileName = file.name.replace(/\s+/g, '-')
        const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
        await writeFile(filePath, buffer)
        return {
          file: `/upload/image/${fileName}`,
        }
      })
    )

    // Simpan ke DB
    const finalData = {
      name,
      description,
      link,
      image: imageUrl,
      logo: updatedLogos,
    }

    const result = await prisma.portofolio.create({ data: finalData })

    return NextResponse.json({
      success: true,
      message: 'Portofolio created successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Server error occurred',
        error: {
          code: 'INTERNAL_ERROR',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
