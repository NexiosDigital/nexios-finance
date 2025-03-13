// src/app/auth-status/page.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function AuthStatusPage() {
  const { user, profile, isLoading, session } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Status de Autenticação</h1>
      
      <div className="bg-gray-800 p-4 rounded mb-4">
        <p>Carregando: {isLoading ? 'Sim' : 'Não'}</p>
        <p>Sessão: {session ? 'Ativa' : 'Inativa'}</p>
        <p>Usuário: {user ? 'Autenticado' : 'Não autenticado'}</p>
        <p>Perfil: {profile ? 'Carregado' : 'Não carregado'}</p>
      </div>
      
      {user && (
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Detalhes do Usuário</h2>
          <pre className="bg-gray-900 p-2 rounded overflow-auto max-h-60">
            {JSON.stringify({
              id: user.id,
              email: user.email,
              created_at: user.created_at
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}