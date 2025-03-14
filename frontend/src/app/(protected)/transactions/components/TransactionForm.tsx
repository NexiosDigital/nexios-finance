// src/app/(protected)/transactions/components/TransactionForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

type Account = {
  id: string
  name: string
  type: string
}

type Category = {
  id: string
  name: string
  type: string
  color: string
  icon?: string
}

type TransactionData = {
  date: string
  description: string
  amount: number
  category_id: string
  account_id: string
  notes?: string
  is_recurring: boolean
}

type TransactionFormProps = {
  accounts: Account[]
  categories: Category[]
  initialData?: Partial<TransactionData>
  onSubmit: (data: TransactionData) => Promise<void>
  onCancel: () => void
}

export default function TransactionForm({
  accounts,
  categories,
  initialData,
  onSubmit,
  onCancel
}: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionData>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    category_id: '',
    account_id: accounts.length > 0 ? accounts[0].id : '',
    notes: '',
    is_recurring: false
  })

  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Inicializar o formulário com dados iniciais, se fornecidos
  useEffect(() => {
    if (initialData) {
      const isIncome = initialData.amount ? initialData.amount > 0 : false
      
      setFormData({
        date: initialData.date || new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        amount: initialData.amount ? Math.abs(initialData.amount) : 0,
        category_id: initialData.category_id || '',
        account_id: initialData.account_id || (accounts.length > 0 ? accounts[0].id : ''),
        notes: initialData.notes || '',
        is_recurring: initialData.is_recurring || false
      })
      
      setTransactionType(isIncome ? 'income' : 'expense')
    }
  }, [initialData, accounts])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData({ ...formData, [name]: target.checked })
    } else if (name === 'amount') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    
    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero'
    }
    
    if (!formData.category_id) {
      newErrors.category_id = 'Categoria é obrigatória'
    }
    
    if (!formData.account_id) {
      newErrors.account_id = 'Conta é obrigatória'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Ajustar o valor com base no tipo de transação
      const adjustedAmount = transactionType === 'expense' 
        ? -Math.abs(formData.amount) 
        : Math.abs(formData.amount)
      
      await onSubmit({
        ...formData,
        amount: adjustedAmount
      })
    } catch (error) {
      console.error('Erro ao submeter o formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtrar categorias com base no tipo de transação
  const filteredCategories = categories.filter(
    cat => 
      (transactionType === 'income' && cat.type === 'income') || 
      (transactionType === 'expense' && cat.type === 'expense')
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo de Transação (Despesa/Receita) */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={transactionType === 'expense' ? 'primary' : 'outline'}
          onClick={() => setTransactionType('expense')}
          className="w-full"
        >
          Despesa
        </Button>
        <Button
          type="button"
          variant={transactionType === 'income' ? 'primary' : 'outline'}
          onClick={() => setTransactionType('income')}
          className="w-full"
        >
          Receita
        </Button>
      </div>

      {/* Campos do formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Valor</label>
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

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ex: Mercado, Aluguel, Salário..."
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Conta</label>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Observações (opcional)</label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
          placeholder="Adicione detalhes adicionais sobre esta transação..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_recurring"
          name="is_recurring"
          checked={formData.is_recurring}
          onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-700 rounded"
        />
        <label htmlFor="is_recurring" className="ml-2 block text-sm text-gray-300">
          Transação recorrente
        </label>
      </div>

      <div className="flex space-x-3 justify-end pt-4">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {initialData?.description ? 'Atualizar' : 'Adicionar'} Transação
        </Button>
      </div>
    </form>
  )
}