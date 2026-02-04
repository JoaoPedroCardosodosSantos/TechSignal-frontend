'use client'

import React from "react"

/**
 * Componente ContactForm
 * Formulario de contato com campos de email e mensagem
 * Fica sticky na coluna direita no desktop
 */

import { useState } from 'react'
import { Send, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  // Estados do formulario
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Handler de submit do formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simula envio do formulario
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
    setMessage('')
    
    // Reset estado de sucesso apos 5 segundos
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {/* Cabecalho do formulario */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-card-foreground">
            Entre em Contato
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Envie sua sugestao de pauta ou feedback
          </p>
        </div>

        {/* Mensagem de sucesso */}
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-card-foreground">
              Mensagem Enviada!
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Obrigado pelo contato. Responderemos em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-secondary"
                />
              </div>
            </div>

            {/* Campo de mensagem */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="message"
                  placeholder="Escreva sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="pl-10 resize-none bg-secondary"
                />
              </div>
            </div>

            {/* Botao de envio */}
            <Button 
              type="submit" 
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        )}

        {/* Informacoes adicionais */}
        <div className="mt-6 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            Ao enviar, voce concorda com nossa{' '}
            <a href="#" className="text-primary hover:underline">
              Politica de Privacidade
            </a>
          </p>
        </div>
      </div>
    </aside>
  )
}
