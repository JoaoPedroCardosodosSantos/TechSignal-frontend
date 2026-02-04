/**
 * Loading state para pagina de noticia
 * Exibido enquanto a pagina esta sendo carregada
 */

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArticleSkeleton } from '@/components/article/article-skeleton'

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ArticleSkeleton />
      <Footer />
    </div>
  )
}
