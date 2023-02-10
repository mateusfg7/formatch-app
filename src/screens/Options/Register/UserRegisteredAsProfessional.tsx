import { useCallback, useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { BookmarkSimple, Star } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { Header } from '../../../components/Header'
import {
  Field,
  ProfessionalName,
  ProfessionalServices,
  ProfessionalBio,
  ProfessionalContact,
  ProfessionalImage,
} from '../../../components/ProfessionalInfo'
import { feedbackToast } from '../../../utils/feedbackToast'
import { ConfirmationModal } from '../../../components/ProfessionalInfo/ConfirmationModal'
import { useProfessional } from '../../../hooks/useProfessional'
import { RefreshControl } from 'react-native'

export function UserRegisteredAsProfesisonal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const {
    professionalData,
    deleteProfessional,
    getUserAsProfessionalFromServer,
  } = useProfessional()
  const { colors } = useTheme()

  async function handleDeleteProfessional() {
    setIsDeleting(true)
    setIsModalOpen(false)

    await deleteProfessional().finally(() => setIsDeleting(false))
  }

  function openVerificationModal() {
    if (isDeleting) {
      feedbackToast('INFO', 'O registro esta sendo deletado, aguarde.')
      return
    } else {
      setIsModalOpen(true)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getUserAsProfessionalFromServer().finally(() => setRefreshing(false))
  }, [])

  return (
    <VStack bg='background.500' flex='1'>
      <Header showBackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack px='5' pt='10' pb='40'>
          <ProfessionalImage
            src={professionalData.profile_picture_url}
            alt={professionalData.name}
          />
          <VStack pt='12' space='10'>
            <ProfessionalName name={professionalData.name} />
            <ProfessionalServices services={professionalData.services} />
            <ProfessionalBio bio={professionalData.biography} />
            <ProfessionalContact
              phone={professionalData.phone}
              email={professionalData.email}
              whatsapp={professionalData.whatsapp}
              instagram={professionalData.instagram}
            />
            <Field title='Estatística'>
              <Pressable
                onPress={() =>
                  feedbackToast(
                    'INFO',
                    `Sua nota média é ${professionalData.averageRate}`
                  )
                }
              >
                <HStack space='3' alignItems='center' mb='3'>
                  <Star
                    weight='duotone'
                    color={
                      professionalData.averageRate >= 4
                        ? colors.secondary[500]
                        : colors.complement[500]
                    }
                  />
                  <Text
                    fontSize='xl'
                    color={
                      professionalData.averageRate >= 4
                        ? 'secondary.500'
                        : 'complement.500'
                    }
                  >
                    {professionalData.averageRate}
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() =>
                  feedbackToast(
                    'INFO',
                    `${professionalData.savedCount} usuários salvaram este profissional em sua lista`
                  )
                }
              >
                <HStack space='3' alignItems='center'>
                  <BookmarkSimple
                    weight='duotone'
                    color={colors.complement[500]}
                  />
                  <Text fontSize='xl' color='complement.500'>
                    {professionalData.savedCount}
                  </Text>
                </HStack>
              </Pressable>
            </Field>

            <Button
              mt='10'
              py='6'
              w='full'
              borderRadius='3xl'
              borderWidth='1'
              borderColor='danger.700'
              bg='danger.100'
              _pressed={{
                bg: !isDeleting ? 'danger.200' : 'danger.100',
              }}
              onPress={() => openVerificationModal()}
            >
              <HStack space='2'>
                {isDeleting && <Spinner color='danger.700' />}
                <Text color='danger.700' fontSize='xl'>
                  {isDeleting ? 'Deletando registro' : 'Deletar registro'}
                </Text>
              </HStack>
            </Button>
            <Box alignItems='center'>
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={async () => {
                  await Clipboard.setStringAsync(professionalData.code)
                  feedbackToast('INFO', `Código copiado!`)
                }}
              >
                <Text color='complement.200'>{professionalData.code}</Text>
              </Pressable>
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        action={handleDeleteProfessional}
      />
    </VStack>
  )
}
