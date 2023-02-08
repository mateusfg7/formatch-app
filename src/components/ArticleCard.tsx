import { Box, HStack, Image, Pressable, Text } from 'native-base'
import { ImageBackground } from 'react-native'
import { useTypedNavigation } from '../utils/useTypedNavigation'

interface Props {
  article: ArticleData
}

export function ArticleCard({ article }: Props) {
  const { navigate } = useTypedNavigation()

  function handleClick() {
    navigate('article', { slug: article.slug })
  }

  return (
    <Pressable onPress={() => handleClick()}>
      {({ isPressed }) => {
        return (
          <Box
            borderRadius='3xl'
            overflow='hidden'
            mb='5'
            shadow={isPressed ? '1' : '9'}
          >
            <ImageBackground
              source={{ uri: article.banner_url }}
              resizeMode='cover'
            >
              <Box
                px='3'
                pt='16'
                justifyContent='flex-end'
                bg={
                  isPressed
                    ? {
                        linearGradient: {
                          colors: ['transparent', 'complement.500'],
                          start: [0, 0],
                          end: [0, 1.3],
                        },
                      }
                    : {
                        linearGradient: {
                          colors: ['transparent', 'complement.500'],
                          start: [0, 0.3],
                          end: [0, 1.2],
                        },
                      }
                }
              >
                {article.AdMeta ? (
                  <HStack alignItems='center' justifyContent='space-between'>
                    <Text
                      fontFamily='bold'
                      fontSize='xl'
                      color='background.200'
                      flex={1}
                    >
                      {article.title}
                    </Text>
                    <Image
                      source={{
                        uri: article.AdMeta.logo_url,
                      }}
                      alt='testdsadsaasdasdsa'
                      size='md'
                      h='20'
                      w='24'
                      resizeMode='contain'
                    />
                  </HStack>
                ) : (
                  <HStack
                    h='20'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Text
                      fontFamily='regular'
                      fontSize='xl'
                      color='background.200'
                      flex={1}
                    >
                      {article.title}
                    </Text>
                  </HStack>
                )}
              </Box>
            </ImageBackground>
          </Box>
        )
      }}
    </Pressable>
  )
}
