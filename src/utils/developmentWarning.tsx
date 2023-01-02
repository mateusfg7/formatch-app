import { HStack, Text, Toast } from 'native-base'
import { Warning } from 'phosphor-react-native'

export function developmentWarning() {
  Toast.show({
    render: () => (
      <HStack
        borderWidth={1}
        borderColor='yellow.900'
        bg='yellow.100'
        borderRadius='2xl'
        p='5'
        alignItems='center'
        justifyContent='space-between'
      >
        <Warning />
        <Text fontSize='md' ml='3'>
          Em desenvolvimento
        </Text>
      </HStack>
    ),
  })
}
