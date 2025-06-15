import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const deleteExpById = async (id: string): Promise<void> => {
  await axios.delete(`${apiURL}/experience/${id}`)
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteExpById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}
