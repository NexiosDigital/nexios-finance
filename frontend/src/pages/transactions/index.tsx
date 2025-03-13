import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { getUserTransactions, getUserCategories, Transaction, Category } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import {
  CreditCardIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { format, parseISO, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TransactionModal } from '@/components/transactions/TransactionModal';

// Ícones para categorias
const CategoryIcon = ({ category }: { category?: { color?: string; icon?: string; name?: string } }) => {
  if (!category) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-border flex items-center justify-center">
        <span className="text-gray-500 dark:text-text-secondary">?</span>
      </div>
    );
  }

  return (
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center" 
      style={{ 
        backgroundColor: category.color ? `${category.color}20` : '#0EAE7B20'
      }}
    >
      <span 
        className="text-sm font-medium"
        style={{ color: category.color || '#0EAE7B' }}
      >
        {category.icon || category.name?.charAt(0) || '?'}
      </span>
    </div>
  );
};

export default function TransactionsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<'thisMonth' | 'lastMonth' | 'last3Months' | 'custom'>('thisMonth');
  
  // Estado para a transação selecionada (para edição)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Definir filtros de data padrão (mês atual)
  const [dateRange, setDateRange] = useState({
    from: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    to: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });
  
  // Estados para filtros
  const [filters, setFilters] = useState({
    type: 'all', // 'all', 'income', 'expense'
    categoryId: '',
    amountMin: '',
    amountMax: '',
  });
  
  // Estado para mostrar/esconder o painel de filtros
  const [showFilters, setShowFilters] = useState(false);
  
  // Tamanho da página para paginação
  const itemsPerPage = 10;
  
  // Função para abrir o modal de transação
  const openTransactionModal = (transaction: Transaction | null = null) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Função para fechar o modal de transação
  const closeTransactionModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  // Buscar transações e categorias
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Buscar categorias do usuário
        const userCategories = await getUserCategories(user.id);
        setCategories(userCategories);
        
        // Buscar transações do usuário com filtro de data
        const userTransactions = await getUserTransactions(
          user.id,
          {
            dateFrom: dateRange.from,
            dateTo: dateRange.to
          }
        );
        
        setTransactions(userTransactions);
        setFilteredTransactions(userTransactions);
      } catch (error) {
        console.error('Erro ao buscar dados de transações:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, dateRange]);

  // Atualizar período selecionado
  const updatePeriod = (period: 'thisMonth' | 'lastMonth' | 'last3Months' | 'custom') => {
    setSelectedPeriod(period);
    
    let fromDate, toDate;
    const now = new Date();
    
    switch (period) {
      case 'thisMonth':
        fromDate = startOfMonth(now);
        toDate = endOfMonth(now);
        break;
      case 'lastMonth':
        fromDate = startOfMonth(subMonths(now, 1));
        toDate = endOfMonth(subMonths(now, 1));
        break;
      case 'last3Months':
        fromDate = startOfMonth(subMonths(now, 2));
        toDate = endOfMonth(now);
        break;
      case 'custom':
        // Não alterar datas para período personalizado
        return;
    }
    
    setDateRange({
      from: format(fromDate, 'yyyy-MM-dd'),
      to: format(toDate, 'yyyy-MM-dd')
    });
  };

  // Aplicar filtros
  useEffect(() => {
    if (transactions.length === 0) return;
    
    let filtered = [...transactions];
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(
        transaction => 
          transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por tipo (receita/despesa)
    if (filters.type !== 'all') {
      filtered = filtered.filter(transaction => 
        filters.type === 'income' ? transaction.amount > 0 : transaction.amount < 0
      );
    }
    
    // Filtrar por categoria
    if (filters.categoryId) {
      filtered = filtered.filter(transaction => 
        transaction.category_id === filters.categoryId
      );
    }
    
    // Filtrar por valor mínimo
    if (filters.amountMin) {
      const minAmount = parseFloat(filters.amountMin);
      filtered = filtered.filter(transaction => 
        Math.abs(transaction.amount) >= minAmount
      );
    }
    
    // Filtrar por valor máximo
    if (filters.amountMax) {
      const maxAmount = parseFloat(filters.amountMax);
      filtered = filtered.filter(transaction => 
        Math.abs(transaction.amount) <= maxAmount
      );
    }
    
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Voltar para a primeira página ao filtrar
  }, [transactions, searchTerm, filters]);

  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular total de receitas
  const totalIncome = filteredTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calcular total de despesas
  const totalExpense = filteredTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  // Calcular saldo do período
  const balance = totalIncome - totalExpense;

  // Calcular paginação
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: 'all',
      categoryId: '',
      amountMin: '',
      amountMax: ''
    });
  };

  // Adicionar nova transação (será implementado com o modal)
  const handleAddTransaction = async (transaction: Partial<Transaction>) => {
    // Implementar no componente TransactionModal
    closeTransactionModal();
    // Recarregar transações após adicionar
    // ... (código para recarregar transações)
  };

  return (
    <Layout title="Transações">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Transações</h1>
            <p className="text-gray-500 dark:text-text-secondary">
              Gerencie suas receitas e despesas
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => openTransactionModal()}
              leftIcon={<PlusIcon className="w-5 h-5" />}
            >
              Nova Transação
            </Button>
          </div>
        </div>
        
        {/* Filtros e Resumo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Seletores de período */}
          <Card className="col-span-1 lg:col-span-4">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={selectedPeriod === 'thisMonth' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => updatePeriod('thisMonth')}
                  >
                    Este Mês
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'lastMonth' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => updatePeriod('lastMonth')}
                  >
                    Mês Passado
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'last3Months' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => updatePeriod('last3Months')}
                  >
                    Últimos 3 Meses
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'custom' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('custom')}
                  >
                    Personalizado
                  </Button>
                </div>
                
                {selectedPeriod === 'custom' && (
                  <div className="flex space-x-2">
                    <div>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        label="De"
                        containerClassName="mb-0"
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        label="Até"
                        containerClassName="mb-0"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Resumo financeiro do período */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-primary-reverse p-4 rounded-xl text-white">
                  <p className="text-sm opacity-80">Receitas</p>
                  <p className="text-2xl font-semibold mt-1">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="bg-gradient-dark p-4 rounded-xl text-white">
                  <p className="text-sm opacity-80">Despesas</p>
                  <p className="text-2xl font-semibold mt-1">{formatCurrency(totalExpense)}</p>
                </div>
                <div className={`p-4 rounded-xl text-white ${balance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                  <p className="text-sm opacity-80">Saldo</p>
                  <p className="text-2xl font-semibold mt-1">{formatCurrency(balance)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lista de transações */}
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader
              title="Lista de Transações"
              icon={<CreditCardIcon className="w-5 h-5" />}
              action={
                <div className="flex space-x-2">
                  <div className="relative">
                    <Input
                      placeholder="Buscar transações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                      containerClassName="mb-0"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    leftIcon={<FunnelIcon className="w-5 h-5" />}
                  >
                    Filtros
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    leftIcon={<ArrowPathIcon className="w-5 h-5" />}
                  >
                    Limpar
                  </Button>
                </div>
              }
            />
            
            {/* Painel de filtros (expandível) */}
            {showFilters && (
              <div className="px-6 py-4 border-b dark:border-dark-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border dark:border-dark-border dark:bg-dark-surface focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">Todos</option>
                      <option value="income">Receitas</option>
                      <option value="expense">Despesas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <select
                      value={filters.categoryId}
                      onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border dark:border-dark-border dark:bg-dark-surface focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Todas as categorias</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor mínimo</label>
                    <Input
                      type="number"
                      value={filters.amountMin}
                      onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
                      placeholder="R$ 0,00"
                      containerClassName="mb-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor máximo</label>
                    <Input
                      type="number"
                      value={filters.amountMax}
                      onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
                      placeholder="R$ 0,00"
                      containerClassName="mb-0"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <CardContent noPadding>
              {loading ? (
                <div className="p-8 text-center">
                  <p className="dark:text-text-secondary text-gray-500">Carregando transações...</p>
                </div>
              ) : filteredTransactions.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="dark:text-text-secondary text-gray-500">Nenhuma transação encontrada.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-dark-surface">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                      {paginatedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {format(parseISO(transaction.date), 'dd/MM/yyyy')}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center">
                              <CategoryIcon category={transaction.categories} />
                              <span className="ml-3">{transaction.description || 'Sem descrição'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {transaction.categories?.name || 'Sem categoria'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                            <span className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                              {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openTransactionModal(transaction)}
                            >
                              <EllipsisHorizontalIcon className="w-5 h-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Paginação */}
              {filteredTransactions.length > 0 && (
                <div className="px-6 py-4 flex items-center justify-between border-t dark:border-dark-border">
                  <div className="text-sm dark:text-text-secondary text-gray-500">
                    Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} de {filteredTransactions.length} resultados
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      rightIcon={<ChevronRightIcon className="w-4 h-4" />}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modal para adicionar/editar transação */}
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={closeTransactionModal}
          transaction={selectedTransaction}
          categories={categories}
        />
      )}
    </Layout>
  );
}