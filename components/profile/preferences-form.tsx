'use client'

/**
 * Componente PreferencesForm
 * Configuracoes de preferencias: tema, idioma e notificacoes
 * Preparado para integracao com Laravel API
 */

import { useState } from 'react'
import { Sun, Moon, Monitor, Globe, Bell, Mail, Smartphone, Newspaper, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UserPreferences } from '@/types/user'

interface PreferencesFormProps {
  preferences: UserPreferences
  onUpdate: (preferences: Partial<UserPreferences>) => Promise<void>
  onSuccess?: (message: string) => void
}

// Opcoes de tema
const themeOptions = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Escuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: Monitor },
]

// Opcoes de idioma
const languageOptions = [
  { value: 'pt-BR', label: 'Portugues (Brasil)', flag: '🇧🇷' },
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Espanol', flag: '🇪🇸' },
]

export function PreferencesForm({ preferences, onUpdate, onSuccess }: PreferencesFormProps) {
  // Estado local das preferencias
  const [localPrefs, setLocalPrefs] = useState(preferences)
  // Estados de loading para cada campo
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Atualiza tema
  const handleThemeChange = async (theme: 'light' | 'dark' | 'system') => {
    setLoadingStates((prev) => ({ ...prev, theme: true }))
    try {
      // Aplica tema localmente
      const root = document.documentElement
      if (theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', systemDark)
      } else {
        root.classList.toggle('dark', theme === 'dark')
      }
      localStorage.setItem('theme', theme)
      
      setLocalPrefs((prev) => ({ ...prev, theme }))
      await onUpdate({ theme })
      onSuccess?.('Tema atualizado')
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStates((prev) => ({ ...prev, theme: false }))
    }
  }

  // Atualiza idioma
  const handleLanguageChange = async (language: 'pt-BR' | 'en-US' | 'es-ES') => {
    setLoadingStates((prev) => ({ ...prev, language: true }))
    try {
      setLocalPrefs((prev) => ({ ...prev, language }))
      await onUpdate({ language })
      onSuccess?.('Idioma atualizado')
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStates((prev) => ({ ...prev, language: false }))
    }
  }

  // Atualiza notificacoes
  const handleNotificationChange = async (
    key: keyof UserPreferences['notifications'],
    value: boolean
  ) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }))
    try {
      const newNotifications = { ...localPrefs.notifications, [key]: value }
      setLocalPrefs((prev) => ({ ...prev, notifications: newNotifications }))
      await onUpdate({ notifications: newNotifications })
      onSuccess?.('Preferencia de notificacao atualizada')
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div className="space-y-8">
      {/* Selecao de tema */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Aparencia</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleThemeChange(value as typeof localPrefs.theme)}
              disabled={loadingStates.theme}
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                localPrefs.theme === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-secondary'
              }`}
            >
              {loadingStates.theme && localPrefs.theme === value ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selecao de idioma */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Idioma</h2>
        </div>

        <Select
          value={localPrefs.language}
          onValueChange={(value) => handleLanguageChange(value as typeof localPrefs.language)}
          disabled={loadingStates.language}
        >
          <SelectTrigger className="w-full bg-secondary">
            <SelectValue placeholder="Selecione o idioma" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-2">
                  <span>{option.flag}</span>
                  <span>{option.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notificacoes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Notificacoes</h2>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Notificacoes por email</p>
                <p className="text-sm text-muted-foreground">
                  Receba atualizacoes importantes por email
                </p>
              </div>
            </div>
            <Switch
              checked={localPrefs.notifications.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              disabled={loadingStates.email}
            />
          </div>

          {/* Push */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Notificacoes push</p>
                <p className="text-sm text-muted-foreground">
                  Receba notificacoes em tempo real no navegador
                </p>
              </div>
            </div>
            <Switch
              checked={localPrefs.notifications.push}
              onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              disabled={loadingStates.push}
            />
          </div>

          {/* Newsletter */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Newspaper className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Newsletter</p>
                <p className="text-sm text-muted-foreground">
                  Receba noticias e novidades semanalmente
                </p>
              </div>
            </div>
            <Switch
              checked={localPrefs.notifications.newsletter}
              onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
              disabled={loadingStates.newsletter}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
