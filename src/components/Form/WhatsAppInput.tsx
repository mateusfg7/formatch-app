import {
  FormControl,
  HStack,
  Text,
  VStack,
  Input as NativeBaseInput,
  Center,
  useTheme,
  StyledProps,
  IInputProps,
} from 'native-base'
import { WarningCircle, WhatsappLogo } from 'phosphor-react-native'
import { useState } from 'react'

interface Props {
  errorMessage?: string | null
  isInvalid?: boolean
  styles?: StyledProps
  inputProps?: IInputProps
}

export function WhatsAppInput({
  errorMessage = null,
  isInvalid = false,
  styles,
  inputProps,
}: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const { sizes, colors } = useTheme()

  const invalid = !!errorMessage || isInvalid

  function toggleFocus() {
    setIsFocused(!isFocused)
  }

  return (
    <HStack
      borderWidth='2'
      borderColor={invalid ? 'error.600' : '#075E54'}
      borderRadius='3xl'
      p='3'
      bg={isFocused ? 'rgba(7, 94, 84, 0.05)' : 'background.200'}
      {...styles}
    >
      <VStack flex='1'>
        <Text color='#075E54' fontSize='md' mb='1'>
          Whatsapp
        </Text>
        <FormControl isInvalid={invalid}>
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
          <FormControl.ErrorMessage
            leftIcon={
              <WarningCircle color={colors.error[600]} size={sizes['4']} />
            }
          >
            {errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
      <Center ml='3'>
        <WhatsappLogo
          size={sizes['10']}
          color={invalid ? colors.error[600] : '#075E54'}
        />
      </Center>
    </HStack>
  )
}
