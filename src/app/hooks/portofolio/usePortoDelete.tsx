import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const deletePortoId = async (id: string): Promise<void> => {
  await axios.delete(`${apiURL}/portofolio/${id}`)
}

export const useDeletePorto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePortoId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portofolio'] })
    },
  })
}
