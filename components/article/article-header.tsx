/**
 * Componente ArticleHeader
 * Cabecalho do artigo com titulo, subtitulo, meta informacoes e tag
 */

import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ArticleHeaderProps {
  title: string
  summary: string
  tag: string
  publishedAt: string
  readTime?: number
}

export function ArticleHeader({
  title,
  summary,
  tag,
  publishedAt,
  readTime = 5
}: ArticleHeaderProps) {
  // Formata a data para exibicao
  const formattedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Converte tag para slug de categoria
  const categorySlug = tag.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return (
    <header className="animate-fade-in">
      {/* Navegacao de volta */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </Button>
      </div>

      {/* Tag/Categoria */}
      <Link href={`/categoria/${categorySlug}`}>
        <Badge 
          variant="secondary" 
          className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
        >
          {tag}
        </Badge>
      </Link>

      {/* Titulo */}
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
        {title}
      </h1>

      {/* Subtitulo/Resumo */}
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl text-pretty">
        {summary}
      </p>

      {/* Meta informacoes */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {/* Data de publicacao */}
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedAt}>{formattedDate}</time>
        </div>

        {/* Separador */}
        <span className="hidden sm:inline text-border">|</span>

        {/* Tempo de leitura */}
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readTime} min de leitura</span>
        </div>
      </div>
    </header>
  )
}
