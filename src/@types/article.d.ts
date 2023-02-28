interface ArticleData {
  title: string
  slug: string
  banner_url: string
  content: string
  createdAt: string
  sources?: string[]
  AdMeta?: {
    name: string
    logo_url: string
    website_url: string
  }
}
