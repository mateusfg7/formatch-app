import { useState } from 'react'
import { Box, Image, ScrollView, Text, useTheme, VStack } from 'native-base'
import type { RouteProp } from '@react-navigation/native'
import Markdown from 'react-native-markdown-display'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import { Header } from '../components/Header'
import { Title } from '../components/Title'

interface Props {
  route: RouteProp<{ params: { article: ArticleData } }, 'params'>
}

export function ArticleContent({ route }: Props) {
  const {
    params: { article },
  } = route

  const [scrollPosition, setScrollPosition] = useState(0)

  const { colors, fonts, fontSizes, sizes } = useTheme()

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollPosition(event.nativeEvent.contentOffset.y)
  }

  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header
        showBackButton
        navigateToScreen='feed.home'
        title={scrollPosition >= 63 ? article.title : ''}
      />
      <ScrollView onScroll={handleScroll}>
        <Title text={scrollPosition < 63 ? article.title : ''} />
        <Box px='5' pb='40' w='full'>
          <Image
            source={{ uri: article.banner_url }}
            alt=''
            width='full'
            height={sizes[40]}
            borderRadius='3xl'
            borderWidth='2'
            borderColor='complement.500'
            mb='3'
          />
          <Markdown
            style={{
              body: {
                color: colors.complement[500],
                fontFamily: fonts.regular,
                fontSize: fontSizes.xl,
                textAlign: 'center',
                marginBottom: sizes[10],
              },
            }}
          >
            {article.content}
          </Markdown>
          {article.sources && (
            <Box mb='10'>
              <Text fontSize='2xl'>Fontes</Text>
              {article.sources.map((source) => (
                <Text key={source} fontSize='md'>
                  {source}
                </Text>
              ))}
            </Box>
          )}
          {article.AdMeta && (
            <Box
              borderWidth='3'
              borderColor='complement.500'
              borderRadius='3xl'
              alignItems='center'
              justifyContent='center'
              p='10'
            >
              <Text fontSize='2xl' fontFamily='bold' textAlign='center' mb='10'>
                {article.AdMeta.name}
              </Text>
              <Text fontSize='2xl' fontFamily='regular'>
                {article.AdMeta.website_url}
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </VStack>
  )
}
