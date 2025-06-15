import { IAboutType } from '@/types/AboutType'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const updateAbout = async ({ id, payload }: { id: string; payload: IAboutType }): Promise<IAboutType> => {
  const response = await axios.put(`${apiURL}/about/${id}`, payload)
  return response.data
}

export const useUpdateAbout = () => {
  return useMutation({
    mutationFn: updateAbout,
  })
}
