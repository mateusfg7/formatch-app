import { useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
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
import { infoToast } from '../../../utils/infoToast'
import { ConfirmationModal } from '../../../components/ProfessionalInfo/ConfirmationModal'
import { useProfessional } from '../../../hooks/useProfessional'

export function UserRegisteredAsProfesisonal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { professionalData, deleteProfessional } = useProfessional()
  const { colors } = useTheme()

  async function handleDeleteProfessional() {
    await deleteProfessional()
  }

  return (
    <VStack bg='background.500' flex='1'>
      <Header showBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  infoToast(`Sua nota média é ${professionalData.averageRate}`)
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
                  infoToast(
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
                bg: 'danger.200',
              }}
              onPress={() => setIsModalOpen(true)}
            >
              <Text color='danger.700' fontSize='xl'>
                Deletar registro
              </Text>
            </Button>
            <Box alignItems='center'>
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={async () => {
                  await Clipboard.setStringAsync(professionalData.code)
                  infoToast(`Código copiado!`)
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