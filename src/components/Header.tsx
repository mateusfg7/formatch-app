import Constants from 'expo-constants'
import { Box, HStack, Text, useTheme, VStack } from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

interface Props {
  showBackButton?: boolean
  navigateToScreen?: string
  title?: string
}

export function Header({
  showBackButton = false,
  navigateToScreen,
  title,
}: Props) {
  const EmptyBoxSpace = () => <Box w='8' h='8' />

  const { sizes, colors } = useTheme()
  const { navigate, goBack } = useNavigation()

  function handleBackNavigation() {
    if (navigateToScreen) {
      navigate(navigateToScreen as never)
    } else {
      goBack()
    }
  }

  return (
    <VStack w='full' mt={Constants.statusBarHeight} pt='3' pb='2' px='5'>
      <HStack
        alignItems='center'
        justifyContent={title ? 'flex-start' : 'space-between'}
      >
        {showBackButton ? (
          <TouchableOpacity onPress={() => handleBackNavigation()}>
            <ArrowLeft
              size={sizes[8]}
              color={colors.complement[500]}
              weight='bold'
            />
          </TouchableOpacity>
        ) : (
          <EmptyBoxSpace />
        )}
        {title ? (
          <Text color='complement.500' fontFamily='bold' fontSize='md' ml='4'>
            {title}
          </Text>
        ) : (
          <>
            <EmptyBoxSpace />
            <EmptyBoxSpace />
          </>
        )}
      </HStack>
    </VStack>
  )
}
