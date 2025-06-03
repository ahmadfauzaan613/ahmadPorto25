import { IExperienceType } from '@/types/ExperienceType'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const fetchExperience = async (): Promise<IExperienceType[]> => {
  const response = await axios.get(`${apiURL}/experience`)
  return response.data
}

export const useExperience = () => {
  return useQuery<IExperienceType[]>({
    queryKey: ['experience'],
    queryFn: fetchExperience,
  })
}
