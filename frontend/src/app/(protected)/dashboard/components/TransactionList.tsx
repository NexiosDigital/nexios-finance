// src/app/(protected)/transactions/components/TransactionList.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category_id: string;
  account_id: string;
  notes?: string;
  is_recurring: boolean;
  category?: {
    name: string;
    color: string;
    icon?: string;
  };
  account?: {
    name: string;
    type: string;
  };
};

type TransactionListProps = {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string, amount: number, accountId: string) => void;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export default function TransactionList({ 
  transactions, 
  isLoading, 
  onEdit, 
  onDelete 
}: TransactionListProps) {
  if (isLoading) {
    return <div className="p-6 text-center">Carregando transações...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400 mb-4">Nenhuma transação encontrada para os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4">Data</th>
            <th className="text-left py-3 px-4">Descrição</th>
            <th className="text-left py-3 px-4">Conta</th>
            <th className="text-left py-3 px-4">Categoria</th>
            <th className="text-right py-3 px-4">Valor</th>
            <th className="text-center py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id}
              className="border-b border-gray-800 hover:bg-gray-800/50"
            >
              <td className="py-3 px-4">{formatDate(transaction.date)}</td>
              <td className="py-3 px-4">
                <div>
                  <div>{transaction.description}</div>
                  {transaction.notes && (
                    <div className="text-sm text-gray-400">{transaction.notes}</div>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                {transaction.account?.name || 'Conta não definida'}
              </td>
              <td className="py-3 px-4">
                {transaction.category ? (
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: transaction.category.color }}
                    ></div>
                    {transaction.category.name}
                  </div>
                ) : (
                  'Sem categoria'
                )}
              </td>
              <td
                className={`py-3 px-4 text-right font-medium ${
                  transaction.amount >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(transaction)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(transaction.id, transaction.amount, transaction.account_id)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// src/app/(protected)/transactions/components/TransactionForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type Account = {
  id: string;
  name: string;
  type: string;
};

type Category = {
  id: string;
  name: string;
  type: string;
  color: string;
  icon?: string;
};

type Transaction = {
  id?: string;
  date: string;
  description: string;
  amount: number;
  category_id: string;
  account_id: string;
  notes?: string;
  is_recurring: boolean;
};

type TransactionFormProps = {
  accounts: Account[];
  categories: Category[];
  initialData: Transaction | null;
  onSubmit: (data: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
};

export default function TransactionForm({
  accounts,
  categories,
  initialData,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    category_id: '',
    account_id: accounts.length > 0 ? accounts[0].id : '',
    notes: '',
    is_recurring: false,
  });

  const [selectedTransactionType, setSelectedTransactionType] = useState<'income' | 'expense'>('expense');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with initialData if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        description: initialData.description,
        amount: Math.abs(initialData.amount), // Always display positive in form
        category_id: initialData.category_id,
        account_id: initialData.account_id,
        notes: initialData.notes || '',
        is_recurring: initialData.is_recurring,
      });
      
      // Set transaction type based on amount
      setSelectedTransactionType(initialData.amount >= 0 ? 'income' : 'expense');
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else if (name === 'amount') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCategoryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTransactionType(e.target.value as 'income' | 'expense');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }
    
    if (!formData.category_id) {
      newErrors.category_id = 'Categoria é obrigatória';
    }
    
    if (!formData.account_id) {
      newErrors.account_id = 'Conta é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Copy form data
    const submissionData = { ...formData };
    
    // Adjust amount based on transaction type
    if (selectedTransactionType === 'expense') {
      submissionData.amount = -Math.abs(submissionData.amount);
    }
    
    onSubmit(submissionData);
  };

  // Filter categories based on selected transaction type
  const filteredCategories = categories.filter(
    category => category.type === (selectedTransactionType === 'income' ? 'income' : 'expense')
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tipo de Transação</label>
          <Select
            value={selectedTransactionType}
            onChange={handleCategoryTypeChange}
            className={errors.type ? 'border-red-500' : ''}
          >
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </Select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Data</label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Conta</label>
          <Select
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            className={errors.account_id ? 'border-red-500' : ''}
          >
            <option value="">Selecione uma conta</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>
          {errors.account_id && <p className="text-red-500 text-xs mt-1">{errors.account_id}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Categoria</label>
          <Select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className={errors.category_id ? 'border-red-500' : ''}
          >
            <option value="">Selecione uma categoria</option>
            {filteredCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Descrição</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva a transação"
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Valor (R$)</label>
          <Input
            type="number"
            name="amount"
            value={formData.amount.toString()}
            onChange={handleChange}
            placeholder="0,00"
            step="0.01"
            min="0"
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Observações (opcional)</label>
        <Input
          type="text"
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          placeholder="Adicione detalhes adicionais"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_recurring"
            checked={formData.is_recurring}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Transação recorrente</span>
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Salvar'} Transação
        </Button>
      </div>
    </form>
  );
}

// src/app/(protected)/transactions/components/TransactionFilters.tsx
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

type Account = {
  id: string;
  name: string;
  type: string;
};

type Category = {
  id: string;
  name: string;
  type: string;
  color: string;
  icon?: string;
};

type FiltersType = {
  dateRange: { startDate: string; endDate: string };
  accounts: string[];
  categories: string[];
  type: 'all' | 'income' | 'expense';
  search: string;
};

type TransactionFiltersProps = {
  accounts: Account[];
  categories: Category[];
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
};

export default function TransactionFilters({
  accounts,
  categories,
  filters,
  onFilterChange,
}: TransactionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FiltersType>(filters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'startDate' || name === 'endDate') {
      setTempFilters({
        ...tempFilters,
        dateRange: {
          ...tempFilters.dateRange,
          [name]: value,
        },
      });
    } else if (name === 'search' || name === 'type') {
      setTempFilters({
        ...tempFilters,
        [name]: value,
      });
    }
  };

  const handleAccountToggle = (accountId: string) => {
    setTempFilters(prev => {
      const updatedAccounts = prev.accounts.includes(accountId)
        ? prev.accounts.filter(id => id !== accountId)
        : [...prev.accounts, accountId];
        
      return {
        ...prev,
        accounts: updatedAccounts,
      };
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setTempFilters(prev => {
      const updatedCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
        
      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: FiltersType = {
      dateRange: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      },
      accounts: [],
      categories: [],
      type: 'all',
      search: '',
    };
    
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Predefined periods
  const setPeriod = (period: 'currentMonth' | 'lastMonth' | 'last3Months' | 'currentYear') => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;
    
    switch (period) {
      case 'currentMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last3Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'currentYear':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    setTempFilters({
      ...tempFilters,
      dateRange: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    });
  };

  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">Filtros</h3>
            <button
              className="text-sm text-gray-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="text"
              name="search"
              value={tempFilters.search}
              onChange={handleInputChange}
              placeholder="Buscar transações..."
              className="w-48"
            />
            <Button onClick={handleApplyFilters}>Aplicar</Button>
          </div>
        </div>
        
        {isOpen && (
          <div className="border-t border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Período</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setPeriod('currentMonth')}
                  >
                    Mês Atual
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setPeriod('lastMonth')}
                  >
                    Mês Anterior
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setPeriod('last3Months')}
                  >
                    Últimos 3 Meses
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setPeriod('currentYear')}
                  >
                    Ano Atual
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">De:</label>
                    <Input
                      type="date"
                      name="startDate"
                      value={tempFilters.dateRange.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Até:</label>
                    <Input
                      type="date"
                      name="endDate"
                      value={tempFilters.dateRange.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Tipo</h4>
                <Select
                  name="type"
                  value={tempFilters.type}
                  onChange={handleInputChange}
                >
                  <option value="all">Todos</option>
                  <option value="income">Receitas</option>
                  <option value="expense">Despesas</option>
                </Select>
                
                <h4 className="text-sm font-medium mt-4 mb-2">Contas</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {accounts.map((account) => (
                    <label key={account.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters.accounts.includes(account.id)}
                        onChange={() => handleAccountToggle(account.id)}
                        className="mr-2"
                      />
                      <span className="text-sm">{account.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Categorias</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters.categories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-2 border-t border-gray-700">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetFilters}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}