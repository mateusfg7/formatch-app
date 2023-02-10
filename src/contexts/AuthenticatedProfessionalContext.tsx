import { ReactNode, createContext, useState } from 'react'
import { api } from '../services/api'
import { feedbackToast } from '../utils/feedbackToast'
import { AxiosError } from 'axios'

export interface ProfessionalContextProps {
  professionalData: AuthenticatedProfessionalData
  getUserAsProfessional: () => Promise<void>
  createProfessional(
    data: FormDataProps,
    setIsRequesting?: (v: boolean) => void
  ): Promise<void>
  deleteProfessional: () => Promise<void>
  removeProfessionalData: () => void
  errorOnProfessionalRequest: boolean
}

export const ProfessionalContext = createContext({} as ProfessionalContextProps)

interface ProfessionalProviderProps {
  children: ReactNode
}

export function ProfessionalContextProvider({
  children,
}: ProfessionalProviderProps) {
  const [professionalData, setProfessionalData] =
    useState<AuthenticatedProfessionalData>({} as AuthenticatedProfessionalData)
  const [errorOnProfessionalRequest, setErrorOnProfessionalRequest] =
    useState(false)

  async function getUserAsProfessional() {
    await api
      .get<AuthenticatedProfessionalData>('professional/me')
      .then((response) => {
        setProfessionalData(response.data)
        setErrorOnProfessionalRequest(false)
      })
      .catch((error: AxiosError) => {
        console.log(error.status)
        setErrorOnProfessionalRequest(false)
        if (error.response.status !== 404) {
          feedbackToast('ERROR', 'Erro ao buscar informações do profissional')
          setErrorOnProfessionalRequest(true)
        }
      })
  }

  async function createProfessional(
    data: FormDataProps,
    setIsRequesting?: (v: boolean) => void
  ) {
    if (!data.email && !data.phone && !data.whatsapp && !data.instagram) {
      setIsRequesting(false)
      feedbackToast('ERROR', 'Você deve ter pelomenos um meio de contato')
      return
    }

    const imageRequest = await fetch(data.imageUri)
    const imageBlob = await imageRequest.blob()
    const imageFileType = imageBlob.type.split('/')[1]

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('state_uf', data.stateUf)
    formData.append('city', data.city)
    formData.append('biography', data.bio)
    formData.append('services', data.occupation)
    formData.append('profile_picture_file', {
      uri: data.imageUri,
      type: imageBlob.type,
      name: `profile.${imageFileType}`,
    } as unknown as Blob)

    if (data.email) formData.append('email', data.email)
    if (data.phone) formData.append('phone', data.phone)
    if (data.whatsapp) formData.append('whatsapp', data.whatsapp)
    if (data.instagram) formData.append('instagram', data.instagram)

    await api
      .postForm('/professional/create', formData)
      .then((response) => {
        feedbackToast('INFO', 'Profissional registrado com sucesso')
        setProfessionalData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setIsRequesting(false)
        feedbackToast(
          'ERROR',
          'Ocorreu um erro durante o registro de profissional'
        )
        feedbackToast('ERROR', error.message)
      })
  }

  function removeProfessionalData() {
    setProfessionalData({} as AuthenticatedProfessionalData)
  }

  async function deleteProfessional() {
    await api
      .delete(`professional/delete/${professionalData.code}`)
      .then((response) => {
        if (response.status === 204) {
          feedbackToast('INFO', 'Registro deletado com sucesso!')
          removeProfessionalData()
        } else {
          feedbackToast(
            'ERROR',
            'Ocorreu um erro durante a exclusão do registro'
          )
        }
      })
      .catch((error) => {
        feedbackToast('ERROR', 'Ocorreu um erro durante a exclusão do registro')
        feedbackToast('ERROR', error.message)
      })
  }

  return (
    <ProfessionalContext.Provider
      value={{
        professionalData,
        getUserAsProfessional,
        removeProfessionalData,
        deleteProfessional,
        createProfessional,
        errorOnProfessionalRequest,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  )
}
