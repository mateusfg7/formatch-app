import { Box, HStack, Image, Text } from 'native-base'
import { ImageBackground } from 'react-native'

interface Props {
  title: string
  imageBannerUrl: string
  adMeta?: {
    adName: string
    adLogoUrl: string
    adWebsiteUrl: string
  }
}

export function ArticleCard({ title, imageBannerUrl, adMeta }: Props) {
  return (
    <Box h='40' borderRadius='3xl' overflow='hidden' mb='5' shadow='9'>
      <ImageBackground
        source={{ uri: imageBannerUrl }}
        resizeMode='cover'
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          h='full'
          px='3'
          justifyContent='flex-end'
          bg={{
            linearGradient: {
              colors: ['transparent', 'complement.500'],
              start: [0, 0],
              end: [0, 1.2],
            },
          }}
        >
          {adMeta ? (
            <HStack h='20' alignItems='center' justifyContent='space-between'>
              <Text
                fontFamily='bold'
                fontSize='xl'
                color='background.200'
                flex={1}
              >
                {title}
              </Text>
              <Image
                source={{
                  uri: adMeta.adLogoUrl,
                }}
                alt='mateusfg7'
                size='md'
                h='20'
                w='24'
                resizeMode='contain'
              />
            </HStack>
          ) : (
            <HStack h='20' alignItems='center' justifyContent='space-between'>
              <Text
                fontFamily='regular'
                fontSize='xl'
                color='background.200'
                flex={1}
              >
                {title}
              </Text>
            </HStack>
          )}
        </Box>
      </ImageBackground>
    </Box>
  )
}
