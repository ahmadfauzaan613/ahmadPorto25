export interface ICertificateType {
  id: number
  name: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}
export interface ICreateCertificateType {
  name: string
  description: string
}
export interface IUpdateCertificateType {
  id: number
  name: string
  description: string
}
