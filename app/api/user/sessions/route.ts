/**
 * API Route: /api/user/sessions
 * Endpoint para gerenciamento de sessoes
 * Preparado para integracao com Laravel Sanctum
 */

import { NextResponse } from 'next/server'

// DELETE: Encerra todas as outras sessoes
export async function DELETE() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000))

  /**
   * Integracao Laravel:
   * const response = await fetch(`${process.env.LARAVEL_API_URL}/api/user/sessions`, {
   *   method: 'DELETE',
   *   headers: {
   *     'Authorization': `Bearer ${token}`,
   *     'Accept': 'application/json',
   *   },
   *   credentials: 'include',
   * })
   */

  return NextResponse.json({
    success: true,
    message: 'Todas as outras sessoes foram encerradas',
  })
}
