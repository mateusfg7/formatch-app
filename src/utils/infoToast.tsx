import { HStack, Text, Toast } from 'native-base'
import { Info } from 'phosphor-react-native'

export function infoToast(message: string) {
  Toast.show({
    render: () => (
      <HStack
        borderWidth={1}
        borderColor='blue.900'
        bg='blue.100'
        borderRadius='2xl'
        p='5'
        alignItems='center'
        justifyContent='space-between'
      >
        <Info />
        <Text fontSize='md' ml='3'>
          {message}
        </Text>
      </HStack>
    ),
  })
}
