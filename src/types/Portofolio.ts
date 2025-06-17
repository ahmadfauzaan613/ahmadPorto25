export interface IPortofolioType {
  id: number
  name: string
  description: string
  image: string
  link: string
  logo: IlogoType
  createdAt: string
  updatedAt: string
}

export interface IlogoType {
  id: number
  file: string
  name: string
}

export interface IPortoCreate {
  name: string
  description: string
  image: string
  link: string
  logo: IlogoCreate[]
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
