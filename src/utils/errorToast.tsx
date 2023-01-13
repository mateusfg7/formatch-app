import { HStack, Text, Toast } from 'native-base'
import { XCircle } from 'phosphor-react-native'

export function errorToast(message: string) {
  Toast.show({
    render: () => (
      <HStack
        borderWidth={1}
        borderColor='red.900'
        bg='red.100'
        borderRadius='2xl'
        p='5'
        alignItems='center'
        justifyContent='space-between'
      >
        <XCircle />
        <Text fontSize='md' ml='3'>
          {message}
        </Text>
      </HStack>
    ),
  })
}
