import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const deleteHomeById = async (id: string): Promise<void> => {
  await axios.delete(`${apiURL}/home/${id}`)
}

export const useDeleteHome = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteHomeById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
  })
}
