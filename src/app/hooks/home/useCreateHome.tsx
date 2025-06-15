import { IHomeType } from '@/types/HomeType'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createHome = async (payload: IHomeType): Promise<IHomeType> => {
  const response = await axios.post(`${apiURL}/home`, payload)
  return response.data
}

export const useCreateHome = () => {
  return useMutation({
    mutationFn: (payload: IHomeType) => createHome(payload),
  })
}
