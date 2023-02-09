import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Feed } from '../screens/Feed'
import { ArticleContent } from '../screens/ArticleContent'

export type FeedNavigatorParamList = {
  'feed.home': {}
  'feed.article': { article: ArticleData }
}

const { Navigator, Screen } =
  createNativeStackNavigator<FeedNavigatorParamList>()

export function FeedRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='feed.home' component={Feed} />
      <Screen name='feed.article' component={ArticleContent} />
    </Navigator>
  )
}
