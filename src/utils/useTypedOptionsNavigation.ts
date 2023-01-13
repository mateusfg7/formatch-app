import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { OptionsNavigatorParamList } from '../routes/options.routes'

export const useTypedOptionsNavigation = useNavigation<
  NativeStackNavigationProp<OptionsNavigatorParamList>
>
