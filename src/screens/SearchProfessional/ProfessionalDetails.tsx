import {
  Box,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { RouteProp } from '@react-navigation/native'
import { BookmarkSimple } from 'phosphor-react-native'

import { Header } from '../../components/Header'
import {
  ProfessionalName,
  ProfessionalServices,
  ProfessionalBio,
  ProfessionalContact,
  ProfessionalImage,
  RateProfessional,
} from '../../components/ProfessionalInfo'
import { feedbackToast } from '../../utils/feedbackToast'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { Center } from 'native-base'
import { AxiosRequestErrorInfo } from '../../components/AxiosRequestErrorInfo'
import { AdBanner } from '../../components/AdBanner'

interface ProfessionalData {
  name: string
  biography: string
  email: string | null
  phone: string | null
  instagram: string | null
  whatsapp: string | null
  city: string
  state_uf: string
  services: string[]
  averageRate: number
  profile_picture_url: string
  currentRate?: number
  isSaved: boolean
  code: string
}

interface Props {
  route: RouteProp<{ params: { code: string } }, 'params'>
}

export function ProfessionalDetails({ route: { params } }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<AxiosError | undefined>()
  const [professional, setProfessional] = useState<
    ProfessionalData | undefined
  >()

  const { sizes, colors } = useTheme()

  async function toggleBookmark() {
    if (!professional) return

    setIsSaved(!professional.isSaved)

    await api
      .post('/professional/save', { code: professional.code })
      .then((response) => console.log(response.status))
      .catch((err: AxiosError) => {
        console.log(JSON.stringify(err.response.data))
        feedbackToast('ERROR', 'Erro ao salvar usuário')
        setIsSaved(professional.isSaved)
      })
      .finally(() => console.log('SAVING FINISH'))
  }

  async function fetchProfessionalDetail() {
    await api
      .get<ProfessionalData>(`/professional/${params.code}`)
      .then((response) => {
        setProfessional(response.data)
        setIsSaved(response.data.isSaved)
        console.log(response.data.isSaved)
      })
      .catch((err: AxiosError) => {
        console.log(JSON.stringify(err))
        feedbackToast(
          'ERROR',
          'Ocorreu um erro ao buscar os dados do profissional'
        )
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchProfessionalDetail()
  }, [params.code])

  return (
    <VStack bg='background.500' flex='1'>
      <Header
        showBackButton
        {...(!isLoading &&
          professional && {
            ActionButton: () => (
              <Pressable
                flex='1'
                _pressed={{ opacity: 0.5 }}
                onPress={toggleBookmark}
              >
                <Center flex='1'>
                  {isSaved ? (
                    <BookmarkSimple
                      size={sizes['8']}
                      color={colors.complement['500']}
                      weight='fill'
                    />
                  ) : (
                    <BookmarkSimple
                      size={sizes['8']}
                      color={colors.complement['500']}
                    />
                  )}
                </Center>
              </Pressable>
            ),
          })}
      />
      {isLoading && (
        <Center flex='1' mb='24'>
          <Spinner size='lg' color='complement.500' />
        </Center>
      )}
      {!isLoading && error && (
        <Center mb='24' px='5'>
          <AxiosRequestErrorInfo error={error} />
          <VStack py='2' alignItems='center'>
            <Text>Código do profissional:</Text>
            <Text selectable bold>
              {params.code}
            </Text>
          </VStack>
        </Center>
      )}
      {!isLoading && !error && professional && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack px='5' pt='10' pb='40'>
            <AdBanner />
            <ProfessionalImage
              src={professional.profile_picture_url}
              alt={professional.name}
            />
            <VStack pt='12' space='10'>
              <ProfessionalName name={professional.name} />
              <ProfessionalServices services={professional.services} />
              <ProfessionalBio bio={professional.biography} />
              <ProfessionalContact
                phone={professional.phone}
                email={professional.email}
                whatsapp={professional.whatsapp}
                instagram={professional.instagram}
              />
              <RateProfessional
                rateValue={professional.currentRate}
                professionalCode={professional.code}
              />
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
