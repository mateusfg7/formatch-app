import { RegisterForm } from './RegisterForm'
import { UserRegisteredAsProfesisonal } from './UserRegisteredAsProfessional'
import { useProfessional } from '../../../hooks/useProfessional'
import { Box } from 'native-base'

export function Register() {
  const { professionalData } = useProfessional()

  return (
    <Box flex='1' bg='background.500'>
      {professionalData.code ? (
        <UserRegisteredAsProfesisonal />
      ) : (
        <RegisterForm />
      )}
    </Box>
  )
}
