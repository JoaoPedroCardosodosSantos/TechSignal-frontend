'use client'

/**
 * Componente ProfileClient
 * Client Component que gerencia as interacoes da pagina de perfil
 * Usa SWR para cache e sincronizacao de dados
 */

import { useState, useCallback } from 'react'
import useSWR, { mutate } from 'swr'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Shield, Settings } from 'lucide-react'
import { ProfileHeader } from './profile-header'
import { ProfileForm } from './profile-form'
import { SecurityForm } from './security-form'
import { PreferencesForm } from './preferences-form'
import { ProfileSkeleton } from './profile-skeleton'
import type { User as UserType, UserPreferences, UserSession } from '@/types/user'

// Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Interface dos dados retornados pela API
interface UserData {
  user: UserType
  preferences: UserPreferences
  sessions: UserSession[]
}

// Componente de toast simples para feedback
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div
      className={`fixed bottom-24 right-6 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg animate-slide-up ${
        type === 'success'
          ? 'border-green-500/50 bg-green-500/10 text-green-500'
          : 'border-destructive/50 bg-destructive/10 text-destructive'
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-current opacity-70 hover:opacity-100"
      >
        x
      </button>
    </div>
  )
}

export function ProfileClient() {
  // Busca dados do usuario
  const { data, error, isLoading } = useSWR<UserData>('/api/user', fetcher)

  // Estado do toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Exibe toast
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Atualiza perfil
  const handleProfileUpdate = useCallback(async (updateData: Partial<UserType>) => {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar perfil')
    }

    // Atualiza cache do SWR
    mutate('/api/user')
    showToast('Perfil atualizado com sucesso')
  }, [showToast])

  // Altera senha
  const handlePasswordChange = useCallback(async (passwordData: {
    current_password: string
    password: string
    password_confirmation: string
  }) => {
    const response = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro ao alterar senha')
    }
  }, [])

  // Encerra sessoes
  const handleEndSessions = useCallback(async () => {
    const response = await fetch('/api/user/sessions', {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao encerrar sessoes')
    }

    // Atualiza cache do SWR
    mutate('/api/user')
  }, [])

  // Atualiza preferencias
  const handlePreferencesUpdate = useCallback(async (preferences: Partial<UserPreferences>) => {
    const response = await fetch('/api/user/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar preferencias')
    }

    // Atualiza cache do SWR
    mutate('/api/user')
  }, [])

  // Estado de loading
  if (isLoading) {
    return <ProfileSkeleton />
  }

  // Estado de erro
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-destructive">Erro ao carregar perfil</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Nao foi possivel carregar seus dados. Tente novamente mais tarde.
        </p>
      </div>
    )
  }

  const { user, preferences, sessions } = data

  return (
    <div className="space-y-6">
      {/* Header do perfil */}
      <ProfileHeader user={user} />

      {/* Tabs de conteudo */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Seguranca</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferencias</span>
          </TabsTrigger>
        </TabsList>

        {/* Conteudo das tabs */}
        <div className="mt-6">
          <TabsContent value="profile" className="animate-fade-in">
            <div className="rounded-xl border border-border bg-card p-6">
              <ProfileForm 
                user={user} 
                onUpdate={handleProfileUpdate}
                onSuccess={() => showToast('Alteracao salva com sucesso')}
              />
            </div>
          </TabsContent>

          <TabsContent value="security" className="animate-fade-in">
            <div className="rounded-xl border border-border bg-card p-6">
              <SecurityForm
                sessions={sessions}
                onPasswordChange={handlePasswordChange}
                onEndSessions={handleEndSessions}
                onSuccess={(message) => showToast(message)}
              />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="animate-fade-in">
            <div className="rounded-xl border border-border bg-card p-6">
              <PreferencesForm
                preferences={preferences}
                onUpdate={handlePreferencesUpdate}
                onSuccess={(message) => showToast(message)}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Toast de feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
