import { ScrollView, VStack } from 'native-base'
import { Header } from '../components/Header'
import { Title } from '../components/Title'

import { ArticleList } from '../components/ArticleList'

export function Feed() {
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <ScrollView>
        <Header />
        <Title text='Novidades e dicas' />
        <ArticleList />
      </ScrollView>
    </VStack>
  )
}
