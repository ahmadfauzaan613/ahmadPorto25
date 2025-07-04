import { IPortoCreate } from '@/types/Portofolio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createPorto = async (payload: IPortoCreate, image: File | null, logo: File[]): Promise<IPortoCreate> => {
  const formData = new FormData()

  formData.append('data', JSON.stringify(payload))

  if (image) {
    formData.append('image', image)
  }

  logo.forEach((file) => {
    formData.append('logo', file)
  })

  const response = await axios.post<IPortoCreate>(`${apiURL}/portofolio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const useCreatePorto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload, image, logo }: { payload: IPortoCreate; image: File | null; logo: File[] }) => createPorto(payload, image, logo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portofolio'] })
    },
  })
}
