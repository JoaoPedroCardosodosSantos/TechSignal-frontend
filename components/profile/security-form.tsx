'use client'

/**
 * Componente SecurityForm
 * Formulario de seguranca: alteracao de senha e gerenciamento de sessoes
 * Preparado para integracao com Laravel Sanctum
 */

import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, Loader2, Monitor, Smartphone, LogOut, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { UserSession } from '@/types/user'

interface SecurityFormProps {
  sessions: UserSession[]
  onPasswordChange: (data: { current_password: string; password: string; password_confirmation: string }) => Promise<void>
  onEndSessions: () => Promise<void>
  onSuccess?: (message: string) => void
}

export function SecurityForm({ sessions, onPasswordChange, onEndSessions, onSuccess }: SecurityFormProps) {
  // Estados do formulario de senha
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Estados de controle
  const [loading, setLoading] = useState(false)
  const [endingSessionsLoading, setEndingSessionsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validacao de senha
  const validatePassword = () => {
    const newErrors: Record<string, string> = {}
    
    if (!currentPassword) {
      newErrors.current_password = 'Senha atual obrigatoria'
    }
    if (!newPassword) {
      newErrors.password = 'Nova senha obrigatoria'
    } else if (newPassword.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres'
    }
    if (newPassword !== confirmPassword) {
      newErrors.password_confirmation = 'Senhas nao coincidem'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit do formulario de senha
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validatePassword()) return
    
    setLoading(true)
    try {
      await onPasswordChange({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      })
      
      // Limpa formulario
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      onSuccess?.('Senha alterada com sucesso')
    } catch (err) {
      setErrors({ current_password: 'Senha atual incorreta' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Encerrar todas as sessoes
  const handleEndSessions = async () => {
    setEndingSessionsLoading(true)
    try {
      await onEndSessions()
      onSuccess?.('Todas as outras sessoes foram encerradas')
    } catch (err) {
      console.error(err)
    } finally {
      setEndingSessionsLoading(false)
    }
  }

  // Icone do dispositivo
  const DeviceIcon = (device: string) => {
    return device.toLowerCase().includes('mobile') ? Smartphone : Monitor
  }

  return (
    <div className="space-y-8">
      {/* Formulario de alteracao de senha */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Alterar Senha</h2>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Senha atual */}
          <div>
            <Label htmlFor="current_password">Senha atual</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="current_password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-10 pr-10 bg-secondary"
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.current_password && (
              <p className="mt-1 text-xs text-destructive">{errors.current_password}</p>
            )}
          </div>

          {/* Nova senha */}
          <div>
            <Label htmlFor="new_password">Nova senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="new_password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 pr-10 bg-secondary"
                placeholder="Digite a nova senha"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirmar senha */}
          <div>
            <Label htmlFor="confirm_password">Confirmar nova senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 bg-secondary"
                placeholder="Confirme a nova senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-destructive">{errors.password_confirmation}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Alterando...
              </>
            ) : (
              'Alterar senha'
            )}
          </Button>
        </form>
      </div>

      {/* Sessoes ativas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sessoes Ativas</h2>
          <span className="text-sm text-muted-foreground">
            {sessions.length} {sessions.length === 1 ? 'sessao' : 'sessoes'}
          </span>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => {
            const Icon = DeviceIcon(session.device)
            return (
              <div
                key={session.id}
                className={`flex items-center gap-4 rounded-lg border p-4 ${
                  session.is_current 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">
                      {session.device} - {session.browser}
                    </p>
                    {session.is_current && (
                      <span className="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {session.location} - {session.ip_address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ultima atividade: {new Date(session.last_activity).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botao para encerrar outras sessoes */}
        {sessions.filter((s) => !s.is_current).length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Encerrar outras sessoes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Encerrar todas as outras sessoes?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Isso vai desconectar todos os seus outros dispositivos. Voce precisara fazer login novamente nesses dispositivos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleEndSessions}
                  disabled={endingSessionsLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {endingSessionsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Encerrando...
                    </>
                  ) : (
                    'Encerrar sessoes'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
