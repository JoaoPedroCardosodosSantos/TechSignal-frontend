'use client'

import React from "react"

/**
 * Componente NewsModal
 * Modal centralizado para exibir detalhes completos da noticia
 * Fecha ao clicar fora ou no botao de fechar
 */

import { useEffect, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { NewsItem } from '@/types/news'

interface NewsModalProps {
  news: NewsItem | null
  onClose: () => void
}

export function NewsModal({ news, onClose }: NewsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Fecha modal ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (news) {
      document.addEventListener('keydown', handleEscape)
      // Previne scroll do body quando modal esta aberto
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [news, onClose])

  // Fecha ao clicar no backdrop (fora do modal)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!news) return null

  // Formata a data de publicacao
  const formattedDate = new Date(news.published_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Container do modal */}
      <div 
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-xl animate-slide-up"
      >
        {/* Botao de fechar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-background/80 hover:bg-background"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Conteudo com scroll */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Imagem de destaque */}
          <div 
            className="relative h-64 w-full bg-cover bg-center sm:h-80"
            style={{ backgroundImage: `url(${news.image_url})` }}
          >
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            
            {/* Tag */}
            <span className="absolute bottom-4 left-6 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
              {news.tag}
            </span>
          </div>

          {/* Conteudo textual */}
          <div className="p-6 sm:p-8">
            {/* Titulo */}
            <h2 
              id="modal-title"
              className="mb-2 text-2xl font-bold leading-tight text-card-foreground sm:text-3xl"
            >
              {news.title}
            </h2>

            {/* Subtitulo/Resumo */}
            <p className="mb-4 text-lg text-muted-foreground">
              {news.summary}
            </p>

            {/* Data de publicacao */}
            <time 
              dateTime={news.published_at}
              className="mb-6 block text-sm text-muted-foreground"
            >
              Publicado em {formattedDate}
            </time>

            {/* Descricao completa */}
            <div className="prose prose-sm max-w-none text-card-foreground">
              <p className="leading-relaxed">
                {news.content}
              </p>
            </div>

            {/* Botao "Ler mais" */}
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg"
                className="gap-2"
                onClick={() => window.open(`/news/${news.slug}`, '_blank')}
              >
                Ler mais
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
