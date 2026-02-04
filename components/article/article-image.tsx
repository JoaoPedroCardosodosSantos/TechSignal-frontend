/**
 * Componente ArticleImage
 * Imagem principal do artigo com loading state e aspect ratio consistente
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

interface ArticleImageProps {
  src: string
  alt: string
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
  // Estado para controlar loading da imagem
  const [isLoading, setIsLoading] = useState(true)

  return (
    <figure className="my-8 animate-fade-in overflow-hidden rounded-xl">
      {/* Container com aspect ratio 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {/* Skeleton enquanto carrega */}
        {isLoading && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        
        {/* Imagem principal */}
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
    </figure>
  )
}
