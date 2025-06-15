export interface IExperienceType {
  id: number
  company: string
  role: string
  description: string
  startDate: string
  endDate: string
  location: string
  createdAt: string
  updatedAt: string
}

export interface IExperienceCreateType {
  company: string
  role: string
  description: string
  startDate: string
  endDate: string
  location: string
}

export interface IExperienceUpdateType {
  id: number | null
  company: string
  role: string
  description: string
  startDate: string
  endDate: string
  location: string
}
