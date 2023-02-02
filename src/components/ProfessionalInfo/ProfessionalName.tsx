import { Text } from 'native-base'
import { Field } from './Field'

interface Props {
  name: string
}

export const ProfessionalName = ({ name }: Props) => {
  return (
    <Field title='Nome'>
      <Text fontSize='2xl' color='complement.500' fontFamily='bold'>
        {name}
      </Text>
    </Field>
  )
}
