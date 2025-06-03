import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { JSX } from 'react'

export interface SidebarProps {
  title: string
  url: string
  icon: JSX.Element
}

export const LinkSidebar: SidebarProps[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: <Home />,
  },
  {
    title: 'About',
    url: '/admin/dashboard/about',
    icon: <Inbox />,
  },
  {
    title: 'Experience',
    url: '/admin/dashboard/experience',
    icon: <Calendar />,
  },
  {
    title: 'Portofolio',
    url: '/admin/dashboard/portofolio',
    icon: <Search />,
  },
  {
    title: 'Certificate',
    url: '/admin/dashboard/certificate',
    icon: <Settings />,
  },
]
