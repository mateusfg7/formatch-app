import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Options } from '../screens/Options'

export type OptionsNavigatorParamList = {
  'options.home': {}
}

const { Navigator, Screen } =
  createNativeStackNavigator<OptionsNavigatorParamList>()

export function OptionsRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='options.home' component={Options} />
    </Navigator>
  )
}
