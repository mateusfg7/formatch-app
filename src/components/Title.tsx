import { Text, VStack } from 'native-base'

interface Props {
  text: string
}

export function Title({ text }: Props) {
  return (
    <VStack px='5' pb='6'>
      <Text color='complement.500' fontFamily='bold' fontSize='2xl'>
        {text}
      </Text>
    </VStack>
  )
}
