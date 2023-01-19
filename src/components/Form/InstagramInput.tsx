import { useState } from 'react'
import {
  HStack,
  Text,
  VStack,
  Input as NativeBaseInput,
  Center,
  Box,
  useTheme,
  StyledProps,
  IInputProps,
} from 'native-base'
import MaskedView from '@react-native-masked-view/masked-view'
import { InstagramLogo } from 'phosphor-react-native'

interface Props {
  styles?: StyledProps
  inputProps?: IInputProps
}

export function InstagramInput({ styles, inputProps }: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const { sizes } = useTheme()

  function toggleFocus() {
    setIsFocused(!isFocused)
  }

  const gradient_codes = ['#fccc63', '#fbad50', '#cd486b', '#8a3ab9']

  return (
    <Box
      p='0.5'
      borderRadius='3xl'
      overflow='hidden'
      bg={{
        linearGradient: {
          colors: gradient_codes,
          start: [0, 0.9],
          end: [0.5, 0],
        },
      }}
      {...styles}
    >
      <HStack
        p='3'
        borderRadius='3xl'
        bg={isFocused ? 'rgba(252, 253, 254, 0.94)' : 'background.200'}
      >
        <VStack flex='1'>
          <MaskedView
            maskElement={
              <Text fontSize='md' mb='1'>
                Instagram
              </Text>
            }
          >
            <Box
              h='7'
              w='full'
              bg={{
                linearGradient: {
                  colors: gradient_codes,
                  start: [0, 0.9],
                  end: [0.5, 0],
                },
              }}
            />
          </MaskedView>

          <NativeBaseInput
            variant='unstyled'
            type='text'
            p='0'
            fontSize='xl'
            placeholderTextColor='complement.300'
            color='complement.500'
            onFocus={toggleFocus}
            onEndEditing={toggleFocus}
            {...inputProps}
          />
        </VStack>
        <Center ml='3'>
          <MaskedView
            style={{
              width: sizes['10'],
              height: sizes['10'],
            }}
            maskElement={<InstagramLogo size={sizes['10']} />}
          >
            <Box
              h='10'
              w='10'
              bg={{
                linearGradient: {
                  colors: gradient_codes,
                  start: [0, 0.9],
                  end: [0.5, 0],
                },
              }}
            />
          </MaskedView>
        </Center>
      </HStack>
    </Box>
  )
}
