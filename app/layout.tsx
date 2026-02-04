import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'

// Fonte principal para corpo de texto
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

// Fonte para títulos - mais tech/moderna
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'TechPulse - Seu Portal de Noticias de Tecnologia',
  description: 'As ultimas noticias e tendencias do mundo da tecnologia, inovacao, startups e muito mais.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
