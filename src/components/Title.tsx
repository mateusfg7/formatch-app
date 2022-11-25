import { Text, VStack } from 'native-base'

interface Props {
  text: string
}

export function Title({ text }: Props) {
  return (
    <VStack w='full' h='16' px='5'>
      <Text color='complement.500' fontFamily='bold' fontSize='2xl'>
        {text}
      </Text>
    </VStack>
  )
}
