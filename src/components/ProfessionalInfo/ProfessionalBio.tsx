import { Text } from 'native-base'
import { Field } from './Field'

interface Props {
  bio: string
}

export const ProfessionalBio = ({ bio }: Props) => {
  return (
    <Field title='Biografia'>
      <Text fontSize='2xl' textAlign='justify' lineHeight='md'>
        {bio}
      </Text>
    </Field>
  )
}
