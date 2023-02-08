import { useEffect, useState } from 'react'
import { Box, Center, Spinner, Text, useTheme, VStack } from 'native-base'

import { ArticleCard } from './ArticleCard'

import FileSearchingRafiki from '../assets/file-searching-rafiki.svg'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { feedbackToast } from '../utils/feedbackToast'
import { AxiosRequestErrorInfo } from './AxiosRequestErrorInfo'

interface ArticleData {
  title: string
  slug: string
  banner_url: string
  content: string
  createdAt: string
  AdMeta?: {
    name: string
    logo_url: string
    website_url: string
  }
}

export function ArticleList() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [articles, setArticles] = useState<ArticleData[] | undefined>()

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

  return (
    <VStack pb={sizes[22] * 2} px='5'>
      {isLoading && (
        <Center flex='1' py='20'>
          <Spinner size='lg' color='complement.500' />
        </Center>
      )}
      {!error &&
        !isLoading &&
        articles &&
        (articles.length > 0 ? (
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
        ))}

      {!isLoading && error && <AxiosRequestErrorInfo error={error} />}
      {!error && !isLoading && !articles && (
        <Text>Erro ao carregar artigos.</Text>
      )}
    </VStack>
  )
}
