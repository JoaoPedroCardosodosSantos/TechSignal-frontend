'use client'

/**
 * Componente RegisterForm
 * Formulario de cadastro com validacao visual e preparado para integracao com Laravel
 * Campos: nome, username, email, senha e confirmar senha
 */

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, AtSign, Loader2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Interface para erros de validacao
interface FormErrors {
  name?: string
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

// Interface para dados do formulario
interface RegisterFormData {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

// Requisitos de senha para validacao visual
const passwordRequirements = [
  { label: 'Pelo menos 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Uma letra maiuscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Uma letra minuscula', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Um numero', test: (p: string) => /\d/.test(p) },
]

export function RegisterForm() {
  // Estado do formulario
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  // Estado de erros
  const [errors, setErrors] = useState<FormErrors>({})
  
  // Estado de loading durante submissao
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado para mostrar/ocultar senhas
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estado para mostrar requisitos de senha
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  /**
   * Valida o formulario antes de enviar
   * @returns true se valido, false se houver erros
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validacao de nome
    if (!formData.name.trim()) {
      newErrors.name = 'O nome e obrigatorio'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres'
    }

    // Validacao de username
    if (!formData.username.trim()) {
      newErrors.username = 'O username e obrigatorio'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Use apenas letras, numeros e underline'
    } else if (formData.username.length < 3) {
      newErrors.username = 'O username deve ter pelo menos 3 caracteres'
    }

    // Validacao de email
    if (!formData.email.trim()) {
      newErrors.email = 'O email e obrigatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Digite um email valido'
    }

    // Validacao de senha
    if (!formData.password) {
      newErrors.password = 'A senha e obrigatoria'
    } else {
      const failedRequirements = passwordRequirements.filter(
        req => !req.test(formData.password)
      )
      if (failedRequirements.length > 0) {
        newErrors.password = 'A senha nao atende aos requisitos'
      }
    }

    // Validacao de confirmacao de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas nao coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handler de submissao do formulario
   * Preparado para integracao futura com backend Laravel
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Valida antes de enviar
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Integrar com backend Laravel
      // Exemplo de chamada para API Laravel:
      // 
      // // Primeiro, obter o CSRF cookie (Laravel Sanctum)
      // await fetch('http://seu-backend-laravel.com/sanctum/csrf-cookie', {
      //   credentials: 'include',
      // })
      //
      // // Depois, fazer o registro
      // const response = await fetch('http://seu-backend-laravel.com/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'X-XSRF-TOKEN': getCsrfToken(), // Pegar do cookie
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify({
      //     name: formData.name,
      //     username: formData.username,
      //     email: formData.email,
      //     password: formData.password,
      //     password_confirmation: formData.confirmPassword,
      //   }),
      // })

      // Simulacao de delay de rede para demonstracao
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulacao de resposta - substituir por logica real
      // if (!response.ok) {
      //   const data = await response.json()
      //   // Laravel retorna erros de validacao em data.errors
      //   if (data.errors) {
      //     setErrors({
      //       name: data.errors.name?.[0],
      //       username: data.errors.username?.[0],
      //       email: data.errors.email?.[0],
      //       password: data.errors.password?.[0],
      //     })
      //     return
      //   }
      //   throw new Error(data.message || 'Erro ao criar conta')
      // }
      
      // const userData = await response.json()
      // Redirecionar para login ou pagina inicial

      // Feedback temporario de sucesso
      alert('Conta criada com sucesso! (Simulacao)')
      
    } catch (error) {
      // Trata erros da API
      setErrors({
        general: error instanceof Error 
          ? error.message 
          : 'Erro ao criar conta. Tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handler para atualizar campos do formulario
   * Limpa erro do campo ao digitar
   */
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpa erro do campo ao comecar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Erro geral */}
      {errors.general && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
          {errors.general}
        </div>
      )}

      {/* Campo de Nome */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Nome completo
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`pl-10 transition-colors ${
              errors.name 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </div>
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive animate-fade-in">
            {errors.name}
          </p>
        )}
      </div>

      {/* Campo de Username */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <div className="relative">
          <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="seu_username"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value.toLowerCase())}
            className={`pl-10 transition-colors ${
              errors.username 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
        </div>
        {errors.username && (
          <p id="username-error" className="text-sm text-destructive animate-fade-in">
            {errors.username}
          </p>
        )}
      </div>

      {/* Campo de Email */}
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
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`pl-10 transition-colors ${
              errors.email 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive animate-fade-in">
            {errors.email}
          </p>
        )}
      </div>

      {/* Campo de Senha */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Crie uma senha forte"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            className={`pl-10 pr-10 transition-colors ${
              errors.password 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : 'password-requirements'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {/* Requisitos de senha */}
        {(showPasswordRequirements || formData.password) && (
          <div id="password-requirements" className="space-y-1.5 pt-1 animate-fade-in">
            {passwordRequirements.map((req, index) => {
              const passed = req.test(formData.password)
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    passed ? 'text-green-500' : 'text-muted-foreground'
                  }`}
                >
                  {passed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {req.label}
                </div>
              )
            })}
          </div>
        )}
        
        {errors.password && (
          <p id="password-error" className="text-sm text-destructive animate-fade-in">
            {errors.password}
          </p>
        )}
      </div>

      {/* Campo de Confirmar Senha */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirmar senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className={`pl-10 pr-10 transition-colors ${
              errors.confirmPassword 
                ? 'border-destructive focus-visible:ring-destructive' 
                : formData.confirmPassword && formData.password === formData.confirmPassword
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {/* Indicador visual de senhas coincidentes */}
        {formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="flex items-center gap-1 text-xs text-green-500 animate-fade-in">
            <Check className="h-3 w-3" />
            Senhas coincidem
          </p>
        )}
        {errors.confirmPassword && (
          <p id="confirm-password-error" className="text-sm text-destructive animate-fade-in">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Termos de uso */}
      <p className="text-xs text-muted-foreground">
        Ao criar uma conta, voce concorda com nossos{' '}
        <Link href="/termos" className="text-primary hover:underline">
          Termos de Uso
        </Link>{' '}
        e{' '}
        <Link href="/privacidade" className="text-primary hover:underline">
          Politica de Privacidade
        </Link>
        .
      </p>

      {/* Botao de Submit */}
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando conta...
          </>
        ) : (
          'Criar conta'
        )}
      </Button>

      {/* Link para login */}
      <p className="text-center text-sm text-muted-foreground">
        Ja tem uma conta?{' '}
        <Link 
          href="/login" 
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  )
}
