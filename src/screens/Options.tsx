import { VStack } from 'native-base'
import { Header } from '../components/Header'
import { Title } from '../components/Title'

export function Options() {
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton navigateToScreen='feed' />
      <Title text='Meus dados' />
    </VStack>
  )
}
