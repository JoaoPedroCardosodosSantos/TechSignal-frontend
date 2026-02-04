/**
 * Tipos de dados do usuario
 * Estrutura preparada para integracao com backend Laravel (Sanctum/JWT)
 */

// Interface principal do usuario
export interface User {
  id: number
  name: string
  username: string
  email: string
  avatar_url: string | null
  bio: string | null
  status: 'active' | 'inactive' | 'pending'
  role: 'admin' | 'editor' | 'user'
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

// Interface para atualizacao de perfil
export interface UpdateProfileData {
  name?: string
  username?: string
  email?: string
  bio?: string
}

// Interface para alteracao de senha
export interface ChangePasswordData {
  current_password: string
  password: string
  password_confirmation: string
}

// Interface para preferencias do usuario
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'pt-BR' | 'en-US' | 'es-ES'
  notifications: {
    email: boolean
    push: boolean
    newsletter: boolean
  }
}

// Interface para sessao ativa
export interface UserSession {
  id: string
  device: string
  browser: string
  ip_address: string
  location: string
  last_activity: string
  is_current: boolean
}
