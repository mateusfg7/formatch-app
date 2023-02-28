import { VStack } from 'native-base'
import { ArticleList } from '../components/ArticleList'

export function Feed() {
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <ArticleList />
    </VStack>
  )
}
