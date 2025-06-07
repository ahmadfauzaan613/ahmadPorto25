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
