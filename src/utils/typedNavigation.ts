import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { TabNavigatorParamList } from '../routes/app.routes'
import { FeedNavigatorParamList } from '../routes/feed.routes'
import { ProfessionalNavigatorParamList } from '../routes/professional.routes'
import { OptionsNavigatorParamList } from '../routes/options.routes'

export const tabNavigation = useNavigation<
  BottomTabNavigationProp<TabNavigatorParamList>
>

export const feedNavigation = useNavigation<
  NativeStackNavigationProp<FeedNavigatorParamList>
>

export const professionalNavigation = useNavigation<
  NativeStackNavigationProp<ProfessionalNavigatorParamList>
>

export const optionsNavigation = useNavigation<
  NativeStackNavigationProp<OptionsNavigatorParamList>
>
