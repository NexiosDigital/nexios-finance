'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Wallet, 
  TrendingUp, 
  BarChart, 
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

// Componente de Card de Estatística
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType 
}: { 
  title: string
  value: string
  icon: React.ReactNode
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}) => {
  // Definir cores baseadas no tipo de mudança
  const changeColor = {
    positive: 'text-emerald-500',
    negative: 'text-red-500',
    neutral: 'text-gray-400',
  }[changeType || 'neutral']

  const changeIcon = changeType === 'positive' ? <ArrowUp className="h-3 w-3" /> : 
                     changeType === 'negative' ? <ArrowDown className="h-3 w-3" /> : null

  return (
    <Card>
      <Card.Content className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            
            {change && (
              <div className={`flex items-center mt-2 text-sm ${changeColor}`}>
                {changeIcon}
                <span className="ml-1">{change}</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 p-3 rounded-lg">
            {icon}
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // Definir saudação baseada na hora do dia
    const hour = new Date().getHours()
    
    if (hour < 12) {
      setGreeting('Bom dia')
    } else if (hour < 18) {
      setGreeting('Boa tarde')
    } else {
      setGreeting('Boa noite')
    }
  }, [])

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{greeting}, {profile?.name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || 'usuário'}</h1>
        <p className="text-gray-400 mt-1">Aqui está um resumo das suas finanças</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Saldo Total" 
          value="R$ 12.580,45" 
          icon={<Wallet className="h-6 w-6 text-emerald-500" />}
          change="+ 5,2% este mês"
          changeType="positive"
        />
        
        <StatCard 
          title="Receitas" 
          value="R$ 8.950,00" 
          icon={<TrendingUp className="h-6 w-6 text-emerald-500" />}
          change="+ 1,8% este mês"
          changeType="positive"
        />
        
        <StatCard 
          title="Despesas" 
          value="R$ 5.372,55" 
          icon={<BarChart className="h-6 w-6 text-red-500" />}
          change="- 3,6% este mês"
          changeType="negative"
        />
        
        <StatCard 
          title="Investimentos" 
          value="R$ 32.145,89" 
          icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          change="+ 2,4% este mês"
          changeType="positive"
        />
      </div>

      {/* Área de Ação */}
      <Card className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 border-none">
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Complete seu perfil financeiro</h3>
              <p className="text-gray-400">
                Configure suas contas e categorias para obter insights mais precisos
              </p>
            </div>
            
            <Button 
              variant="primary" 
              className="mt-4 md:mt-0"
            >
              Completar Configuração
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Área para Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium">Despesas por Categoria</h3>
          </Card.Header>
          <Card.Content>
            <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg">
              <p className="text-gray-400">Gráfico de despesas será implementado aqui</p>
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium">Fluxo de Caixa Recente</h3>
          </Card.Header>
          <Card.Content>
            <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg">
              <p className="text-gray-400">Gráfico de fluxo de caixa será implementado aqui</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}