import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { TabNavigatorParamList } from '../routes/app.routes'

export const useTypedNavigation = useNavigation<
  BottomTabNavigationProp<TabNavigatorParamList>
>
