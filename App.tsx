import { NativeBaseProvider, StatusBar } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import * as WebBrowser from 'expo-web-browser'

import { Routes } from './src/routes'
import { AuthContextProvider } from './src/contexts/AuthContext'
import { ProfessionalContextProvider } from './src/contexts/AuthenticatedProfessionalContext'
import { Loading } from './src/components/Loading'

import { THEME } from './src/styles/theme'

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
}

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME} config={nativeBaseConfig}>
      <ProfessionalContextProvider>
        <AuthContextProvider>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='rgba(242, 245, 249, 0.8)'
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </ProfessionalContextProvider>
    </NativeBaseProvider>
  )
}
