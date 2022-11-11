import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feed } from '../screens/Feed'
import { ListProfessionals } from '../screens/ListProfessionals'
import { Options } from '../screens/Options'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name='feed' component={Feed} />
      <Screen name='list-professionals' component={ListProfessionals} />
      <Screen name='options' component={Options} />
    </Navigator>
  )
}
