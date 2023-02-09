import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Options } from '../screens/Options'
import { Profile } from '../screens/Options/Profile'
import { SavedProfessionals } from '../screens/Options/SavedProfessionals'
import { ProfessionalDetails } from '../screens/Options/SavedProfessionals/ProfessionalDetails'
import { Register } from '../screens/Options/Register'

export type OptionsNavigatorParamList = {
  'options.home': {}
  'options.profile': {}
  'options.saved': {}
  'options.saved.details': { code: string }
  'options.register': {}
}

const { Navigator, Screen } =
  createNativeStackNavigator<OptionsNavigatorParamList>()

export function OptionsRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='options.home' component={Options} />
      <Screen name='options.profile' component={Profile} />
      <Screen name='options.saved' component={SavedProfessionals} />
      <Screen name='options.saved.details' component={ProfessionalDetails} />
      <Screen name='options.register' component={Register} />
    </Navigator>
  )
}
