import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const fetchCertificate = async () => {
  const response = await axios.get(`${apiURL}/certificate`)
  return response.data
}

export const useCertificate = () => {
  return useQuery({
    queryKey: ['Certificate'],
    queryFn: fetchCertificate,
  })
}
