export interface IHomeType {
  id: number
  role: string
  dataLink: IDataLinkType
}

export interface IDataLinkType {
  id: number
  type: string
  url: string
  file: string
}
