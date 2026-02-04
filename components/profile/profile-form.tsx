'use client'

import React from "react"

/**
 * Componente ProfileForm
 * Formulario de edicao de dados pessoais com edicao inline
 * Preparado para integracao com Laravel API
 */

import { useState, type FormEvent } from 'react'
import { Pencil, Check, X, Loader2, User, AtSign, Mail, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { User as UserType } from '@/types/user'

interface ProfileFormProps {
  user: UserType
  onUpdate: (data: Partial<UserType>) => Promise<void>
  onSuccess?: () => void
}

// Campos editaveis do perfil
type EditableField = 'name' | 'username' | 'email' | 'bio'

export function ProfileForm({ user, onUpdate, onSuccess }: ProfileFormProps) {
  // Estado dos campos editaveis
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio || '',
  })
  
  // Campo em edicao
  const [editing, setEditing] = useState<EditableField | null>(null)
  // Estado de loading
  const [loading, setLoading] = useState(false)
  // Erros de validacao
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Inicia edicao de um campo
  const startEditing = (field: EditableField) => {
    setEditing(field)
    setErrors({})
  }

  // Cancela edicao
  const cancelEditing = () => {
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
    })
    setEditing(null)
    setErrors({})
  }

  // Salva alteracoes do campo
  const saveField = async (field: EditableField) => {
    // Validacoes basicas
    if (field === 'name' && formData.name.trim().length < 2) {
      setErrors({ name: 'Nome deve ter pelo menos 2 caracteres' })
      return
    }
    if (field === 'username' && !/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      setErrors({ username: 'Username deve ter 3-20 caracteres (letras, numeros, _)' })
      return
    }
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Email invalido' })
      return
    }

    setLoading(true)
    try {
      await onUpdate({ [field]: formData[field] })
      setEditing(null)
      onSuccess?.()
    } catch (err) {
      setErrors({ [field]: 'Erro ao salvar alteracoes' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handler de submit (Enter)
  const handleKeyDown = (e: React.KeyboardEvent, field: EditableField) => {
    if (e.key === 'Enter' && field !== 'bio') {
      e.preventDefault()
      saveField(field)
    }
    if (e.key === 'Escape') {
      cancelEditing()
    }
  }

  // Configuracao dos campos
  const fields: { key: EditableField; label: string; icon: typeof User; type?: string }[] = [
    { key: 'name', label: 'Nome completo', icon: User },
    { key: 'username', label: 'Username', icon: AtSign },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' },
    { key: 'bio', label: 'Bio', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Dados Pessoais</h2>
      </div>

      <div className="space-y-4">
        {fields.map(({ key, label, icon: Icon, type }) => (
          <div key={key} className="group">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            
            {editing === key ? (
              // Modo de edicao
              <div className="mt-1 flex items-start gap-2">
                <div className="relative flex-1">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  {key === 'bio' ? (
                    <Textarea
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      onKeyDown={(e) => handleKeyDown(e, key)}
                      className="min-h-[100px] pl-10 bg-secondary"
                      autoFocus
                      maxLength={200}
                    />
                  ) : (
                    <Input
                      type={type || 'text'}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      onKeyDown={(e) => handleKeyDown(e, key)}
                      className="pl-10 bg-secondary"
                      autoFocus
                    />
                  )}
                  {errors[key] && (
                    <p className="mt-1 text-xs text-destructive">{errors[key]}</p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => saveField(key)}
                  disabled={loading}
                  className="h-10 w-10"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={cancelEditing}
                  disabled={loading}
                  className="h-10 w-10"
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ) : (
              // Modo de visualizacao
              <div 
                className="mt-1 flex items-center gap-2 rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-secondary/50 cursor-pointer"
                onClick={() => startEditing(key)}
                onKeyDown={(e) => e.key === 'Enter' && startEditing(key)}
                tabIndex={0}
                role="button"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">
                  {formData[key] || <span className="text-muted-foreground italic">Nao informado</span>}
                </span>
                <Pencil className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
