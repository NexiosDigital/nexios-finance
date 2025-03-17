'use client';

import React, { useState } from 'react';
import { 
  PlusIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpIcon,
  FlagIcon,
  ChevronRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

// Tipos para as metas financeiras
type GoalPriority = 'high' | 'medium' | 'low';
type GoalStatus = 'active' | 'completed' | 'paused';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
  category: string | null;
  priority: GoalPriority;
  status: GoalStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Dados de exemplo
const sampleGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Fundo de Emergência',
    targetAmount: 15000,
    currentAmount: 10500,
    targetDate: '2025-06-30',
    category: 'Poupança',
    priority: 'high',
    status: 'active',
    notes: 'Objetivo: ter 6 meses de despesas guardadas',
    createdAt: '2024-12-01',
    updatedAt: '2025-03-10'
  },
  {
    id: '2',
    name: 'Viagem para Europa',
    targetAmount: 18000,
    currentAmount: 7200,
    targetDate: '2025-12-15',
    category: 'Viagem',
    priority: 'medium',
    status: 'active',
    notes: 'Milhas já acumuladas para passagem',
    createdAt: '2025-01-15',
    updatedAt: '2025-03-10'
  },
  {
    id: '3',
    name: 'Novo Laptop',
    targetAmount: 8000,
    currentAmount: 3500,
    targetDate: '2025-07-20',
    category: 'Tecnologia',
    priority: 'medium',
    status: 'active',
    notes: null,
    createdAt: '2025-02-05',
    updatedAt: '2025-03-10'
  },
  {
    id: '4',
    name: 'Entrada Apartamento',
    targetAmount: 50000,
    currentAmount: 12500,
    targetDate: '2026-12-31',
    category: 'Imóveis',
    priority: 'high',
    status: 'active',
    notes: 'Considerar financiamentos com taxa reduzida',
    createdAt: '2024-10-10',
    updatedAt: '2025-03-10'
  },
  {
    id: '5',
    name: 'Curso de Especialização',
    targetAmount: 5000,
    currentAmount: 5000,
    targetDate: '2025-02-28',
    category: 'Educação',
    priority: 'high',
    status: 'completed',
    notes: 'Curso concluído em fevereiro/2025',
    createdAt: '2024-08-15',
    updatedAt: '2025-02-28'
  }
];

