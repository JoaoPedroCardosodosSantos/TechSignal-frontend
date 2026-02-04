'use client'

/**
 * Componente ThemeToggle
 * Botao flutuante no canto inferior direito para alternar entre temas
 * Suporta: claro, escuro e sistema
 */

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Tipos de tema disponiveis
type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  // Estado do tema atual
  const [theme, setTheme] = useState<Theme>('dark')
  // Controle do menu de opcoes
  const [menuOpen, setMenuOpen] = useState(false)

  // Aplica o tema ao carregar e quando muda
  useEffect(() => {
    // Recupera tema salvo ou usa 'dark' como padrao
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const initialTheme = savedTheme || 'dark'
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  // Funcao para aplicar o tema ao documento
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === 'system') {
      // Detecta preferencia do sistema
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
    } else {
      root.classList.toggle('dark', newTheme === 'dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  // Handler para mudar o tema
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    setMenuOpen(false)
  }

  // Icone baseado no tema atual
  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  // Opcoes de tema
  const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Menu de opcoes */}
      {menuOpen && (
        <div className="absolute bottom-full right-0 mb-2 rounded-xl border border-border bg-card p-2 shadow-lg animate-slide-up">
          {themeOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  theme === option.value 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-card-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {option.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Botao principal */}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Alternar tema"
      >
        <ThemeIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
