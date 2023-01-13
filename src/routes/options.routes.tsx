import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Options } from '../screens/Options'
import { Profile } from '../screens/Options/Profile'

export type OptionsNavigatorParamList = {
  'options.home': {}
  'options.profile': {}
}

const { Navigator, Screen } =
  createNativeStackNavigator<OptionsNavigatorParamList>()

export function OptionsRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='options.home' component={Options} />
      <Screen name='options.profile' component={Profile} />
    </Navigator>
  )
}
