import { NativeBaseProvider, StatusBar } from 'native-base'
import { Routes } from './src/routes'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  )
}
