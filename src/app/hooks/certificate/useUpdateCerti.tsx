import { ICreateCertificateType } from '@/types/CertificateType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL

const updateCerti = async (id: number, payload: ICreateCertificateType, image?: File | null): Promise<ICreateCertificateType> => {
  const formData = new FormData()
  formData.append('json', JSON.stringify(payload))

  if (image) {
    formData.append('image', image)
  }

  const response = await axios.put<ICreateCertificateType>(`${apiURL}/certificate/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const useUpdateCerti = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload, image }: { id: number; payload: ICreateCertificateType; image?: File | null }) => updateCerti(id, payload, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Certificate'] })
    },
  })
}
