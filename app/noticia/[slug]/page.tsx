/**
 * Pagina dinamica de noticia: /noticia/[slug]
 * Renderiza artigo completo com foco em SEO e leitura
 * Utiliza Server Components para pre-renderizacao e dados dinamicos
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArticleHeader } from '@/components/article/article-header'
import { ArticleImage } from '@/components/article/article-image'
import { ArticleContent } from '@/components/article/article-content'
import { RelatedNews } from '@/components/article/related-news'
import { ShareButtons } from '@/components/article/share-buttons'
import type { NewsItem } from '@/types/news'

// Interface para resposta da API
interface NewsResponse {
  news: NewsItem
  related: NewsItem[]
}

// Tipo para os parametros da pagina dinamica
interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Funcao para buscar dados da noticia
 * Preparada para integracao com backend Laravel
 */
async function getNews(slug: string): Promise<NewsResponse | null> {
  try {
    // Em producao, substituir por URL do backend Laravel
    // const response = await fetch(`${process.env.LARAVEL_API_URL}/api/news/${slug}`, {
    //   headers: {
    //     'Accept': 'application/json',
    //   },
    //   next: { revalidate: 60 } // Cache por 1 minuto
    // })

    // Usando API local para desenvolvimento
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/news/${slug}`, {
      cache: 'no-store' // Em producao, usar revalidate
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao buscar noticia:', error)
    return null
  }
}

/**
 * Gera metadata dinamica para SEO
 * Inclui Open Graph e Twitter Cards
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getNews(slug)

  if (!data) {
    return {
      title: 'Noticia nao encontrada | TechPulse',
      description: 'A noticia que voce procura nao foi encontrada.'
    }
  }

  const { news } = data

  return {
    title: `${news.title} | TechPulse`,
    description: news.summary,
    keywords: [news.tag, 'tecnologia', 'noticias', 'TechPulse'],
    authors: [{ name: 'TechPulse' }],
    openGraph: {
      title: news.title,
      description: news.summary,
      type: 'article',
      publishedTime: news.published_at,
      tags: [news.tag],
      images: [
        {
          url: news.image_url,
          width: 1200,
          height: 630,
          alt: news.title
        }
      ],
      siteName: 'TechPulse',
      locale: 'pt_BR'
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.summary,
      images: [news.image_url]
    },
    alternates: {
      canonical: `/noticia/${news.slug}`
    }
  }
}

/**
 * Componente principal da pagina de noticia
 */
export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const data = await getNews(slug)

  // Redireciona para 404 se noticia nao encontrada
  if (!data) {
    notFound()
  }

  const { news, related } = data

  // Calcula tempo de leitura (aproximadamente 200 palavras por minuto)
  const wordCount = news.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="min-h-screen bg-background">
      {/* Navegacao principal */}
      <Navbar />

      {/* Conteudo principal do artigo */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Cabecalho do artigo */}
        <ArticleHeader
          title={news.title}
          summary={news.summary}
          tag={news.tag}
          publishedAt={news.published_at}
          readTime={readTime}
        />

        {/* Imagem principal */}
        <ArticleImage src={news.image_url} alt={news.title} />

        {/* Conteudo do artigo */}
        <ArticleContent content={news.content} />

        {/* Separador */}
        <hr className="my-8 border-border" />

        {/* Botoes de compartilhamento */}
        <ShareButtons title={news.title} slug={news.slug} />

        {/* Noticias relacionadas */}
        <RelatedNews news={related} />
      </main>

      {/* Rodape */}
      <Footer />

      {/* Toggle de tema */}
      <ThemeToggle />
    </div>
  )
}