// Funções de formatação
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Sem data definida';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Calcula a diferença de dias entre duas datas
const getDaysRemaining = (targetDate: string | null) => {
  if (!targetDate) return null;
  
  const target = new Date(targetDate);
  const today = new Date();
  
  // Zerar horas para comparar apenas datas
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Componentes
const Card = ({ 
  children, 
  className = '', 
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div 
      className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl ${className} ${onClick ? 'cursor-pointer hover:border-emerald-500/20' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const GoalProgressBar = ({ currentAmount, targetAmount }: { currentAmount: number; targetAmount: number }) => {
  const percentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  
  return (
    <div className="w-full mt-2">
      <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <div className="text-xs text-gray-400">{formatCurrency(currentAmount)}</div>
        <div className="text-xs text-white font-semibold">{percentage}%</div>
        <div className="text-xs text-gray-400">{formatCurrency(targetAmount)}</div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: GoalPriority }) => {
  const config = {
    high: { color: 'bg-red-400/20 text-red-400', label: 'Alta' },
    medium: { color: 'bg-amber-400/20 text-amber-400', label: 'Média' },
    low: { color: 'bg-blue-400/20 text-blue-400', label: 'Baixa' }
  };
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${config[priority].color}`}>
      {config[priority].label}
    </span>
  );
};

const StatusBadge = ({ status }: { status: GoalStatus }) => {
  const config = {
    active: { color: 'bg-emerald-400/20 text-emerald-400', label: 'Ativo' },
    completed: { color: 'bg-blue-400/20 text-blue-400', label: 'Concluído' },
    paused: { color: 'bg-gray-400/20 text-gray-400', label: 'Pausado' }
  };
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${config[status].color}`}>
      {config[status].label}
    </span>
  );
};

// Componente de cartão de meta
const GoalCard = ({ goal, onClick }: { goal: FinancialGoal; onClick: () => void }) => {
  const daysRemaining = goal.targetDate ? getDaysRemaining(goal.targetDate) : null;
  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  
  // Determinar a mensagem de prazo
  let timeMessage = 'Sem prazo definido';
  let timeColor = 'text-gray-400';
  
  if (daysRemaining !== null) {
    if (daysRemaining < 0) {
      timeMessage = `Prazo vencido há ${Math.abs(daysRemaining)} dias`;
      timeColor = 'text-red-400';
    } else if (daysRemaining === 0) {
      timeMessage = 'Prazo vence hoje';
      timeColor = 'text-amber-400';
    } else {
      timeMessage = `${daysRemaining} dias restantes`;
      timeColor = 'text-emerald-400';
    }
  }
  
  return (
    <Card 
      className="p-5 transition-all hover:transform hover:translate-y-[-4px] hover:shadow-emerald-900/10"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{goal.name}</h3>
        {goal.status === 'completed' ? (
          <CheckCircleSolidIcon className="w-5 h-5 text-emerald-400" />
        ) : (
          <PriorityBadge priority={goal.priority} />
        )}
      </div>
      
      {goal.category && (
        <div className="text-xs text-gray-400 mb-3">{goal.category}</div>
      )}
      
      <GoalProgressBar 
        currentAmount={goal.currentAmount} 
        targetAmount={goal.targetAmount} 
      />
      
      <div className="mt-4 flex justify-between items-center">
        <div className={`flex items-center text-xs ${timeColor}`}>
          <ClockIcon className="w-3.5 h-3.5 mr-1" />
          {timeMessage}
        </div>
        
        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
      </div>
    </Card>
  );
};

// Componente de detalhes da meta
const GoalDetails = ({ goal, onClose }: { goal: FinancialGoal; onClose: () => void }) => {
  const daysRemaining = goal.targetDate ? getDaysRemaining(goal.targetDate) : null;
  
  return (
    <Card className="p-6 lg:p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold">{goal.name}</h2>
            <StatusBadge status={goal.status} />
          </div>
          {goal.category && (
            <div className="text-sm text-gray-400 mt-1">{goal.category}</div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-5 bg-gray-800/70 rounded-xl mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Progresso</div>
          <div className="text-sm font-semibold text-emerald-400">
            {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
          </div>
        </div>
        
        <GoalProgressBar 
          currentAmount={goal.currentAmount} 
          targetAmount={goal.targetAmount} 
        />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Valor Atual</div>
            <div className="text-lg font-semibold text-emerald-400">
              {formatCurrency(goal.currentAmount)}
            </div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Valor Alvo</div>
            <div className="text-lg font-semibold">
              {formatCurrency(goal.targetAmount)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-indigo-400/10 text-indigo-400 mr-3">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Data Alvo</div>
            <div className="text-sm text-gray-400">
              {goal.targetDate ? formatDate(goal.targetDate) : 'Sem data definida'}
              {daysRemaining !== null && daysRemaining >= 0 && (
                <div className="text-xs text-emerald-400 mt-1">
                  {daysRemaining} dias restantes
                </div>
              )}
              {daysRemaining !== null && daysRemaining < 0 && (
                <div className="text-xs text-red-400 mt-1">
                  Prazo vencido há {Math.abs(daysRemaining)} dias
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 mr-3">
            <FlagIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Prioridade</div>
            <PriorityBadge priority={goal.priority} />
          </div>
        </div>
      </div>
      
      {goal.notes && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Observações</div>
          <div className="p-3 bg-gray-800/70 rounded-lg text-gray-300 text-sm">
            {goal.notes}
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={onClose}
        >
          Voltar
        </button>
        
        <div className="space-x-3">
          {goal.status !== 'completed' && (
            <button className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              Adicionar Valor
            </button>
          )}
          <button className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
            Editar Meta
          </button>
        </div>
      </div>
    </Card>
  );
};

// Componente sugestão de meta
const SuggestedGoal = ({ 
  title, 
  description, 
  icon, 
  amount 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  amount: number;
}) => {
  return (
    <Card className="p-4 transition-all hover:transform hover:scale-[1.02]">
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400 mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-emerald-400 font-medium">
              Sugestão: {formatCurrency(amount)}
            </span>
            <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              Criar Meta
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Componente Principal
const FinancialGoals = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>(sampleGoals);
  const [filterStatus, setFilterStatus] = useState<'all' | GoalStatus>('all');
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal | null>(null);
  
  // Filtrar as metas de acordo com o status selecionado
  const filteredGoals = filterStatus === 'all' 
    ? goals 
    : goals.filter(goal => goal.status === filterStatus);
  
  // Agrupar metas por status para fácil visualização
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  
  // Calcular estatísticas
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTargets > 0 ? (totalSaved / totalTargets) * 100 : 0;
  
  // Sugestões de metas baseadas em boas práticas financeiras
  const suggestedGoals = [
    {
      id: 'sg1',
      title: 'Fundo de Emergência',
      description: 'Tenha de 3 a 6 meses de despesas guardadas para imprevistos',
      icon: <CheckCircleIcon className="w-5 h-5" />,
      amount: 12000
    },
    {
      id: 'sg2',
      title: 'Aposentadoria',
      description: 'Comece a investir para sua aposentadoria o quanto antes',
      icon: <ClockIcon className="w-5 h-5" />,
      amount: 50000
    },
    {
      id: 'sg3',
      title: 'Educação Contínua',
      description: 'Invista em cursos e especializações para sua carreira',
      icon: <ArrowUpIcon className="w-5 h-5" />,
      amount: 5000
    }
  ];
  
  return (
    <div className="space-y-6">
      {selectedGoal ? (
        <GoalDetails 
          goal={selectedGoal} 
          onClose={() => setSelectedGoal(null)} 
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Metas Financeiras
              </h1>
              <p className="text-gray-400 mt-1">Acompanhe seus objetivos e planeje seu futuro financeiro</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex">
                <button 
                  className={`px-4 py-2 text-sm rounded-lg ${filterStatus === 'all' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setFilterStatus('all')}
                >
                  Todas
                </button>
                <button 
                  className={`px-4 py-2 text-sm rounded-lg ${filterStatus === 'active' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Ativas
                </button>
                <button 
                  className={`px-4 py-2 text-sm rounded-lg ${filterStatus === 'completed' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setFilterStatus('completed')}
                >
                  Concluídas
                </button>
              </div>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow-md shadow-emerald-900/10 transition-colors">
                <PlusIcon className="w-4 h-4 mr-1" />
                Nova Meta
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Progresso Total</p>
                  <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    {Math.round(overallProgress)}%
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatCurrency(totalSaved)} de {formatCurrency(totalTargets)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Metas Ativas</p>
                  <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    {activeGoals.length}
                  </h3>
                  <p className="text-xs text-emerald-400 mt-1">
                    {completedGoals.length} concluídas
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
                  <FlagIcon className="w-5 h-5" />
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Meta Mais Próxima</p>
                  <h3 className="text-lg font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 truncate">
                    {activeGoals.length > 0 ? activeGoals[0].name : 'Nenhuma meta ativa'}
                  </h3>
                  {activeGoals.length > 0 && activeGoals[0].targetDate && (
                    <p className="text-xs text-emerald-400 mt-1">
                      {formatDate(activeGoals[0].targetDate)}
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 text-white">
                  <CalendarIcon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Metas Ativas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Suas Metas</h2>
              <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center">
                <AdjustmentsHorizontalIcon className="w-4 h-4 mr-1" />
                Ordenar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGoals.length > 0 ? (
                filteredGoals.map(goal => (
                  <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onClick={() => setSelectedGoal(goal)} 
                  />
                ))
              ) : (
                <div className="col-span-3 p-8 text-center">
                  <p className="text-gray-400">
                    Nenhuma meta encontrada com os filtros selecionados
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sugestões de Metas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sugestões de Metas</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedGoals.map(goal => (
                <SuggestedGoal 
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  icon={goal.icon}
                  amount={goal.amount}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FinancialGoals;