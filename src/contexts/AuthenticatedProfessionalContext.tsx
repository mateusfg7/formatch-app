import { ReactNode, createContext, useState } from 'react'
import { api } from '../services/api'
import { infoToast } from '../utils/infoToast'
import { errorToast } from '../utils/errorToast'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

export interface ProfessionalContextProps {
  professionalData: AuthenticatedProfessionalData
  getUserAsProfessional: () => Promise<void>
  createProfessional(
    data: FormDataProps,
    setIsRequesting?: (v: boolean) => void
  ): Promise<void>
  deleteProfessional: () => Promise<void>
  removeProfessionalData: () => void
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

  const { getItem, setItem, removeItem } = useAsyncStorage(
    '@Formatch_userAsProfessional'
  )

  async function getUserAsProfessional() {
    try {
      const professionalOnStorage = await getItem()
      if (professionalOnStorage) {
        const parsedProfessionalInfo = JSON.parse(professionalOnStorage)
        setProfessionalData(parsedProfessionalInfo)
        return
      }
    } catch (error) {
      console.log(error)
    }

    await api
      .get<AuthenticatedProfessionalData>('professional/me')
      .then((response) => {
        setProfessionalData(response.data)
        setItem(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error.status)
      })
  }

  async function createProfessional(
    data: FormDataProps,
    setIsRequesting?: (v: boolean) => void
  ) {
    if (!data.email && !data.phone && !data.whatsapp && !data.instagram) {
      setIsRequesting(false)
      errorToast('Você deve ter pelomenos um meio de contato')
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
        infoToast('Profissional registrado com sucesso')
        setProfessionalData(response.data)
        setItem(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
        setIsRequesting(false)
        errorToast('Ocorreu um erro durante o registro de profissional')
        errorToast(error.message)
      })
  }

  function removeProfessionalData() {
    removeItem()
    setProfessionalData({} as AuthenticatedProfessionalData)
  }

  async function deleteProfessional() {
    await api
      .delete(`professional/delete/${professionalData.code}`)
      .then((response) => {
        if (response.status === 204) {
          infoToast('Registro deletado com sucesso!')
          removeProfessionalData()
        } else {
          errorToast('Ocorreu um erro durante a exclusão do registro')
        }
      })
      .catch((error) => {
        errorToast('Ocorreu um erro durante a exclusão do registro')
        errorToast(error.message)
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
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  )
}
