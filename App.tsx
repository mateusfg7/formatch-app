import { NativeBaseProvider, StatusBar } from 'native-base'
import { Routes } from './src/routes'
import { THEME } from './src/styles/theme'

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  )
}
