import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const fetchHome = async () => {
  const response = await axios.get(`${apiURL}/home`)
  return response.data
}

export const useHome = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHome,
  })
}
