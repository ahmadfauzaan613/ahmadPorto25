import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const fetchAbout = async () => {
  const response = await axios.get(`${apiURL}/about`)
  return response.data
}

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
  })
}
