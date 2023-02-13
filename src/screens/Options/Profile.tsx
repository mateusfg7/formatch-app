import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { useAuth } from '../../hooks/useAuth'
import { SignOut } from 'phosphor-react-native'

export function Profile() {
  const { user, signOut } = useAuth()

  const { fontSizes } = useTheme()

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton />
      <Title text='Meus dados' />
      <VStack px='5' py='6' alignItems='center'>
        <VStack alignItems='center' mb='16'>
          <Image
            source={{ uri: user.avatar_url }}
            alt='Foto do usuário'
            h='32'
            w='32'
            borderRadius='full'
            mb='4'
          />
          <Text fontFamily='bold' fontSize='xl'>
            {user.name}
          </Text>
        </VStack>
        <VStack w='full' mb='16'>
          <HStack justifyContent='space-between' px='2'>
            <Text fontSize='lg' fontFamily='bold' color='complement.400' mr='2'>
              Email
            </Text>
            <Box flex='1'>
              <Text
                fontSize='lg'
                fontFamily='bold'
                color='complement.500'
                w='full'
                textAlign='right'
                isTruncated
              >
                {user.email}
              </Text>
            </Box>
          </HStack>
          <Divider my='4' />
          <HStack justifyContent='space-between' px='2'>
            <Text fontSize='lg' fontFamily='bold' color='complement.400'>
              Assinatura
            </Text>
            {user.subscribe ? (
              <Text fontSize='lg' fontFamily='bold' color='subscribe'>
                Ativada
              </Text>
            ) : (
              <Text fontSize='lg' fontFamily='bold' color='complement.500'>
                Desativada
              </Text>
            )}
          </HStack>
        </VStack>
        <Pressable _pressed={{ opacity: 0.6 }} onPress={signOut}>
          <HStack justifyContent='center' alignItems='center'>
            <Box mr='3'>
              <SignOut color='#FF6B6B' weight='bold' size={fontSizes['3xl']} />
            </Box>
            <Text color='#FF6B6B' fontFamily='bold' fontSize='2xl'>
              Sair
            </Text>
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  )
}
