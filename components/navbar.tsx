'use client'

/**
 * Componente Navbar
 * Barra de navegacao principal com logo, busca, links e botoes de autenticacao
 */

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Links de navegacao principais
const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Noticias', href: '#news' },
  { label: 'Categorias', href: '#categories' },
  { label: 'Sobre', href: '#about' },
]

export function Navbar() {
  // Estado para controlar menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Estado para controlar campo de busca
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Tech<span className="text-primary">Pulse</span>
            </span>
          </div>

          {/* Links de navegacao - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Acoes - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {/* Campo de busca expansivel */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="h-9 w-48 bg-secondary"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              )}
            </div>
            
            {/* Botoes de autenticacao */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Cadastrar</Link>
            </Button>
          </div>

          {/* Menu mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Campo de busca mobile */}
        {searchOpen && (
          <div className="border-t border-border py-3 md:hidden animate-fade-in">
            <Input
              type="search"
              placeholder="Buscar noticias..."
              className="bg-secondary"
              autoFocus
            />
          </div>
        )}

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
