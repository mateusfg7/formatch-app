import { useEffect, useState } from 'react'
import { RegisterForm } from './RegisterForm'
import { UserRegisteredAsProfesisonal } from './UserRegisteredAsProfessional'
import { Loading } from '../../../components/Loading'
import { useProfessional } from '../../../hooks/useProfessional'
import { Box } from 'native-base'
import { Header } from '../../../components/Header'

export function Register() {
  const [isLoading, setIsLoading] = useState(true)

  const { professionalData, getUserAsProfessional } = useProfessional()

  useEffect(() => {
    ;(async () => {
      if (!professionalData.code) {
        setIsLoading(true)
        await getUserAsProfessional()
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <Box flex='1' bg='background.500'>
      {isLoading ? (
        <>
          <Header showBackButton />
          <Loading />
        </>
      ) : professionalData.code ? (
        <UserRegisteredAsProfesisonal />
      ) : (
        <RegisterForm />
      )}
    </Box>
  )
}
