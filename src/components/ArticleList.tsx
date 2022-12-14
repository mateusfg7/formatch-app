import { useTheme, VStack } from 'native-base'

import articles from '../assets/articles.json'
import { ArticleCard } from './ArticleCard'

export function ArticleList() {
  const { sizes } = useTheme()

  return (
    <VStack pb={sizes[22] * 2} px='5'>
      {articles.map((article) => {
        if (article.adMeta) {
          return (
            <ArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              imageBannerUrl={article.bannerUrl}
              adMeta={article.adMeta}
            />
          )
        } else {
          return (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              imageBannerUrl={article.bannerUrl}
            />
          )
        }
      })}
    </VStack>
  )
}
