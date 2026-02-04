/**
 * Componente ArticleSkeleton
 * Placeholder de loading para a pagina de artigo
 */

import { Skeleton } from '@/components/ui/skeleton'

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Botao voltar */}
      <Skeleton className="mb-6 h-9 w-36" />

      {/* Tag */}
      <Skeleton className="mb-4 h-6 w-20" />

      {/* Titulo */}
      <Skeleton className="h-12 w-full max-w-3xl" />
      <Skeleton className="mt-2 h-12 w-3/4" />

      {/* Subtitulo */}
      <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-6 w-2/3" />

      {/* Meta */}
      <div className="mt-6 flex gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Imagem */}
      <Skeleton className="my-8 aspect-video w-full rounded-xl" />

      {/* Conteudo */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      {/* Compartilhar */}
      <div className="mt-8 flex gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  )
}
