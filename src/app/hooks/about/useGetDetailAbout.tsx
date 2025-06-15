import { IAboutType } from '@/types/AboutType'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const getAboutById = async (id: string): Promise<IAboutType> => {
  const response = await axios.get(`${apiURL}/about/${id}`)
  return response.data
}

export const useAboutById = (id: string) => {
  return useQuery({
    queryKey: ['about', id],
    queryFn: () => getAboutById(id),
    enabled: !!id, // hanya jalan kalau id ada
  })
}
