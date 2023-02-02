import { HStack, Box, Text } from 'native-base'
import { Field } from './Field'

interface Props {
  services: string[]
}

export const ProfessionalServices = ({ services }: Props) => {
  return (
    <Field title='Área de atuação'>
      <HStack space='2' flexWrap='wrap'>
        {services.map((service) => (
          <Box
            borderWidth='1'
            borderColor='secondary.600'
            borderRadius='2xl'
            py='1'
            px='2'
            justifyContent='center'
            alignItems='center'
            bg='secondary.200'
            mb='2'
            key={service}
          >
            <Text fontSize='lg' color='secondary.600'>
              {service}
            </Text>
          </Box>
        ))}
      </HStack>
    </Field>
  )
}
