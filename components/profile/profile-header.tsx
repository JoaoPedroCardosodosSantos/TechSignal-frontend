/**
 * Componente ProfileHeader
 * Exibe avatar, nome, username, email e badge de status do usuario
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { User } from '@/types/user'

interface ProfileHeaderProps {
  user: User
}

// Funcao para gerar iniciais do nome
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Mapeia status para cores do badge
const statusConfig = {
  active: { label: 'Ativo', variant: 'default' as const },
  inactive: { label: 'Inativo', variant: 'secondary' as const },
  pending: { label: 'Pendente', variant: 'outline' as const },
}

// Mapeia role para labels
const roleLabels = {
  admin: 'Administrador',
  editor: 'Editor',
  user: 'Usuario',
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = getInitials(user.name)
  const status = statusConfig[user.status]
  const roleLabel = roleLabels[user.role]

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start animate-fade-in">
      {/* Avatar com fallback de iniciais */}
      <Avatar className="h-24 w-24 border-4 border-primary/20">
        <AvatarImage src={user.avatar_url || undefined} alt={user.name} />
        <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Informacoes do usuario */}
      <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <Badge variant={status.variant} className="text-xs">
            {status.label}
          </Badge>
        </div>
        
        <p className="text-muted-foreground">@{user.username}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        
        {user.bio && (
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {user.bio}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-1">
            {roleLabel}
          </span>
          <span>
            Membro desde {new Date(user.created_at).toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
