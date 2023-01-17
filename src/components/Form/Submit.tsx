import { HStack } from 'native-base'
import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  Box,
  useTheme,
} from 'native-base'
import { IdentificationBadge } from 'phosphor-react-native'

export function Submit({ disabled = false, ...rest }: IButtonProps) {
  const { colors, fontSizes } = useTheme()

  return (
    <NativeBaseButton
      my='5'
      px='12'
      py='8'
      bg={disabled ? 'rgba(84, 84, 87, 0.07)' : 'primary.800'}
      borderWidth='2'
      borderColor={disabled ? 'complement.400' : 'primary.500'}
      borderRadius='3xl'
      disabled={disabled}
      _pressed={{
        bg: 'primary.700',
      }}
      {...rest}
    >
      <HStack alignItems='center'>
        <Box mr='3'>
          <IdentificationBadge
            size={fontSizes['4xl']}
            color={disabled ? colors.complement[400] : colors.primary[500]}
            weight='duotone'
          />
        </Box>
        <Text
          color={disabled ? 'complement.400' : 'primary.500'}
          fontSize='xl'
          fontFamily='bold'
        >
          CADASTRAR
        </Text>
      </HStack>
    </NativeBaseButton>
  )
}
