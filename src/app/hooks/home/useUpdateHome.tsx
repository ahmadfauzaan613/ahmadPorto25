import { IHomeType } from '@/types/HomeType'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const updateHome = async ({ id, payload }: { id: string; payload: IHomeType }): Promise<IHomeType> => {
  const response = await axios.put(`${apiURL}/home/${id}`, payload)
  return response.data
}

export const useUpdateHome = () => {
  return useMutation({
    mutationFn: updateHome,
  })
}
