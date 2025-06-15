import { IPortofolioType } from '@/types/Portofolio'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const fetchPorto = async (): Promise<IPortofolioType[]> => {
  const response = await axios.get(`${apiURL}/portofolio`)
  return response.data
}

export const usePorto = () => {
  return useQuery<IPortofolioType[]>({
    queryKey: ['portofolio'],
    queryFn: fetchPorto,
  })
}
