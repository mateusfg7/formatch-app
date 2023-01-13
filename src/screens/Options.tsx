import { HStack, Text, VStack } from 'native-base'
import { Image } from 'native-base'
import Constants from 'expo-constants'

import { Header } from '../components/Header'
import { Title } from '../components/Title'
import { useAuth } from '../hooks/useAuth'

export function Options() {
  const { user } = useAuth()

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header />
      <Title text='Meus dados' />
      <VStack px='5' alignItems='center'>
        <Image
          source={{ uri: user.avatar_url }}
          alt='Profile image'
          size='xl'
          resizeMode='contain'
          borderRadius='full'
          mb='6'
        />
        <HStack alignItems='center' mb='3' w='full'>
          <Text fontSize='lg'>nome: </Text>
          <Text fontSize='xl'>{user.name}</Text>
        </HStack>
        <HStack alignItems='center' mb='3' w='full'>
          <Text fontSize='lg'>email: </Text>
          <Text fontSize='xl'>{user.email}</Text>
        </HStack>
        <HStack alignItems='center' mb='3' w='full'>
          <Text fontSize='lg'>premium: </Text>
          <Text fontSize='xl'>{String(user.subscribe)}</Text>
        </HStack>
        <HStack alignItems='center' mb='3' w='full'>
          <Text fontSize='lg'>environment: </Text>
          <Text fontSize='xl'>{String(Constants.appOwnership)}</Text>
        </HStack>
        <HStack alignItems='center' mb='3' w='full'>
          <Text fontSize='lg'>system version: </Text>
          <Text fontSize='xl'>{String(Constants.systemVersion)}</Text>
        </HStack>
      </VStack>
    </VStack>
  )
}
