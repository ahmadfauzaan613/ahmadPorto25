import { IAboutType } from '@/types/AboutType'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createAbout = async (payload: IAboutType): Promise<IAboutType> => {
  const response = await axios.post(`${apiURL}/about`, payload)
  return response.data
}

export const useCreateAbout = () => {
  return useMutation({
    mutationFn: (payload: IAboutType) => createAbout(payload),
  })
}
