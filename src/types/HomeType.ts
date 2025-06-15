export interface IHomeUpdateType {
  id: string
  payload: {
    role: string
    dataLink: IDataLinkType[]
  }
}

export interface IHomeType {
  role: string
  dataLink: IDataLinkType[]
}

export interface IDataLinkType {
  type: string
  url: string
}

export interface ButtonFunctionProps {
  data: string
}
