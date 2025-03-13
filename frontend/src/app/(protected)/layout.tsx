'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Se não estiver autenticado, não renderiza o conteúdo
  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar para Desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}