interface IArticle {
  slug: string
  title: string
  bannerUrl: string
  adMeta?: {
    adLogoUrl: string
    adName: string
    adWebsiteUrl: string
  }
  content?: string
}
