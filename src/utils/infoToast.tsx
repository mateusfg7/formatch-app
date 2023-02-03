import { Box, HStack, Text, Toast } from 'native-base'
import { Info, Warning, XCircle } from 'phosphor-react-native'

type ToastType = 'ERROR' | 'WARNING' | 'INFO'

type Data = {
  [key in ToastType]: {
    mainColor: string
    bgColor: string
  }
}

export function feedbackToast(type: ToastType, message: string) {
  const data: Data = {
    ERROR: {
      mainColor: '#991b1b',
      bgColor: '#fee2e2',
    },
    INFO: {
      mainColor: '#0c4a6e',
      bgColor: '#e0f2fe',
    },
    WARNING: {
      mainColor: '#7c2d12',
      bgColor: '#ffedd5',
    },
  }

  Toast.show({
    render: () => (
      <Box maxW='full' px='1'>
        <HStack
          borderWidth={1}
          borderColor={data[type].mainColor}
          bg={data[type].bgColor}
          borderRadius='2xl'
          p='3'
          alignItems='center'
          justifyContent='space-between'
          maxW='full'
        >
          {type === 'INFO' && <Info color={data[type].mainColor} />}
          {type === 'WARNING' && <Warning color={data[type].mainColor} />}
          {type === 'ERROR' && <XCircle color={data[type].mainColor} />}

          <Box maxW='full' p='1'>
            <Text
              fontSize='md'
              color={data[type].mainColor}
              ml='3'
              textBreakStrategy='highQuality'
            >
              {message}
            </Text>
          </Box>
        </HStack>
      </Box>
    ),
  })
}
