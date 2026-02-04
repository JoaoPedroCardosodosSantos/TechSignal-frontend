'use client'

/**
 * Pagina Principal - TechPulse Blog
 * Homepage do blog de noticias de tecnologia
 * Consome dados via fetch de /api/news
 */

import { useState } from 'react'
import useSWR from 'swr'
import { Navbar } from '@/components/navbar'
import { NewsCarousel } from '@/components/news-carousel'
import { NewsCard } from '@/components/news-card'
import { NewsModal } from '@/components/news-modal'
import { ContactForm } from '@/components/contact-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw } from 'lucide-react'
import type { NewsItem } from '@/types/news'

// Fetcher para SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

// Quantidade inicial de cards exibidos
const INITIAL_CARDS_COUNT = 6
// Quantidade de cards adicionados ao clicar em "Carregar mais"
const LOAD_MORE_COUNT = 4

export default function HomePage() {
  // Busca dados da API com SWR
  const { data: news, error, isLoading, mutate } = useSWR<NewsItem[]>('/api/news', fetcher)
  
  // Controle do modal de noticia
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  
  // Controle de quantos cards exibir
  const [visibleCount, setVisibleCount] = useState(INITIAL_CARDS_COUNT)
  
  // Estado de carregamento ao carregar mais
  const [isLoadingMore, setIsLoadingMore] = useState(false)

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
    setIsLoadingMore(true)
    // Simula delay para UX
    await new Promise(resolve => setTimeout(resolve, 500))
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, news?.length || 0))
    setIsLoadingMore(false)
  }

  // Noticias visiveis (excluindo as 5 do carousel)
  const carouselNews = news?.slice(0, 5) || []
  const gridNews = news?.slice(5) || []
  const visibleGridNews = gridNews.slice(0, visibleCount)
  const hasMoreNews = visibleCount < gridNews.length

  // Estado de erro
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-lg text-muted-foreground">
          Erro ao carregar noticias
        </p>
        <Button onClick={() => mutate()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegacao */}
      <Navbar />

      {/* Estado de carregamento inicial */}
      {isLoading ? (
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Carregando noticias...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Carousel de destaques */}
          <NewsCarousel 
            news={carouselNews} 
            onNewsClick={handleNewsClick} 
          />

          {/* Conteudo principal - 2 colunas no desktop */}
          <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Coluna esquerda - Grid de noticias */}
              <section className="flex-1" id="news">
                {/* Cabecalho da secao */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    Ultimas Noticias
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fique por dentro das novidades do mundo tech
                  </p>
                </div>

                {/* Grid de cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {visibleGridNews.map((newsItem, index) => (
                    <NewsCard
                      key={newsItem.id}
                      news={newsItem}
                      onClick={() => handleNewsClick(newsItem)}
                      index={index}
                    />
                  ))}
                </div>

                {/* Botao "Carregar mais" */}
                {hasMoreNews && (
                  <div className="mt-8 flex justify-center">
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
                  </div>
                )}

                {/* Indicador de fim das noticias */}
                {!hasMoreNews && gridNews.length > 0 && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      Voce visualizou todas as noticias
                    </p>
                  </div>
                )}
              </section>

              {/* Coluna direita - Formulario de contato (sticky) */}
              <div className="w-full lg:w-80 xl:w-96">
                <ContactForm />
              </div>
            </div>
          </main>
        </>
      )}

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
