import { ReactNode, createContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import constants from 'expo-constants'

import { api } from '../services/api'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '../constants'
import { errorToast } from '../utils/errorToast'

interface UserProps {
  name: string
  email: string
  avatar_url: string
  subscribe: boolean
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [_request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri:
      constants.appOwnership === 'expo'
        ? AuthSession.makeRedirectUri({ useProxy: true })
        : 'com.mateusfg7.formatch:/',
    scopes: ['profile', 'email'],
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.error(error)
      errorToast('Erro ao authenticar usuário')
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/user/create', { access_token })
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/user')
      setUser(userInfoResponse.data)
    } catch (error) {
      console.error(error)
      errorToast('Erro ao criar usuário')
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
