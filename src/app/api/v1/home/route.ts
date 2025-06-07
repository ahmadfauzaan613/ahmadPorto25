import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { IDataLinkType } from '@/types/HomeType'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const getHomeDB = await prisma.home.findMany()
    return NextResponse.json(getHomeDB, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const jsonString = formData.get('json')?.toString() ?? ''
  const file = formData.get('file') as File | null

  try {
    const parsed = JSON.parse(jsonString) as {
      role: string
      dataLink: IDataLinkType[]
    }
    const { role, dataLink } = parsed

    let fileUrl: string | null = null

    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(process.cwd(), 'public/upload', fileName)

      await writeFile(filePath, buffer)
      fileUrl = `/upload/${fileName}`
    }

    const updatedLinks = dataLink.map((link: IDataLinkType) => ({
      ...link,
      file: fileUrl ?? null,
    }))

    const newData = await prisma.home.create({
      data: {
        role,
        dataLink: updatedLinks,
      },
    })

    return NextResponse.json(newData, { status: 201 })
  } catch (err) {
    console.error('[UPLOAD ERROR]', err)
    return NextResponse.json({ error: 'Upload gagal' }, { status: 500 })
  }
}
