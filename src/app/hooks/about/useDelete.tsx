import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const deleteAboutById = async (id: string): Promise<void> => {
  await axios.delete(`${apiURL}/about/${id}`)
}

export const useDeleteAbout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteAboutById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] })
    },
  })
}
