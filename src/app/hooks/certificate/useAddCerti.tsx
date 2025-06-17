import { ICreateCertificateType } from '@/types/CertificateType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const createCerti = async (payload: ICreateCertificateType, image: File): Promise<ICreateCertificateType> => {
  const formData = new FormData()
  formData.append('json', JSON.stringify(payload))

  if (image) {
    formData.append('image', image)
  }

  const response = await axios.post<ICreateCertificateType>(`${apiURL}/certificate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const useCreateCerti = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload, image }: { payload: ICreateCertificateType; image: File }) => createCerti(payload, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Certificate'] })
    },
  })
}
