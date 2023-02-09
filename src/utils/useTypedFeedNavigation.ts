import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { FeedNavigatorParamList } from '../routes/feed.routes'

export const useTypedFeedNavigation = useNavigation<
  NativeStackNavigationProp<FeedNavigatorParamList>
>
