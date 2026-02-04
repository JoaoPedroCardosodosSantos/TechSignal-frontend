/**
 * Componente ProfileSkeleton
 * Skeleton loading para a pagina de perfil
 */

import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="mt-2 h-16 w-full max-w-md" />
          <div className="mt-2 flex gap-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 border-b border-border pb-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
