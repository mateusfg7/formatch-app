import { VStack } from 'native-base'
import { Header } from '../components/Header'
import { Title } from '../components/Title'

export function ListProfessionals() {
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton />
      <Title text='Informe sua localização' />
    </VStack>
  )
}
