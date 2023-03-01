import { Box, HStack, Pressable, Text, VStack, useTheme } from 'native-base'
import { Envelope, InstagramLogo } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { feedbackToast } from '../../utils/feedbackToast'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

export function Contact() {
  const { fontSizes } = useTheme()

  const copyToClipboard = async (title: string, text: string) => {
    await Clipboard.setStringAsync(text)

    const lowerTitle = title.toLowerCase()
    const parsedTitle = lowerTitle[0].toUpperCase() + lowerTitle.slice(1)

    feedbackToast('INFO', `${parsedTitle} copiado!`)
  }

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header showBackButton />
      <Title text='Contate-nos' />
      <VStack px='5' py='6' flex='1'>
        {/* TODO: add some cool text about us and our contact channels. */}
        <VStack space='2' mb='10'>
          <HStack alignItems='center' space='2'>
            <Box>
              <Envelope weight='duotone' size={fontSizes['3xl']} />
            </Box>
            <Text fontSize='xl'>Email</Text>
          </HStack>
          <Pressable
            onPress={() =>
              copyToClipboard('email', 'mateusfelipefg77@gmail.com')
            }
          >
            <Text fontSize='xl' bold isTruncated>
              mateusfelipefg77@gmail.com
            </Text>
          </Pressable>
        </VStack>
        <VStack space='2'>
          <HStack alignItems='center' space='2'>
            <Box>
              <InstagramLogo weight='duotone' size={fontSizes['3xl']} />
            </Box>
            <Text fontSize='xl'>Instagram</Text>
          </HStack>
          <Pressable
            onPress={() =>
              copyToClipboard('email', 'mateusfelipefg77@gmail.com')
            }
          >
            <Text fontSize='xl' bold isTruncated>
              @formatch.senai
            </Text>
          </Pressable>
        </VStack>
      </VStack>
    </VStack>
  )
}
