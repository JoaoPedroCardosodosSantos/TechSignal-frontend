/**
 * Pagina 404 customizada para noticias nao encontradas
 */

import Link from 'next/link'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function NewsNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
        {/* Icone */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>

        {/* Titulo */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Noticia nao encontrada
        </h1>

        {/* Descricao */}
        <p className="mt-4 max-w-md text-center text-muted-foreground">
          A noticia que voce esta procurando pode ter sido removida, renomeada ou nunca existiu.
        </p>

        {/* Botoes de acao */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" asChild className="gap-2 bg-transparent">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Ir para Home
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
