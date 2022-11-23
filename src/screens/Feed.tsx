import { Text, VStack } from 'native-base'
import { Header } from '../components/Header'

export function Feed() {
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header />
      <Text>Feed</Text>
    </VStack>
  )
}
