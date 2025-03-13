'use client'

// app/(auth)/register/page.tsx
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    
    // Validações básicas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      const { error, data } = await signUp(email, password, name)
      
      if (error) {
        throw error
      }
      
      if (data) {
        setSuccess('Cadastro realizado com sucesso! Verifique seu email para confirmar sua conta.')
        // Limpar os campos
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        
        // Opcionalmente, redirecione para login após alguns segundos
        setTimeout(() => {
          router.push('/login')
        }, 5000)
      }
    } catch (err: any) {
      // Mapeamento de mensagens de erro para português
      const errorMessages: Record<string, string> = {
        'User already registered': 'Este email já está cadastrado.',
        'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
      }
      
      setError(errorMessages[err.message] || 'Ocorreu um erro ao realizar o cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.svg" 
              alt="Nexios Finance" 
              width={64} 
              height={64} 
              className="h-16 w-auto" 
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Crie sua conta Nexios</h1>
          <p className="text-gray-400">Comece sua jornada para uma vida financeira melhor</p>
        </div>

        <Card>
          <Card.Content className="py-6">
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert variant="success" className="mb-6">
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  label="Nome Completo"
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
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-5 w-5 text-gray-500" />}
                  required
                  fullWidth
                />
              </div>

              <div>
                <Input
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-gray-500" />}
                  required
                  fullWidth
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  }
                />
              </div>

              <div>
                <Input
                  label="Confirmar Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-gray-500" />}
                  required
                  fullWidth
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                fullWidth
                className="py-2.5"
              >
                Criar Conta
              </Button>
            </form>
          </Card.Content>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}