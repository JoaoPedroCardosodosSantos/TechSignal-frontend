/**
 * API Route: /api/user
 * Endpoint para dados do usuario logado
 * Dados simulados - preparado para integracao com Laravel
 */

import { NextResponse } from 'next/server'
import type { User, UserPreferences, UserSession } from '@/types/user'

// Dados simulados do usuario
const mockUser: User = {
  id: 1,
  name: 'Maria Silva',
  username: 'mariasilva',
  email: 'maria.silva@email.com',
  avatar_url: null,
  bio: 'Desenvolvedora Full Stack apaixonada por tecnologia e inovacao. Sempre em busca de novos desafios.',
  status: 'active',
  role: 'user',
  email_verified_at: '2024-01-15T10:30:00Z',
  created_at: '2024-01-10T08:00:00Z',
  updated_at: '2024-02-01T14:20:00Z',
}

// Preferencias simuladas
const mockPreferences: UserPreferences = {
  theme: 'dark',
  language: 'pt-BR',
  notifications: {
    email: true,
    push: false,
    newsletter: true,
  },
}

// Sessoes ativas simuladas
const mockSessions: UserSession[] = [
  {
    id: 'session-1',
    device: 'Desktop',
    browser: 'Chrome 120',
    ip_address: '192.168.1.100',
    location: 'Sao Paulo, Brasil',
    last_activity: new Date().toISOString(),
    is_current: true,
  },
  {
    id: 'session-2',
    device: 'Mobile',
    browser: 'Safari 17',
    ip_address: '192.168.1.101',
    location: 'Sao Paulo, Brasil',
    last_activity: new Date(Date.now() - 3600000).toISOString(),
    is_current: false,
  },
]

// GET: Retorna dados do usuario
export async function GET() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  /**
   * Integracao Laravel:
   * const response = await fetch(`${process.env.LARAVEL_API_URL}/api/user`, {
   *   headers: {
   *     'Authorization': `Bearer ${token}`,
   *     'Accept': 'application/json',
   *   },
   *   credentials: 'include',
   * })
   */

  return NextResponse.json({
    user: mockUser,
    preferences: mockPreferences,
    sessions: mockSessions,
  })
}

// PUT: Atualiza dados do usuario
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 800))

    /**
     * Integracao Laravel:
     * const response = await fetch(`${process.env.LARAVEL_API_URL}/api/user`, {
     *   method: 'PUT',
     *   headers: {
     *     'Authorization': `Bearer ${token}`,
     *     'Accept': 'application/json',
     *     'Content-Type': 'application/json',
     *   },
     *   credentials: 'include',
     *   body: JSON.stringify(body),
     * })
     */

    // Retorna dados atualizados (simulado)
    return NextResponse.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      user: { ...mockUser, ...body },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Erro ao atualizar perfil' },
      { status: 400 }
    )
  }
}
