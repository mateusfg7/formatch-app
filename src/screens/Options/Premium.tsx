import {
  Box,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'

import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/useAuth'
import { SignOut, SketchLogo, Star } from 'phosphor-react-native'

export function Premium() {
  const { user, signOut } = useAuth()

  const { sizes } = useTheme()

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
            <Text fontSize='3xl' textAlign='center'>
              Aproveite o máximo{'\n'}
              que nosso app pode{'\n'}
              oferecer ;)
            </Text>
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

            <Pressable
              w='2/3'
              onPress={() => console.log('Pressed')}
              _pressed={{ opacity: 0.7 }}
            >
              <Box
                borderRadius='2xl'
                justifyContent='center'
                alignItems='center'
                p='3'
                w='full'
                borderWidth='2'
                borderColor='#9D9700'
                backgroundColor='rgba(157,151,0,0.1)'
              >
                <Text color='#9D9700' textAlign='center' fontSize='xl'>
                  Por apenas{'\n'}
                  <Text bold>R$10,00</Text> / mês
                </Text>
              </Box>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
