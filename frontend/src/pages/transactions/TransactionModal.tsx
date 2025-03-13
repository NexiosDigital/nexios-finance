import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Transaction, Category, supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { format } from 'date-fns';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  categories: Category[];
  onSuccess?: () => void;
}

export function TransactionModal({
  isOpen,
  onClose,
  transaction,
  categories,
  onSuccess
}: TransactionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Estado local para o formulário
  const [formData, setFormData] = useState<{
    description: string;
    amount: string;
    date: string;
    category_id: string;
    notes: string;
    is_income: boolean;
  }>({
    description: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category_id: '',
    notes: '',
    is_income: false
  });
  
  // Inicializar o formulário quando o componente montar ou quando a transação mudar
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || '',
        amount: String(Math.abs(transaction.amount)),
        date: transaction.date,
        category_id: transaction.category_id || '',
        notes: transaction.notes || '',
        is_income: transaction.amount > 0
      });
    } else {
      // Valores padrão para nova transação
      setFormData({
        description: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        category_id: '',
        notes: '',
        is_income: false
      });
    }
  }, [transaction]);

  // Atualizar um campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Alternar entre despesa e receita
  const toggleTransactionType = () => {
    setFormData((prev) => ({ ...prev, is_income: !prev.is_income }));
  };

  // Formatar o valor monetário para exibição
  const formatCurrency = (value: string) => {
    if (!value) return '';
    
    const numericValue = value.replace(/\D/g, '');
    const floatValue = parseInt(numericValue) / 100;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(floatValue);
  };

  // Manipular input de valor monetário
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, amount: value }));
  };

  // Salvar a transação
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Usuário não autenticado.');
      return;
    }
    
    if (!formData.description) {
      setError('Descrição é obrigatória.');
      return;
    }
    
    if (!formData.amount) {
      setError('Valor é obrigatório.');
      return;
    }
    
    if (!formData.date) {
      setError('Data é obrigatória.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Converter o valor para número e aplicar o sinal (positivo/negativo)
      const numericAmount = parseInt(formData.amount) / 100;
      const signedAmount = formData.is_income ? numericAmount : -numericAmount;
      
      // Preparar os dados da transação
      const transactionData = {
        user_id: user.id,
        description: formData.description,
        amount: signedAmount,
        date: formData.date,
        category_id: formData.category_id || null,
        notes: formData.notes || null,
        is_recurring: false,
      };
      
      let result;
      
      if (transaction) {
        // Atualizar transação existente
        result = await supabase
          .from('transactions')
          .update(transactionData)
          .eq('id', transaction.id);
        
        if (result.error) throw result.error;
        
        setSuccess('Transação atualizada com sucesso!');
      } else {
        // Inserir nova transação
        result = await supabase
          .from('transactions')
          .insert([transactionData]);
        
        if (result.error) throw result.error;
        
        setSuccess('Transação adicionada com sucesso!');
      }
      
      // Chamar o callback de sucesso após um breve delay para mostrar a mensagem
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
      
    } catch (err: any) {
      console.error('Erro ao salvar transação:', err);
      setError(err.message || 'Ocorreu um erro ao salvar a transação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Excluir a transação
  const handleDelete = async () => {
    if (!transaction || !user) return;
    
    if (!confirm('Tem certeza que deseja excluir esta transação?')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transaction.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setSuccess('Transação excluída com sucesso!');
      
      // Chamar o callback de sucesso após um breve delay para mostrar a mensagem
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
      
    } catch (err: any) {
      console.error('Erro ao excluir transação:', err);
      setError(err.message || 'Ocorreu um erro ao excluir a transação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay de fundo */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      {/* Container do modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card shadow-xl">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between p-6 border-b dark:border-dark-border">
            <Dialog.Title className="text-lg font-semibold">
              {transaction ? 'Editar Transação' : 'Nova Transação'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Conteúdo do formulário */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {error && (
                <Alert
                  variant="error"
                  description={error}
                  onClose={() => setError(null)}
                />
              )}
              
              {success && (
                <Alert
                  variant="success"
                  description={success}
                />
              )}
              
              {/* Botões de tipo (Despesa/Receita) */}
              <div className="flex space-x-4 mb-4">
                <Button
                  type="button"
                  variant={!formData.is_income ? 'primary' : 'outline'}
                  className="flex-1"
                  onClick={() => setFormData((prev) => ({ ...prev, is_income: false }))}
                >
                  Despesa
                </Button>
                <Button
                  type="button"
                  variant={formData.is_income ? 'primary' : 'outline'}
                  className="flex-1"
                  onClick={() => setFormData((prev) => ({ ...prev, is_income: true }))}
                >
                  Receita
                </Button>
              </div>
              
              {/* Campo de valor */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valor
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="amount"
                    value={formatCurrency(formData.amount)}
                    onChange={handleAmountChange}
                    className="w-full px-4 py-3 rounded-xl border dark:border-dark-border dark:bg-dark-surface dark:text-text-primary focus:ring-2 focus:ring-primary focus:border-primary text-xl font-semibold text-center"
                    required
                  />
                </div>
              </div>
              
              {/* Campo de descrição */}
              <Input
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex: Mercado, Salário, Conta de Luz..."
                required
              />
              
              {/* Data da transação */}
              <Input
                type="date"
                label="Data"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              
              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium dark:text-text-primary text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-border dark:bg-dark-surface dark:text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories
                    .filter(cat => formData.is_income ? cat.type === 'income' : cat.type === 'expense')
                    .map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              {/* Observações */}
              <div>
                <label className="block text-sm font-medium dark:text-text-primary text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-border dark:bg-dark-surface dark:text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Observações opcionais..."
                />
              </div>
            </div>
            
            {/* Rodapé com botões */}
            <div className="px-6 py-4 border-t dark:border-dark-border flex items-center justify-between">
              {transaction && (
                <Button
                  type="button"
                  variant="outline"
                  leftIcon={<TrashIcon className="w-5 h-5" />}
                  onClick={handleDelete}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Excluir
                </Button>
              )}
              
              <div className={transaction ? '' : 'ml-auto'}>
                <Button
                  type="submit"
                  isLoading={loading}
                  leftIcon={<PlusIcon className="w-5 h-5" />}
                >
                  {transaction ? 'Salvar Alterações' : 'Adicionar Transação'}
                </Button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}