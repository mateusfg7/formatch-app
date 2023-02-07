import { useEffect, useState } from 'react'
import {
  VStack,
  ScrollView,
  HStack,
  Text,
  Box,
  useTheme,
  Center,
  Pressable,
  Image,
  Spinner,
} from 'native-base'
import {
  Envelope,
  InstagramLogo,
  Phone,
  Star,
  WhatsappLogo,
} from 'phosphor-react-native'
import { AxiosError } from 'axios'
import * as Device from 'expo-device'
import * as Application from 'expo-application'

import { api } from '../../services/api'

import { feedbackToast } from '../../utils/feedbackToast'
import { useSearchProfessional } from '../../hooks/useSearchProfessional'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import Error from '../../assets/error.svg'
import HouseSearch from '../../assets/house-search.svg'

interface ProfessionalData {
  averageRate: number
  biography: string
  city: string
  code: string
  createdAt: string
  email: string | null
  instagram: string | null
  name: string
  phone: string | null
  profile_picture_url: string
  services: string[]
  state_uf: string
  whatsapp: string | null
}

export function ProfessionalList() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [professionalList, setProfessionalList] = useState<
    ProfessionalData[] | undefined
  >(undefined)

  const { data } = useSearchProfessional()

  const { colors } = useTheme()

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
          <Error width='200' height='200' />
          <Text selectable fontSize='xl' color='error.900'>
            Erro {error.response.status}
          </Text>
          <HStack py='3' space='3'>
            <VStack space='1' flex='1' alignItems='flex-end'>
              <Text selectable bold>
                Código
              </Text>

              <Text selectable>Dispositivo</Text>
              <Text selectable>Marca</Text>
              <Text selectable>SO</Text>
              <Text selectable>Versão do App</Text>
            </VStack>
            <VStack space='1' flex='1' alignItems='flex-start'>
              <Text selectable bold>
                {error.code}
              </Text>

              <Text selectable>{Device.modelName}</Text>
              <Text selectable>{Device.brand}</Text>
              <Text selectable>
                {Device.osName} {Device.osVersion}
              </Text>
              <Text selectable>{Application.nativeApplicationVersion}</Text>
            </VStack>
          </HStack>
          <HStack py='2'>
            <Text selectable bold>
              {data.service} - {data.filter.city}, {data.filter.uf}
            </Text>
          </HStack>
        </Center>
      )}
      {!isLoading &&
        !error &&
        professionalList &&
        (professionalList.length == 0 ? (
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
                <Pressable
                  key={professional.name}
                  onPress={() => feedbackToast('WARNING', 'Em desenvolvimento')}
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
                          <Star
                            weight='duotone'
                            color={
                              professional.averageRate >= 4
                                ? colors.secondary[500]
                                : colors.complement[500]
                            }
                          />
                          <Text
                            fontSize='lg'
                            fontFamily='bold'
                            color={
                              professional.averageRate >= 4
                                ? 'secondary.500'
                                : 'complement.500'
                            }
                          >
                            {professional.averageRate}
                          </Text>
                        </HStack>
                        <Box w='0.5' h='3/4' bg='complement.200' />
                        <HStack alignItems='center' space='1'>
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
