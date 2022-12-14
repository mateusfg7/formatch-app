import type { RouteProp } from '@react-navigation/native'
import {
  Box,
  Image,
  ScrollView,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { useEffect, useState } from 'react'
import Markdown from 'react-native-markdown-display'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { Warning } from 'phosphor-react-native'

import { Header } from '../components/Header'
import { Title } from '../components/Title'

import articles from '../assets/articles.json'
import { api } from '../services/api'

interface Props {
  route: RouteProp<{ params: { slug: string } }, 'params'>
}

export function ArticleContent({ route }: Props) {
  const [articleData, setArticleData] = useState<IArticle>()
  const [articleRequestStatus, setArticleRequestStatus] = useState<
    'LOADING' | 'ERROR' | 'LOADED'
  >('LOADING')
  const [scrollPosition, setScrollPosition] = useState(0)

  const { slug } = route.params
  const articleBySlug = articles.filter((article) => article.slug === slug)[0]

  const { colors, fonts, fontSizes, sizes } = useTheme()

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollPosition(event.nativeEvent.contentOffset.y)
  }

  useEffect(() => {
    async function makeRequest() {
      setArticleRequestStatus('LOADING')

      const request = await api.get<IArticle>(`/article/${slug}`)

      if (request.status != 200 || !request.data)
        setArticleRequestStatus('ERROR')
      else {
        setArticleData(request.data)
        setArticleRequestStatus('LOADED')
      }
    }
    makeRequest()
  }, [slug])
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header
        showBackButton
        navigateToScreen='feed'
        title={
          scrollPosition >= 63 && articleRequestStatus === 'LOADED'
            ? articleData.title
            : ''
        }
      />
      <ScrollView onScroll={handleScroll}>
        {scrollPosition >= 63 && <Title text='' />}
        {scrollPosition < 63 && articleRequestStatus === 'LOADED' && (
          <Title text={articleData.title} />
        )}
        <Box px='5' pb='40' w='full'>
          {articleRequestStatus === 'LOADING' && (
            <Box
              w='full'
              h='48'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
            >
              <Spinner mr='3' color='complement.500' />
              <Text fontSize='2xl' fontFamily='regular'>
                Carregando artigo
              </Text>
            </Box>
          )}

          {articleRequestStatus === 'ERROR' && (
            <Box w='full' py='10'>
              <Box
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
              >
                <Warning
                  style={{ marginRight: sizes[3] }}
                  color={colors.red[700]}
                />
                <Text fontSize='2xl' fontFamily='regular' color='red.700'>
                  Erro ao carregar artigo!
                </Text>
              </Box>
              <Text
                fontSize='2xl'
                fontFamily='bold'
                color='complement.500'
                mt='10'
              >
                Artigo:
              </Text>
              <Text fontSize='2xl' fontFamily='regular' color='complement.500'>
                {route.params.slug}
              </Text>
            </Box>
          )}

          {articleRequestStatus === 'LOADED' && (
            <>
              <Image
                source={{ uri: articleBySlug.bannerUrl }}
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
                    marginBottom: sizes[24],
                  },
                }}
              >
                {articleData.content}
              </Markdown>
              {articleData.adMeta && (
                <Box
                  borderWidth='3'
                  borderColor='complement.500'
                  borderRadius='3xl'
                  alignItems='center'
                  justifyContent='center'
                  p='10'
                >
                  <Text
                    fontSize='2xl'
                    fontFamily='bold'
                    textAlign='center'
                    mb='10'
                  >
                    {articleData.adMeta.adName}
                  </Text>
                  <Text fontSize='2xl' fontFamily='regular'>
                    {articleData.adMeta.adWebsiteUrl}
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </ScrollView>
    </VStack>
  )
}
