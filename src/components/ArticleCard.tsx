import { Box, HStack, Image, Pressable, Text } from 'native-base'
import { ImageBackground } from 'react-native'
import { feedNavigation } from '../utils/typedNavigation'

interface Props {
  article: ArticleData
}

export function ArticleCard({ article }: Props) {
  const { navigate } = feedNavigation()

  function handleClick() {
    navigate('feed.article', { article })
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
                <HStack
                  py='2'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Text
                    fontFamily={article.AdMeta ? 'bold' : 'regular'}
                    fontSize='xl'
                    color='background.200'
                    flex={1}
                  >
                    {article.title}
                  </Text>
                  {article.AdMeta && (
                    <Image
                      source={{
                        uri: article.AdMeta.logo_url,
                      }}
                      alt=''
                      size='md'
                      h='20'
                      w='24'
                      resizeMode='contain'
                    />
                  )}
                </HStack>
              </Box>
            </ImageBackground>
          </Box>
        )
      }}
    </Pressable>
  )
}
