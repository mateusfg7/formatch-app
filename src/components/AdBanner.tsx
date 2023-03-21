import { Box, HStack, Pressable, Text, VStack, useTheme } from 'native-base'
import { Newspaper } from 'phosphor-react-native'

import { useAuth } from '../hooks/useAuth'
import { optionsNavigation } from '../utils/typedNavigation'

export function AdBanner() {
  const { user } = useAuth()
  const { colors, fontSizes } = useTheme()

  const navigator = optionsNavigation()

  if (user.subscribe) return <></>
  else {
    return (
      <Pressable onPress={() => navigator.navigate('options.premium')}>
        {({ isPressed }) => {
          return (
            <VStack
              borderRadius='3xl'
              overflow='hidden'
              my='5'
              p='9'
              shadow='9'
              bg={isPressed ? 'primary.400' : 'primary.500'}
            >
              <HStack alignItems='center' justifyContent='space-around'>
                <Text
                  fontFamily='regular'
                  fontSize='2xl'
                  color='secondary.500'
                  bold
                >
                  Anúncio
                </Text>
                <Box>
                  <Newspaper
                    color={colors['secondary']['500']}
                    weight='bold'
                    size={fontSizes['3xl']}
                  />
                </Box>
              </HStack>
            </VStack>
          )
        }}
      </Pressable>
    )
  }
}
