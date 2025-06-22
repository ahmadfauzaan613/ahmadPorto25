export interface IPortofolioType {
  id: number
  name: string
  description: string
  image: string
  link: string
  logo: string
  createdAt: string
  updatedAt: string
}

export interface IlogoType {
  id: number
  file: string
  name: string
}

export interface IPortoCreate {
  id: number | null
  name: string
  description: string
  image: File | null
  link: string
  logo: (File | { file: string })[]
}

export interface IPortoUpdate {
  id: number | null
  name: string
  description: string
  image: string | File | null
  link: string
  logo: (File | { file: string })[]
}

export interface IlogoCreate {
  file: string
  name: string
}

export interface IPortofolioResponse {
  id: number
  name: string
  description: string
  image: string
  link: string
  logo: {
    name: string
    file: string
  }[]
  createdAt: string
}
