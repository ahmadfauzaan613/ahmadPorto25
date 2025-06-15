export interface IAboutType {
  text: string | null
}

export interface IAboutUpdateType {
  id: string
  payload: {
    text: string
  }
}
