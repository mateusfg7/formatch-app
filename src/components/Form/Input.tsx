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
import { Icon, WarningCircle } from 'phosphor-react-native'
import { useState } from 'react'

interface Props {
  label: string
  IconComponent: Icon
  errorMessage?: string | null
  isInvalid?: boolean
  styles?: StyledProps
  inputProps?: IInputProps
}

export function Input({
  label,
  IconComponent,
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
      borderWidth='1'
      borderColor={
        invalid ? 'error.600' : isFocused ? 'primary.400' : 'complement.500'
      }
      borderRadius='3xl'
      p='3'
      bg={isFocused ? 'rgba(0, 12, 124, 0.02)' : 'background.200'}
      {...styles}
    >
      <VStack flex='1'>
        <Text color='complement.400' fontSize='md' mb='1'>
          {label}
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
        <IconComponent
          size={sizes['10']}
          color={invalid ? colors.error[600] : colors.primary[400]}
        />
      </Center>
    </HStack>
  )
}
