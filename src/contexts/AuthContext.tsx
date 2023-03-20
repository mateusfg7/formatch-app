import { ReactNode, createContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import constants from 'expo-constants'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { api } from '../services/api'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '../constants'
import { useProfessional } from '../hooks/useProfessional'
import { feedbackToast } from '../utils/feedbackToast'

WebBrowser.maybeCompleteAuthSession()

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
  signOut: () => void
  checkUserOnStorage: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const { removeProfessionalData, getUserAsProfessional } = useProfessional()

  const [_request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    // redirectUri:
    //   constants.appOwnership === 'expo'
    //     ? AuthSession.makeRedirectUri({ useProxy: true })
    //     : 'com.mateusfg7.formatch:/',
    // scopes: ['profile', 'email'],
  })

  const { getItem, setItem, removeItem } = useAsyncStorage('@Formatch_user')

  async function checkUserOnStorage() {
    try {
      const userOnStorage = await getItem()
      if (!userOnStorage) {
        return
      }

      const parsedUserInfo = JSON.parse(userOnStorage)
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${parsedUserInfo.token}`

      await getUserAsProfessional()
      setUser(parsedUserInfo.user)
    } catch (error) {
      feedbackToast('ERROR', 'Erro ao verificar usuário')
    }
  }

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.error(error)
      feedbackToast('ERROR', 'Erro ao authenticar usuário')
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  function signOut() {
    removeProfessionalData()
    removeItem()
    setUser({} as UserProps)
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
      await setItem(
        JSON.stringify({
          user: userInfoResponse.data,
          token: tokenResponse.data.token,
        })
      ).then(async () => {
        await getUserAsProfessional()
      })
    } catch (error) {
      console.error(error)
      feedbackToast('ERROR', 'Erro ao criar usuário')
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
    <AuthContext.Provider
      value={{ user, isUserLoading, signIn, signOut, checkUserOnStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}
