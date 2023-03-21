import { useState } from 'react'
import {
  Box,
  Divider,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base'

import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/useAuth'
import { SketchLogo, Star } from 'phosphor-react-native'
import { feedbackToast } from '../../utils/feedbackToast'

export function Premium() {
  const [isUserSubscribing, setIsUserSubscribing] = useState(false)

  const { user, togglePremium } = useAuth()

  const { sizes } = useTheme()

  async function subscribe() {
    setIsUserSubscribing(true)
    await togglePremium()
      .then((isPremiumActivated) => {
        if (isPremiumActivated) {
          feedbackToast('PREMIUM', 'Assinatura premium ativada!')
        } else {
          feedbackToast('INFO', 'Assinatura premium desativada!')
        }
      })
      .catch((error) => {
        feedbackToast('ERROR', 'Erro ao criar assinatura Premium')
        feedbackToast('ERROR', String(error))
        console.log(error)
      })
      .finally(() => setIsUserSubscribing(false))
  }

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton />
      <VStack px='5' pb='48'>
        <VStack
          background='white'
          borderRadius='3xl'
          alignItems='center'
          h='full'
          mt='2'
          shadow='4'
        >
          <Box
            flex='1'
            w='full'
            p='3'
            justifyContent='center'
            alignItems='center'
          >
            <Box mb='3'>
              <SketchLogo weight='duotone' color='#9D9700' size={sizes['16']} />
            </Box>
            {!user.subscribe ? (
              <Text fontSize='3xl' textAlign='center'>
                Aproveite o máximo{'\n'}
                que nosso app pode{'\n'}
                oferecer ;)
              </Text>
            ) : (
              <Text fontSize='3xl' textAlign='center'>
                A assinatura premium esta <Text bold>ativada</Text>! :)
              </Text>
            )}
          </Box>
          <Divider />
          <VStack
            flex='1'
            w='full'
            p='3'
            space='8'
            justifyContent='center'
            alignItems='center'
          >
            <VStack>
              <HStack alignItems='center' space='2'>
                <Box>
                  <Star weight='fill' color='#9D9700' />
                </Box>
                <Text bold fontSize='xl'>
                  Ferramentas utilitárias
                </Text>
              </HStack>

              <HStack alignItems='center' space='2'>
                <Box>
                  <Star weight='fill' color='#9D9700' />
                </Box>
                <Text bold fontSize='xl'>
                  Sem anúncios
                </Text>
              </HStack>

              <HStack alignItems='center' space='2'>
                <Box>
                  <Star weight='fill' color='#9D9700' />
                </Box>
                <Text bold fontSize='xl'>
                  Preço acessível
                </Text>
              </HStack>
            </VStack>

            <Pressable w='2/3' onPress={subscribe} _pressed={{ opacity: 0.7 }}>
              <Box
                borderRadius='2xl'
                justifyContent='center'
                alignItems='center'
                // p='3'
                h='20'
                w='full'
                borderWidth='2'
                borderColor={!user.subscribe ? '#9D9700' : 'danger.700'}
                backgroundColor={
                  !user.subscribe ? 'rgba(157,151,0,0.1)' : 'danger.50'
                }
              >
                {isUserSubscribing ? (
                  <Box>
                    <Spinner
                      color={!user.subscribe ? '#9D9700' : 'danger.700'}
                      size='lg'
                    />
                  </Box>
                ) : !user.subscribe ? (
                  <Text color='#9D9700' textAlign='center' fontSize='xl'>
                    Por apenas{'\n'}
                    <Text bold>R$10,00</Text> / mês
                  </Text>
                ) : (
                  <Text color='danger.700' textAlign='center' fontSize='lg'>
                    Desativar assinatura premium
                  </Text>
                )}
              </Box>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
