import { Box, Image, Pressable, IBoxProps, HStack, useTheme } from 'native-base'
import {
  UserFocus as UserFocusIcon,
  WarningCircle,
} from 'phosphor-react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Text } from 'native-base'

interface Props extends IBoxProps {
  onChange: (...event: any[]) => void
  errorMessage: string
}

export function ImagePicker({ onChange, errorMessage, ...styles }: Props) {
  const [image, setImage] = useState(null)

  const { colors, sizes } = useTheme()

  function handleSetImage(uri: string) {
    setImage(uri)
    onChange(uri)
  }

  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    })

    if (!result.canceled) {
      handleSetImage(result.assets[0].uri)
    }
  }

  const invalid = !!errorMessage

  return (
    <Box mb='4' alignItems='center' justifyContent='center' {...styles}>
      <Pressable onPress={pickImage} _pressed={{ opacity: 0.5 }}>
        <Box
          w={image ? '40' : '32'}
          h={image ? '40' : '32'}
          alignItems='center'
          justifyContent='center'
          borderWidth='1'
          borderColor={invalid ? 'error.600' : 'complement.500'}
          borderRadius='3xl'
          overflow='hidden'
        >
          <Box position='absolute' zIndex='1000'>
            <UserFocusIcon size={70} weight='thin' />
          </Box>
          {image && (
            <Image
              source={{ uri: image }}
              alt='Profile picture'
              opacity='0.5'
              w='full'
              h='full'
            />
          )}
        </Box>
      </Pressable>
      {invalid && (
        <HStack alignItems='center'>
          <Box mr='1'>
            <WarningCircle color={colors.error[600]} size={sizes['4']} />
          </Box>
          <Text color='error.600'>{errorMessage}</Text>
        </HStack>
      )}
    </Box>
  )
}
