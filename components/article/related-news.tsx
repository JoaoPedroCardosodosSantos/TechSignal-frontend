/**
 * Componente RelatedNews
 * Exibe noticias relacionadas ao artigo atual
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { NewsItem } from '@/types/news'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface RelatedNewsProps {
  news: NewsItem[]
}

export function RelatedNews({ news }: RelatedNewsProps) {
  // Se nao houver noticias relacionadas, nao renderiza
  if (!news || news.length === 0) {
    return null
  }

  return (
    <aside className="mt-16 border-t border-border pt-12 animate-slide-up">
      {/* Titulo da secao */}
      <h2 className="mb-8 text-2xl font-bold tracking-tight">
        Noticias Relacionadas
      </h2>

      {/* Grid de noticias relacionadas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link key={item.id} href={`/noticia/${item.slug}`}>
            <Card className="group h-full overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              {/* Imagem */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Tag */}
                <Badge 
                  variant="secondary" 
                  className="absolute right-3 top-3 bg-primary/90 text-primary-foreground"
                >
                  {item.tag}
                </Badge>
              </div>

              <CardContent className="p-4">
                {/* Titulo */}
                <h3 className="font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Ler mais */}
                <div className="mt-3 flex items-center gap-1 text-sm text-primary">
                  <span>Ler mais</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </aside>
  )
}
