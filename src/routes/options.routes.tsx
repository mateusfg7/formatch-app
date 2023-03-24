import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Options } from '../screens/Options'
import { Profile } from '../screens/Options/Profile'
import { Premium } from '../screens/Options/Premium'
import { SavedProfessionals } from '../screens/Options/SavedProfessionals'
import { ProfessionalDetails } from '../screens/Options/SavedProfessionals/ProfessionalDetails'
import { Register } from '../screens/Options/Register'
import { Contact } from '../screens/Options/Contact'
import { DevData } from '../screens/Options/DevData'

export type OptionsNavigatorParamList = {
  'options.home': {}
  'options.profile': {}
  'options.premium': {}
  'options.saved': {}
  'options.saved.details': { code: string }
  'options.register': {}
  'options.contact': {}
  'options.devdata': {}
}

const { Navigator, Screen } =
  createNativeStackNavigator<OptionsNavigatorParamList>()

export function OptionsRoute() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='options.home' component={Options} />
      <Screen name='options.profile' component={Profile} />
      <Screen name='options.premium' component={Premium} />
      <Screen name='options.saved' component={SavedProfessionals} />
      <Screen name='options.saved.details' component={ProfessionalDetails} />
      <Screen name='options.register' component={Register} />
      <Screen name='options.contact' component={Contact} />
      <Screen name='options.devdata' component={DevData} />
    </Navigator>
  )
}
