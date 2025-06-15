export interface IInput {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  disabled: boolean
  placeholder: string
}
