import { IPortoCreate, IPortofolioResponse } from '@/types/Portofolio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createPorto = async (payload: IPortoCreate, image: File | null, files: File[]): Promise<IPortofolioResponse> => {
  const formData = new FormData()
  formData.append('json', JSON.stringify(payload))

  if (image) {
    formData.append('image', image)
  }

  files.forEach((file) => {
    formData.append('file', file)
  })

  const response = await axios.post<IPortofolioResponse>(`${apiURL}/portofolio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const useCreatePorto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload, image, files }: { payload: IPortoCreate; image: File | null; files: File[] }) => createPorto(payload, image, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portofolio'] })
    },
  })
}
