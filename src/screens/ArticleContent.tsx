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

interface Props {
  route: RouteProp<{ params: { slug: string } }, 'params'>
}

export function ArticleContent({ route }: Props) {
  const [articleText, setArticleText] = useState('Carregando artigo...')
  const [errorLog, setErrorLog] = useState('')
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
      await fetch(`http://192.168.1.4:3333/art/${slug}`)
        .then((res) => res.json())
        .then((res) => {
          setArticleText(res.content)
          setArticleRequestStatus('LOADED')
        })
        .catch((err) => {
          setArticleRequestStatus('ERROR')
          setErrorLog(String(err))
          console.log(err)
        })
    }
    makeRequest()
  }, [slug])
  return (
    <VStack flex={1} backgroundColor='background.500'>
      <Header
        showBackButton
        navigateToScreen='feed'
        title={scrollPosition >= 63 ? articleBySlug.title : ''}
      />
      <ScrollView onScroll={handleScroll}>
        {scrollPosition >= 63 && <Title text='' />}
        {scrollPosition < 63 && articleRequestStatus === 'LOADED' && (
          <Title text={articleBySlug.title} />
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
                {articleBySlug.slug}
              </Text>
              <Text
                fontSize='2xl'
                fontFamily='bold'
                color='complement.500'
                mt='10'
              >
                Erro:
              </Text>
              <Text fontSize='2xl' fontFamily='regular' color='complement.500'>
                {errorLog}
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
                {articleText}
              </Markdown>
              {articleBySlug.adMeta && (
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
                    {articleBySlug.adMeta.adName}
                  </Text>
                  <Text fontSize='2xl' fontFamily='regular'>
                    {articleBySlug.adMeta.adWebsiteUrl}
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
