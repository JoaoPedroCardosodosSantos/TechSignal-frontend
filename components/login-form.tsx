'use client'

/**
 * Componente LoginForm
 * Formulario de login com validacao visual e preparado para integracao com Laravel
 * Campos: email e senha com validacao client-side
 */

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Interface para erros de validacao
interface FormErrors {
  email?: string
  password?: string
  general?: string
}

// Interface para dados do formulario
interface LoginFormData {
  email: string
  password: string
}

export function LoginForm() {
  // Estado do formulario
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  
  // Estado de erros
  const [errors, setErrors] = useState<FormErrors>({})
  
  // Estado de loading durante submissao
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado para mostrar/ocultar senha
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Valida o formulario antes de enviar
   * @returns true se valido, false se houver erros
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validacao de email
    if (!formData.email.trim()) {
      newErrors.email = 'O email e obrigatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Digite um email valido'
    }

    // Validacao de senha
    if (!formData.password) {
      newErrors.password = 'A senha e obrigatoria'
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres'
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
      // const response = await fetch('http://seu-backend-laravel.com/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      //   credentials: 'include', // Para cookies de sessao
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // })

      // Simulacao de delay de rede para demonstracao
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulacao de resposta - substituir por logica real
      // if (!response.ok) {
      //   const data = await response.json()
      //   throw new Error(data.message || 'Erro ao fazer login')
      // }
      
      // const userData = await response.json()
      // Redirecionar ou atualizar estado global com dados do usuario

      // Feedback temporario de sucesso
      alert('Login realizado com sucesso! (Simulacao)')
      
    } catch (error) {
      // Trata erros da API
      setErrors({
        general: error instanceof Error 
          ? error.message 
          : 'Erro ao fazer login. Tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handler para atualizar campos do formulario
   * Limpa erro do campo ao digitar
   */
  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpa erro do campo ao comecar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Erro geral (ex: credenciais invalidas) */}
      {errors.general && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
          {errors.general}
        </div>
      )}

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
        {/* Mensagem de erro do email */}
        {errors.email && (
          <p 
            id="email-error" 
            className="text-sm text-destructive animate-fade-in"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Campo de Senha */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>
          <a 
            href="/esqueci-senha" 
            className="text-xs text-primary hover:underline"
          >
            Esqueceu a senha?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={`pl-10 pr-10 transition-colors ${
              errors.password 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {/* Botao para mostrar/ocultar senha */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {/* Mensagem de erro da senha */}
        {errors.password && (
          <p 
            id="password-error" 
            className="text-sm text-destructive animate-fade-in"
          >
            {errors.password}
          </p>
        )}
      </div>

      {/* Botao de Submit */}
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>

      {/* Link para cadastro */}
      <p className="text-center text-sm text-muted-foreground">
        Nao tem uma conta?{' '}
        <Link 
          href="/register" 
          className="font-medium text-primary hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  )
}
