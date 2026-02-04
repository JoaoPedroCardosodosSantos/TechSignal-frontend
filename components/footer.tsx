/**
 * Componente Footer
 * Rodape simples com links e informacoes de copyright
 */

import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo e descricao */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Tech<span className="text-primary">Pulse</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Seu portal de noticias de tecnologia. Sempre atualizado com as ultimas tendencias.
            </p>
          </div>

          {/* Links de navegacao */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sobre
            </a>
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contato
            </a>
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacidade
            </a>
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Termos
            </a>
          </div>

          {/* Redes sociais */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} TechPulse. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
