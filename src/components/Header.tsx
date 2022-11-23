import Constants from 'expo-constants'
import { Box, HStack, useTheme } from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

interface Props {
  showBackButton?: boolean
  navigateToScreen?: string
}

export function Header({ showBackButton = false, navigateToScreen }: Props) {
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
    <HStack
      w='full'
      h={Constants.statusBarHeight + sizes[16]}
      pb='3'
      px={'5'}
      alignItems='flex-end'
      justifyContent='space-between'
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

      <EmptyBoxSpace />
      <EmptyBoxSpace />
    </HStack>
  )
}
