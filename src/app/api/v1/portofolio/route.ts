import { PrismaClient } from '@/generated/prisma'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getData = await prisma.portofolio.findMany()
    return NextResponse.json(getData, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi Kesalahan' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const jsonString = formData.get('json')?.toString() ?? ''
  const logoFiles = formData.getAll('file') as File[]
  const imageFile = formData.get('image') as File | null

  try {
    if (!jsonString) {
      return NextResponse.json({ error: 'Data json tidak valid' }, { status: 400 })
    }

    const parsed = JSON.parse(jsonString) as {
      name: string
      description: string
      image: string
      link: string
      logo: { name: string; file: string }[]
    }

    const { name, description, link, logo } = parsed

    let imageUrl = ''

    // Simpan gambar utama (jika ada)
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${imageFile.name.replace(/\s+/g, '-')}`
      const filePath = path.join(process.cwd(), 'public/upload/image', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/upload/image/${fileName}`
    }

    // Bulk simpan logo, map setiap logo sesuai index dengan file
    const updatedLogos = await Promise.all(
      logo.map(async (item, index) => {
        let filePath = item.file || ''
        const file = logoFiles[index]
        if (file) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const fileName = `${file.name.replace(/\s+/g, '-')}`
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

    // Simpan data baru ke DB
    const newData = await prisma.portofolio.create({
      data: {
        name,
        description,
        image: imageUrl,
        link,
        logo: updatedLogos,
      },
    })

    return NextResponse.json(newData, { status: 201 })
  } catch (err) {
    console.error('[PORTOFOLIO POST ERROR]', err)
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 })
  }
}
