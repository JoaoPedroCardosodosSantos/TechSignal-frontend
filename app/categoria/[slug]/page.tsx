'use client'

/**
 * Pagina Dinamica de Categoria - /categoria/[slug]
 * Lista noticias filtradas por categoria com animacoes de scroll
 * Reutiliza componentes da Home (NewsCard, NewsModal, etc.)
 */

import { useState, useEffect, useRef, use } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Navbar } from '@/components/navbar'
import { NewsCard } from '@/components/news-card'
import { NewsModal } from '@/components/news-modal'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, ArrowLeft, Tag } from 'lucide-react'
import type { NewsItem } from '@/types/news'

// Interface para resposta da API de categoria
interface CategoryResponse {
  news: NewsItem[]
  category: {
    slug: string
    name: string
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

// Fetcher para SWR com tratamento de erro
const fetcher = async (url: string): Promise<CategoryResponse> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Categoria nao encontrada')
  }
  return res.json()
}

// Quantidade de noticias por pagina
const NEWS_PER_PAGE = 6

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Unwrap params usando React.use()
  const { slug } = use(params)
  
  // Estado para paginacao
  const [page, setPage] = useState(1)
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  // Controle do modal de noticia
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  
  // Ref para observar elementos na viewport (animacao de scroll)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  
  // Busca dados da API com SWR
  const { data, error, isLoading, mutate } = useSWR<CategoryResponse>(
    `/api/news/category/${slug}?page=${page}&limit=${NEWS_PER_PAGE}`,
    fetcher
  )
  
  // Atualiza lista de noticias quando dados chegam
  useEffect(() => {
    if (data?.news) {
      if (page === 1) {
        setAllNews(data.news)
      } else {
        // Adiciona novas noticias sem duplicar
        setAllNews(prev => {
          const existingIds = new Set(prev.map(n => n.id))
          const newNews = data.news.filter(n => !existingIds.has(n.id))
          return [...prev, ...newNews]
        })
      }
      setIsLoadingMore(false)
    }
  }, [data, page])
  
  // Configura Intersection Observer para animacoes de scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0', 10)
            setVisibleCards(prev => new Set(prev).add(id))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )
    
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])
  
  // Observa novos cards quando sao adicionados
  useEffect(() => {
    const cards = document.querySelectorAll('[data-news-card]')
    cards.forEach((card) => {
      observerRef.current?.observe(card)
    })
    
    return () => {
      cards.forEach((card) => {
        observerRef.current?.unobserve(card)
      })
    }
  }, [allNews])
  
  // Handler para abrir modal
  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
  }
  
  // Handler para fechar modal
  const handleCloseModal = () => {
    setSelectedNews(null)
  }
  
  // Handler para carregar mais noticias
  const handleLoadMore = async () => {
    if (data?.pagination.hasMore) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }
  
  // Estado de erro - categoria nao encontrada
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
          <div className="rounded-full bg-muted p-6">
            <Tag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Categoria nao encontrada
            </h1>
            <p className="text-muted-foreground">
              A categoria &quot;{slug}&quot; nao existe ou foi removida.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Home
              </Link>
            </Button>
            <Button onClick={() => mutate()} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Tentar novamente
            </Button>
          </div>
        </div>
        <Footer />
        <ThemeToggle />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegacao */}
      <Navbar />
      
      {/* Cabecalho da categoria */}
      <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Breadcrumb / Voltar */}
          <Link 
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
          
          {/* Titulo da categoria com animacao */}
          <div className="animate-fade-in">
            {isLoading ? (
              <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
            ) : (
              <>
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-lg bg-primary/20 px-3 py-1.5 text-sm font-semibold text-primary">
                    Categoria
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {data?.pagination.total || 0} {(data?.pagination.total || 0) === 1 ? 'noticia' : 'noticias'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                  {data?.category.name}
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Confira todas as noticias sobre {data?.category.name.toLowerCase()} e fique por dentro das ultimas novidades.
                </p>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Conteudo principal */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Estado de carregamento inicial */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Skeleton loading para cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="mb-2 h-4 w-24 rounded bg-muted" />
                <div className="overflow-hidden rounded-xl">
                  <div className="h-48 bg-muted sm:h-56" />
                  <div className="bg-card p-4">
                    <div className="mb-2 h-6 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="mt-1 h-4 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : allNews.length === 0 ? (
          /* Estado vazio - sem noticias na categoria */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6">
              <Tag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-foreground">
              Nenhuma noticia encontrada
            </h2>
            <p className="mt-2 text-muted-foreground">
              Ainda nao temos noticias nesta categoria. Volte em breve!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">
                Ver todas as noticias
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Grid de cards com animacao de scroll */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allNews.map((newsItem, index) => (
                <div
                  key={newsItem.id}
                  data-news-card
                  data-id={newsItem.id}
                  className={`transition-all duration-500 ${
                    visibleCards.has(newsItem.id)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${(index % 3) * 100}ms`
                  }}
                >
                  <NewsCard
                    news={newsItem}
                    onClick={() => handleNewsClick(newsItem)}
                    index={0} // Index 0 para desabilitar animacao interna (usamos a externa)
                  />
                </div>
              ))}
            </div>
            
            {/* Botao "Carregar mais" ou indicador de fim */}
            <div className="mt-12 flex flex-col items-center gap-4">
              {data?.pagination.hasMore ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="min-w-[200px] bg-transparent"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    'Carregar mais'
                  )}
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Voce visualizou todas as {data?.pagination.total} noticias desta categoria
                  </p>
                </div>
              )}
              
              {/* Indicador de paginas */}
              {data && data.pagination.totalPages > 1 && (
                <p className="text-xs text-muted-foreground">
                  Pagina {page} de {data.pagination.totalPages}
                </p>
              )}
            </div>
          </>
        )}
      </main>
      
      {/* Rodape */}
      <Footer />
      
      {/* Botao de alternancia de tema */}
      <ThemeToggle />
      
      {/* Modal de detalhes da noticia */}
      <NewsModal 
        news={selectedNews} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}
