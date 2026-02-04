'use client'

/**
 * Componente NewsCarousel
 * Carousel de noticias em destaque com autoplay e navegacao por setas
 * Exibe 5 noticias com imagem de fundo, titulo e descricao
 */

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { NewsItem } from '@/types/news'

interface NewsCarouselProps {
  news: NewsItem[]
  onNewsClick: (news: NewsItem) => void
}

export function NewsCarousel({ news, onNewsClick }: NewsCarouselProps) {
  // Indice do slide atual
  const [currentIndex, setCurrentIndex] = useState(0)
  // Controle de pausa do autoplay (quando usuario interage)
  const [isPaused, setIsPaused] = useState(false)
  
  // Pega apenas as 5 primeiras noticias para o carousel
  const carouselNews = news.slice(0, 5)

  // Funcao para ir ao proximo slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselNews.length)
  }, [carouselNews.length])

  // Funcao para ir ao slide anterior
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselNews.length) % carouselNews.length)
  }, [carouselNews.length])

  // Autoplay - troca de slide a cada 5 segundos
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  // Pausa autoplay temporariamente quando usuario interage
  const handleUserInteraction = (action: () => void) => {
    setIsPaused(true)
    action()
    // Retoma autoplay apos 10 segundos de inatividade
    setTimeout(() => setIsPaused(false), 10000)
  }

  if (carouselNews.length === 0) return null

  return (
    <section className="relative w-full overflow-hidden">
      {/* Container do carousel */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        {carouselNews.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Imagem de fundo com overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image_url})` }}
            >
              {/* Overlay gradiente para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Conteudo do slide */}
            <div className="relative flex h-full items-end">
              <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="max-w-2xl animate-slide-up">
                  {/* Tag da categoria */}
                  <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {item.tag}
                  </span>
                  
                  {/* Titulo clicavel */}
                  <h2 
                    className="mb-3 cursor-pointer text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl hover:text-primary transition-colors"
                    onClick={() => onNewsClick(item)}
                  >
                    {item.title}
                  </h2>
                  
                  {/* Resumo */}
                  <p className="text-sm text-muted-foreground sm:text-base lg:text-lg line-clamp-2">
                    {item.summary}
                  </p>
                  
                  {/* Data de publicacao */}
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(item.published_at).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botoes de navegacao */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
        onClick={() => handleUserInteraction(prevSlide)}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
        onClick={() => handleUserInteraction(nextSlide)}
        aria-label="Proximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicadores de slide */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {carouselNews.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
            onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
