import { File, FileUser, Linkedin, Mail, Phone } from 'lucide-react'
import { JSX } from 'react'

export interface HomeProps {
  icon: JSX.Element
  desc: string
}

export const ButtonDownload: HomeProps[] = [
  { icon: <Linkedin color="#f04c1c" />, desc: 'Linkedin' },
  { icon: <Phone color="#f04c1c" />, desc: 'Whatsapp' },
  { icon: <Mail color="#f04c1c" />, desc: 'Email' },
  { icon: <FileUser color="#f04c1c" />, desc: 'Resume' },
  { icon: <File color="#f04c1c" />, desc: 'Portofolio' },
]
