import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SelectService } from '../screens/SearchProfessional/SelectService'
import { SelectLocation } from '../screens/SearchProfessional/SelectLocation'
import { ProfessionalList } from '../screens/SearchProfessional/ProfessionalList'
import { ProfessionalSearchContextProvider } from '../contexts/ProfessionalSearchContext'

export type ProfessionalNavigatorParamList = {
  'professional.location': {}
  'professional.service': { uf: string; city: string }
  'professional.list': { uf: string; city: string; service: string }
}

const { Navigator, Screen } =
  createNativeStackNavigator<ProfessionalNavigatorParamList>()

export function ProfessionalRoute() {
  return (
    <ProfessionalSearchContextProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='professional.location' component={SelectLocation} />
        <Screen name='professional.service' component={SelectService} />
        <Screen name='professional.list' component={ProfessionalList} />
      </Navigator>
    </ProfessionalSearchContextProvider>
  )
}
