import { useEffect, useState } from 'react'
import {
  VStack,
  ScrollView,
  HStack,
  Text,
  Box,
  Center,
  Spinner,
} from 'native-base'
import { AxiosError } from 'axios'

import { api } from '../../services/api'

import { feedbackToast } from '../../utils/feedbackToast'
import { professionalNavigation } from '../../utils/typedNavigation'
import { useSearchProfessional } from '../../hooks/useSearchProfessional'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { AdBanner } from '../../components/AdBanner'
import { AxiosRequestErrorInfo } from '../../components/AxiosRequestErrorInfo'
import { ProfessionalCard } from '../../components/ProfessionalCard'

import HouseSearch from '../../assets/house-search.svg'

export function ProfessionalList() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [professionalList, setProfessionalList] = useState<
    ProfessionalData[] | undefined
  >(undefined)

  const { data } = useSearchProfessional()

  const { navigate } = professionalNavigation()

  async function fetchProfessionalList() {
    await api
      .get<{ professional_list: ProfessionalData[] }>('/professional/service', {
        params: {
          service: data.service,
          uf: data.filter.uf,
          city: data.filter.city,
        },
      })
      .then((response) => {
        setProfessionalList(response.data.professional_list)
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error.response.data))
        setError(error)
        feedbackToast('ERROR', 'Erro durante o carregamento de profissionais')
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!data.filter.city && !data.filter.uf && !data.service) {
      feedbackToast('ERROR', 'Occorreu um erro inesperado 2')
      return
    }

    fetchProfessionalList()
  }, [])

  return (
    <VStack flex='1' backgroundColor='background.500'>
      <Header showBackButton navigateToScreen='professional.service' />
      <Title text={data.service ? data.service : 'Profissionais cadastrados'} />
      {isLoading && (
        <Center flex='1' mb='24'>
          <Spinner size='lg' color='complement.500' />
        </Center>
      )}
      {!isLoading && error && (
        <Center mb='24' px='5'>
          <AxiosRequestErrorInfo error={error} />
          <HStack py='2'>
            <Text selectable bold>
              {data.service} - {data.filter.city}, {data.filter.uf}
            </Text>
          </HStack>
        </Center>
      )}
      {!isLoading && !error && professionalList && (
        <>
          <Box mx='5'>
            <AdBanner />
          </Box>
          {professionalList.length == 0 ? (
            <Center mb='24' px='5' pt='5'>
              <HouseSearch width='250' height='250' />
              <Text fontSize='xl' textAlign='center'>
                Nenhum profissional cadastrado
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
                      navigate('professional.details', {
                        code: professional.code,
                      })
                    }
                  />
                ))}
              </VStack>
            </ScrollView>
          )}
        </>
      )}
    </VStack>
  )
}
