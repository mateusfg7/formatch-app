import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'

import { useAuth } from '../hooks/useAuth'

import { SignIn } from '../screens/SignIn'
import { AppRoutes } from './app.routes'
import { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'

export function Routes() {
  const [checkUser, setCheckUser] = useState(false)

  const { user, checkUserOnStorage } = useAuth()

  useEffect(() => {
    async function init() {
      setCheckUser(true)
      await checkUserOnStorage()
      setCheckUser(false)
    }

    init()
  }, [])

  return (
    <Box flex='1'>
      {checkUser ? (
        <Loading />
      ) : (
        <NavigationContainer>
          {user.name ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
      )}
    </Box>
  )
}
