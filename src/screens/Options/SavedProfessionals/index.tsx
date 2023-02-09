import { useEffect, useState } from 'react'
import {
  VStack,
  ScrollView,
  HStack,
  Text,
  Box,
  Center,
  Pressable,
  Image,
  Spinner,
} from 'native-base'
import {
  Envelope,
  InstagramLogo,
  Phone,
  WhatsappLogo,
} from 'phosphor-react-native'
import { AxiosError } from 'axios'

import { api } from '../../../services/api'

import { feedbackToast } from '../../../utils/feedbackToast'
import { optionsNavigation } from '../../../utils/typedNavigation'

import { Header } from '../../../components/Header'
import { Title } from '../../../components/Title'
import { AxiosRequestErrorInfo } from '../../../components/AxiosRequestErrorInfo'

import HouseSearch from '../../../assets/house-search.svg'

interface ProfessionalData {
  code: string
  profile_picture_url: string
  name: string
  email: string | null
  phone: string | null
  state_uf: string
  city: string
  biography: string
  whatsapp: string | null
  instagram: string | null
  createdAt: string
  updatedAt: string
}

export function SavedProfessionals() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [professionalList, setProfessionalList] = useState<
    ProfessionalData[] | undefined
  >(undefined)

  const { navigate, addListener, removeListener } = optionsNavigation()

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
                <Pressable
                  key={professional.name}
                  onPress={() =>
                    navigate('options.saved.details', {
                      code: professional.code,
                    })
                  }
                >
                  <HStack
                    bg='white'
                    alignItems='center'
                    shadow='2'
                    rounded='3xl'
                    my='2 '
                    mx='5'
                    overflow='hidden'
                  >
                    <Center size='110'>
                      <Image
                        source={{ uri: professional.profile_picture_url }}
                        alt='Picture'
                        size='110'
                      />
                    </Center>
                    <VStack
                      flex='1'
                      alignItems='flex-start'
                      justifyContent='space-around'
                      p='2'
                      space='4'
                    >
                      <Box w='full'>
                        <Text
                          fontSize='lg'
                          color='complement.500'
                          fontFamily='bold'
                          isTruncated
                        >
                          {professional.name}
                        </Text>
                      </Box>
                      <HStack alignItems='center' space='4'>
                        <HStack alignItems='center' space='2'>
                          {professional.whatsapp && (
                            <WhatsappLogo weight='light' />
                          )}
                          {professional.instagram && (
                            <InstagramLogo weight='light' />
                          )}
                          {professional.phone && <Phone weight='light' />}
                          {professional.email && <Envelope weight='light' />}
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        ))}
    </VStack>
  )
}
