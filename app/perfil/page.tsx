/**
 * Pagina /perfil
 * Server Component que carrega dados iniciais e renderiza o layout
 * Preparado para integracao com Laravel (Sanctum/JWT)
 */

import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProfileClient } from '@/components/profile/profile-client'

// Metadata SEO da pagina
export const metadata: Metadata = {
  title: 'Meu Perfil | TechPulse',
  description: 'Gerencie seu perfil, seguranca e preferencias no TechPulse.',
}

export default function PerfilPage() {
  /**
   * Integracao Laravel (Server Component):
   * 
   * Em producao, voce pode buscar dados iniciais aqui usando:
   * 
   * const cookies = await import('next/headers').then(m => m.cookies())
   * const token = cookies.get('auth_token')?.value
   * 
   * const response = await fetch(`${process.env.LARAVEL_API_URL}/api/user`, {
   *   headers: {
   *     'Authorization': `Bearer ${token}`,
   *     'Accept': 'application/json',
   *   },
   *   cache: 'no-store', // Sempre buscar dados frescos
   * })
   * 
   * if (!response.ok) {
   *   redirect('/login')
   * }
   * 
   * const userData = await response.json()
   * 
   * Passar dados para ProfileClient:
   * <ProfileClient initialData={userData} />
   */

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Conteudo principal */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Titulo da pagina */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="mt-2 text-muted-foreground">
              Gerencie suas informacoes pessoais, seguranca e preferencias.
            </p>
          </div>

          {/* Client Component com as interacoes */}
          <ProfileClient />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}
