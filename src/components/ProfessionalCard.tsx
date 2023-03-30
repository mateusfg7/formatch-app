import { useState } from 'react'
import {
  Box,
  Text,
  Center,
  Image,
  VStack,
  HStack,
  Pressable,
  useTheme,
} from 'native-base'
import {
  Envelope,
  InstagramLogo,
  Phone,
  Star,
  WhatsappLogo,
} from 'phosphor-react-native'

import { professionalNavigation } from '../utils/typedNavigation'
import { LoadingSkeleton } from './LoadingSkeleton'

interface Props {
  professional: ProfessionalData
}

export function ProfessionalCard({ professional }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const { colors } = useTheme()
  const { navigate } = professionalNavigation()

  return (
    <Pressable
      key={professional.name}
      onPress={() =>
        navigate('professional.details', {
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
          <LoadingSkeleton isContentVisible={isImageLoaded}>
            <Image
              source={{ uri: professional.profile_picture_url }}
              alt='Picture'
              size='full'
              onLoadEnd={() => setIsImageLoaded(true)}
            />
          </LoadingSkeleton>
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
          <HStack alignItems='center' space='3'>
            <HStack alignItems='center' space='1'>
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
              {professional.whatsapp && <WhatsappLogo weight='light' />}
              {professional.instagram && <InstagramLogo weight='light' />}
              {professional.phone && <Phone weight='light' />}
              {professional.email && <Envelope weight='light' />}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}
