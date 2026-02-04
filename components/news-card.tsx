'use client'

/**
 * Componente NewsCard
 * Card individual de noticia com data externa, imagem de fundo,
 * tag no canto superior direito, titulo e resumo com "... ler mais"
 */

import type { NewsItem } from '@/types/news'

interface NewsCardProps {
  news: NewsItem
  onClick: () => void
  index: number
}

export function NewsCard({ news, onClick, index }: NewsCardProps) {
  // Formata a data de publicacao
  const formattedDate = new Date(news.published_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <article 
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Data acima do card (fora) */}
      <time 
        dateTime={news.published_at}
        className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        {formattedDate}
      </time>

      {/* Card principal */}
      <div 
        className="relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
        onClick={onClick}
      >
        {/* Imagem de fundo */}
        <div 
          className="relative h-48 bg-cover bg-center sm:h-56"
          style={{ backgroundImage: `url(${news.image_url})` }}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Tag no canto superior direito */}
          <span className="absolute right-3 top-3 rounded-md bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {news.tag}
          </span>
        </div>

        {/* Conteudo do card */}
        <div className="bg-card p-4">
          {/* Titulo */}
          <h3 className="mb-2 text-lg font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary line-clamp-2">
            {news.title}
          </h3>

          {/* Resumo com "... ler mais" */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {news.summary.length > 100 
              ? `${news.summary.substring(0, 100)}...` 
              : news.summary}
            <span className="ml-1 font-medium text-primary transition-colors group-hover:text-accent">
              ler mais
            </span>
          </p>
        </div>
      </div>
    </article>
  )
}
