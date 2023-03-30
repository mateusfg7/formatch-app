import { useEffect, useState } from 'react'
import { VStack, ScrollView, Text, Center, Spinner } from 'native-base'
import { AxiosError } from 'axios'

import { api } from '../../../services/api'

import { feedbackToast } from '../../../utils/feedbackToast'
import { optionsNavigation } from '../../../utils/typedNavigation'

import { Header } from '../../../components/Header'
import { Title } from '../../../components/Title'
import { AxiosRequestErrorInfo } from '../../../components/AxiosRequestErrorInfo'

import HouseSearch from '../../../assets/house-search.svg'
import { ProfessionalCard } from '../../../components/ProfessionalCard'

export function SavedProfessionals() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [professionalList, setProfessionalList] = useState<
    ProfessionalData[] | undefined
  >(undefined)

  const { navigate, addListener } = optionsNavigation()

  async function fetchProfessionalList() {
    await api
      .get<ProfessionalData[]>('/user/saved')
      .then((response) => {
        setProfessionalList(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error.response.data))
        setError(error)
        feedbackToast('ERROR', 'Erro durante o carregamento de profissionais')
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      setIsLoading(true)
      fetchProfessionalList()
    })

    fetchProfessionalList()

    return unsubscribe
  }, [])

  return (
    <VStack flex='1' backgroundColor='background.500'>
      <Header showBackButton navigateToScreen='options.home' />
      <Title text='Profissionais salvos' />
      {isLoading && (
        <Center flex='1' mb='24'>
          <Spinner size='lg' color='complement.500' />
        </Center>
      )}
      {!isLoading && error && (
        <Center mb='24' px='5'>
          <AxiosRequestErrorInfo error={error} />
        </Center>
      )}
      {!isLoading &&
        !error &&
        professionalList &&
        (professionalList.length == 0 ? (
          <Center mb='24' px='5' pt='5'>
            <HouseSearch width='250' height='250' />
            <Text fontSize='xl' textAlign='center'>
              Nenhum profissional salvo ainda
            </Text>
          </Center>
        ) : (
          <ScrollView>
            <VStack pb='40'>
              {professionalList.map((professional) => (
                <ProfessionalCard
                  key={professional.code}
                  professional={professional}
                  onPress={() =>
                    navigate('options.saved.details', {
                      code: professional.code,
                    })
                  }
                  hideRating
                />
              ))}
            </VStack>
          </ScrollView>
        ))}
    </VStack>
  )
}
