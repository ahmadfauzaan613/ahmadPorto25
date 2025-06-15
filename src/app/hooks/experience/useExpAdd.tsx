import { IExperienceCreateType } from '@/types/ExperienceType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createExp = async (payload: IExperienceCreateType): Promise<IExperienceCreateType> => {
  const response = await axios.post(`${apiURL}/experience`, payload)
  return response.data
}

export const useCreateExp = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IExperienceCreateType) => createExp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}
