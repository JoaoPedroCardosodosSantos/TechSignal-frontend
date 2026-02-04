/**
 * Tipagem para itens de noticia
 * Utilizado em toda a aplicacao para consistencia de dados
 */
export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  image_url: string
  tag: string
  published_at: string
  slug: string
}
