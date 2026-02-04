/**
 * Componente ShareButtons
 * Botoes para compartilhar o artigo nas redes sociais
 */

'use client'

import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  // Estado para feedback de copia do link
  const [copied, setCopied] = useState(false)

  // URL completa do artigo (em producao, usar URL real)
  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/noticia/${slug}`
    : `/noticia/${slug}`

  // Texto encodado para compartilhamento
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(articleUrl)

  // Funcao para copiar link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
  }

  // Links de compartilhamento
  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-sky-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700'
    }
  ]

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <span className="text-sm text-muted-foreground mr-2">Compartilhar:</span>
      
      {/* Botoes de redes sociais */}
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          className={`text-muted-foreground transition-colors ${link.color}`}
          asChild
        >
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Compartilhar no ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}

      {/* Botao de copiar link */}
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-primary"
        onClick={copyLink}
        aria-label="Copiar link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
