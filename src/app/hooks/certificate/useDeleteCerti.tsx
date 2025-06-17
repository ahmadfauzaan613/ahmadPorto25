import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const deleteCertiId = async (id: string): Promise<void> => {
  await axios.delete(`${apiURL}/certificate/${id}`)
}

export const useDeleteCerti = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCertiId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Certificate'] })
    },
  })
}
