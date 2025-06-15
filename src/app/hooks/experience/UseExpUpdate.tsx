import { IExperienceUpdateType } from '@/types/ExperienceType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const updateExp = async (payload: IExperienceUpdateType): Promise<IExperienceUpdateType> => {
  const { id, ...data } = payload
  const response = await axios.put(`${apiURL}/experience/${id}`, data)
  return response.data
}

export const useUpdateExp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateExp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}
