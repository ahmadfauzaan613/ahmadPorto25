import type { Metadata } from 'next'
import './globals.css'
import AdminLayout from '@/components/AdminLayout'
import { Archivo_Black, Lato } from 'next/font/google'

const ArchivoFont = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400'],
  display: 'swap',
})

const LatoFont = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ahmad Fauzan',
  description: 'Ahmad Fauzan’s portfolio — a frontend developer focused on building modern and responsive user interfaces.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${ArchivoFont.variable} ${LatoFont.variable} antialiased`}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  )
}
