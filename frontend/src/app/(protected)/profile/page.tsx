'use client'

// app/(protected)/profile/page.tsx
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { UserData } from '@/lib/database.types'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { User, Mail, Settings, CreditCard } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Buscar dados completos do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          throw error
        }

        setUserData(data)
        setName(data.name || '')
      } catch (err: any) {
        console.error('Erro ao buscar dados do usuário:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

    setSaving(true)
    setSuccess(null)
    setError(null)

    try {
      // Atualizar na tabela users
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      // Atualizar nos metadados do usuário
      const { error: authError } = await supabase.auth.updateUser({
        data: { name }
      })

      if (authError) {
        throw authError
      }

      setSuccess('Perfil atualizado com sucesso!')
    } catch (err: any) {
      setError(`Erro ao atualizar perfil: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Perfil</h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold">Informações Pessoais</h2>
              </Card.Header>
              <Card.Content>
                {success && (
                  <Alert variant="success" className="mb-6">
                    {success}
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="error" className="mb-6">
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div>
                    <Input
                      label="Nome"
                      type="text"
                      id="name"
                      placeholder="Seu Nome Completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User className="h-5 w-5 text-gray-500" />}
                      required
                      fullWidth
                    />
                  </div>

                  <div>
                    <Input
                      label="Email"
                      type="email"
                      id="email"
                      value={user?.email || ''}
                      disabled
                      icon={<Mail className="h-5 w-5 text-gray-500" />}
                      fullWidth
                      helperText="O email não pode ser alterado"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={saving}
                    className="mt-2"
                  >
                    Salvar Alterações
                  </Button>
                </form>
              </Card.Content>
            </Card>
          </div>

          <div>
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold">Detalhes da Conta</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Plano de Assinatura</p>
                    <p className="font-medium">{userData?.membership_level === 'basic' ? 'Básico' : 'Premium'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Membro desde</p>
                    <p className="font-medium">
                      {userData?.created_at 
                        ? new Date(userData.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : '-'}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full mb-3"
                      leftIcon={<CreditCard className="h-4 w-4 mr-2" />}
                    >
                      Gerenciar Assinatura
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      leftIcon={<Settings className="h-4 w-4 mr-2" />}
                    >
                      Configurações da Conta
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}