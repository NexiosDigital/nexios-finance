// src/app/(protected)/transactions/components/TransactionFilters.tsx
'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { 
  Calendar, 
  Filter, 
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

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

type DateRange = {
  startDate: string
  endDate: string
}

type FilterOptions = {
  dateRange: DateRange
  type: 'all' | 'income' | 'expense'
  accounts: string[]
  categories: string[]
  search: string
}

type TransactionFiltersProps = {
  accounts: Account[]
  categories: Category[]
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

export default function TransactionFilters({
  accounts,
  categories,
  filters,
  onFilterChange
}: TransactionFiltersProps) {
  const [expanded, setExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)

  // Atualizar filtros locais quando os props mudam
  React.useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'search') {
      setLocalFilters((prev) => ({
        ...prev,
        search: value
      }))
    } else if (name === 'type') {
      setLocalFilters((prev) => ({
        ...prev,
        type: value as 'all' | 'income' | 'expense'
      }))
    } else if (name === 'startDate' || name === 'endDate') {
      setLocalFilters((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [name]: value
        }
      }))
    }
  }

  const handleAccountToggle = (accountId: string) => {
    setLocalFilters((prev) => {
      const isSelected = prev.accounts.includes(accountId)
      const updatedAccounts = isSelected
        ? prev.accounts.filter((id) => id !== accountId)
        : [...prev.accounts, accountId]

      return {
        ...prev,
        accounts: updatedAccounts
      }
    })
  }

  const handleCategoryToggle = (categoryId: string) => {
    setLocalFilters((prev) => {
      const isSelected = prev.categories.includes(categoryId)
      const updatedCategories = isSelected
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId]

      return {
        ...prev,
        categories: updatedCategories
      }
    })
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
  }

  const resetFilters = () => {
    const resetFilters: FilterOptions = {
      dateRange: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      },
      type: 'all',
      accounts: [],
      categories: [],
      search: ''
    }
    
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  // Opções de período predefinidas
  const predefinedPeriods = [
    {
      label: 'Este mês',
      action: () => {
        const now = new Date()
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        const endDate = new Date()
        
        setLocalFilters((prev) => ({
          ...prev,
          dateRange: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }))
      }
    },
    {
      label: 'Mês anterior',
      action: () => {
        const now = new Date()
        const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        
        setLocalFilters((prev) => ({
          ...prev,
          dateRange: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }))
      }
    },
    {
      label: 'Últimos 3 meses',
      action: () => {
        const now = new Date()
        const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1)
        const endDate = new Date()
        
        setLocalFilters((prev) => ({
          ...prev,
          dateRange: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }))
      }
    },
    {
      label: 'Este ano',
      action: () => {
        const now = new Date()
        const startDate = new Date(now.getFullYear(), 0, 1)
        const endDate = new Date()
        
        setLocalFilters((prev) => ({
          ...prev,
          dateRange: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }))
      }
    }
  ]

  return (
    <Card className="mb-6">
      <div className="p-4">
        {/* Cabeçalho com busca e toggle de expansão */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setExpanded(!expanded)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {expanded ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            
            <Input
              type="text"
              name="search"
              value={localFilters.search}
              onChange={handleInputChange}
              placeholder="Buscar transações..."
              className="w-full md:w-64"
            />
          </div>
          
          <div className="flex items-center">
            <Button variant="primary" onClick={applyFilters} className="mr-2">
              Aplicar Filtros
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          </div>
        </div>
        
        {/* Conteúdo expandido dos filtros */}
        {expanded && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Período */}
              <div>
                <h3 className="font-medium text-sm mb-3 text-gray-300">Período</h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {predefinedPeriods.map((period, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={period.action}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      De:
                    </label>
                    <Input
                      type="date"
                      name="startDate"
                      value={localFilters.dateRange.startDate}
                      onChange={handleInputChange}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Até:
                    </label>
                    <Input
                      type="date"
                      name="endDate"
                      value={localFilters.dateRange.endDate}
                      onChange={handleInputChange}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tipo e Contas */}
              <div>
                <div className="mb-4">
                  <h3 className="font-medium text-sm mb-2 text-gray-300">Tipo</h3>
                  <Select
                    name="type"
                    value={localFilters.type}
                    onChange={handleInputChange}
                  >
                    <option value="all">Todos</option>
                    <option value="income">Receitas</option>
                    <option value="expense">Despesas</option>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm mb-2 text-gray-300">Contas</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {accounts.map((account) => (
                      <label key={account.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={localFilters.accounts.includes(account.id)}
                          onChange={() => handleAccountToggle(account.id)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-700 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">{account.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Categorias */}
              <div>
                <h3 className="font-medium text-sm mb-2 text-gray-300">Categorias</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.categories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-700 rounded"
                      />
                      <div className="ml-2 flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm text-gray-300">{category.name}</span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({category.type === 'income' ? 'Receita' : 'Despesa'})
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}