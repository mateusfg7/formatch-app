import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Center,
  ScrollView,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { AxiosError } from 'axios'

import { api } from '../services/api'
import { feedbackToast } from '../utils/feedbackToast'

import { AxiosRequestErrorInfo } from './AxiosRequestErrorInfo'
import { ArticleCard } from './ArticleCard'

import FileSearchingRafiki from '../assets/file-searching-rafiki.svg'
import { Header } from './Header'
import { Title } from './Title'
import { RefreshControl } from 'react-native'
import { AdBanner } from './AdBanner'

export function ArticleList() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [articles, setArticles] = useState<ArticleData[] | undefined>()
  const [refreshing, setRefreshing] = useState(false)

  const { sizes } = useTheme()

  async function fetchArticles() {
    await api
      .get<ArticleData[]>('/article/list')
      .then((response) => setArticles(response.data))
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error))
        setError(error)
        feedbackToast(
          'ERROR',
          'Ocorreu um erro durante o carregamento de artigos'
        )
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchArticles().finally(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <Title text='Novidades e dicas' />

      <VStack pb={sizes[22] * 2} px='5'>
        {isLoading && (
          <Center flex='1' py='20'>
            <Spinner size='lg' color='complement.500' />
          </Center>
        )}
        {!isLoading && articles && (
          <>
            <AdBanner />

            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))
            ) : (
              <Center py='20'>
                <Box opacity='0.7' mb='3'>
                  <FileSearchingRafiki width='230' height='177.56' />
                </Box>
                <Text fontSize='lg' color='complement.300' bold>
                  Sem artigos disponíveis
                </Text>
              </Center>
            )}
          </>
        )}

        {!isLoading && error && !articles && (
          <AxiosRequestErrorInfo error={error} />
        )}
        {!error && !isLoading && !articles && (
          <Text>Erro ao carregar artigos.</Text>
        )}
      </VStack>
    </ScrollView>
  )
}
