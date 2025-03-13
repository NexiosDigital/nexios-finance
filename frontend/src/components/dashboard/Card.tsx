// src/components/dashboard/Card.tsx
import React from 'react';
import classNames from 'classnames';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
};

export function Card({ children, className, glassEffect = false }: CardProps) {
  return (
    <div
      className={classNames(
        'rounded-2xl transition-all animate-fade-in',
        {
          'glass dark:glass-dark': glassEffect,
          'bg-white dark:bg-dark-card shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover': !glassEffect,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

// src/components/dashboard/CardHeader.tsx
import React from 'react';
import classNames from 'classnames';

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function CardHeader({ 
  title, 
  subtitle, 
  icon, 
  action,
  className 
}: CardHeaderProps) {
  return (
    <div className={classNames('px-6 py-5 flex items-center', className)}>
      {icon && (
        <div className="mr-4 text-primary-dark dark:text-primary-light">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm dark:text-text-secondary text-gray-500">{subtitle}</p>
        )}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

// src/components/dashboard/CardContent.tsx
import React from 'react';
import classNames from 'classnames';

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

export function CardContent({ 
  children, 
  className,
  noPadding = false
}: CardContentProps) {
  return (
    <div 
      className={classNames(
        { 'px-6 py-4': !noPadding },
        className
      )}
    >
      {children}
    </div>
  );
}

// src/components/dashboard/CardFooter.tsx
import React from 'react';
import classNames from 'classnames';

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div 
      className={classNames(
        'px-6 py-3 border-t dark:border-dark-border', 
        className
      )}
    >
      {children}
    </div>
  );
}

// src/components/dashboard/StatCard.tsx
import React from 'react';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  isPercent?: boolean;
  isCurrency?: boolean;
  glassEffect?: boolean;
  className?: string;
};

export function StatCard({
  title,
  value,
  icon,
  change,
  isPercent = false,
  isCurrency = false,
  glassEffect = false,
  className,
}: StatCardProps) {
  // Formatar o valor se for moeda
  const formattedValue = isCurrency 
    ? new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      }).format(Number(value))
    : isPercent 
      ? `${value}%` 
      : value;
  
  // Determinar se a mudança é positiva, negativa ou neutra
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <Card glassEffect={glassEffect} className={className}>
      <CardContent>
        <div className="flex items-start">
          {icon && (
            <div className="mr-4 p-2 rounded-xl bg-primary-light/10 text-primary">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm dark:text-text-secondary text-gray-500">{title}</p>
            <h4 className="text-2xl font-semibold mt-1">{formattedValue}</h4>
            
            {change !== undefined && (
              <div className="flex items-center mt-1">
                <div 
                  className={classNames(
                    'flex items-center text-xs',
                    {
                      'text-green-500': isPositive,
                      'text-red-500': isNegative,
                      'text-gray-500 dark:text-text-secondary': !isPositive && !isNegative,
                    }
                  )}
                >
                  {isPositive ? (
                    <ArrowUpIcon className="w-3 h-3 mr-1" />
                  ) : isNegative ? (
                    <ArrowDownIcon className="w-3 h-3 mr-1" />
                  ) : null}
                  <span>
                    {Math.abs(change).toFixed(1)}% {isPositive ? 'aumento' : isNegative ? 'redução' : 'sem alteração'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// src/components/dashboard/ChartCard.tsx
import React from 'react';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { ResponsiveContainer } from 'recharts';

type ChartCardProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  glassEffect?: boolean;
  className?: string;
};

export function ChartCard({
  title,
  subtitle,
  icon,
  action,
  children,
  glassEffect = false,
  className,
}: ChartCardProps) {
  return (
    <Card glassEffect={glassEffect} className={className}>
      <CardHeader 
        title={title} 
        subtitle={subtitle} 
        icon={icon} 
        action={action} 
      />
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// src/components/dashboard/InsightCard.tsx
import React from 'react';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type InsightCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  actionLink?: string;
  priority?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  glassEffect?: boolean;
  className?: string;
};

export function InsightCard({
  title,
  description,
  icon = <LightBulbIcon className="w-5 h-5" />,
  actionText,
  actionLink,
  priority = 'medium',
  onClick,
  glassEffect = false,
  className,
}: InsightCardProps) {
  // Determinar cores baseadas na prioridade
  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-500',
    medium: 'bg-amber-500/10 text-amber-500',
    high: 'bg-red-500/10 text-red-500',
  };
  
  return (
    <Card 
      glassEffect={glassEffect} 
      className={className}
      onClick={onClick}
    >
      <CardContent>
        <div className="flex">
          <div className={`p-2 rounded-xl mr-4 ${priorityColors[priority]}`}>
            {icon}
          </div>
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm dark:text-text-secondary text-gray-500 mt-1">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
      
      {actionText && actionLink && (
        <CardFooter>
          <Link
            href={actionLink}
            className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            {actionText} →
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

// src/components/dashboard/TransactionList.tsx
import React from 'react';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: {
    name: string;
    color: string;
    icon?: string;
  };
};

type TransactionListProps = {
  transactions: Transaction[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  limit?: number;
  className?: string;
};

export function TransactionList({
  transactions,
  title = 'Transações Recentes',
  subtitle = 'Suas últimas movimentações',
  showViewAll = true,
  limit = 5,
  className,
}: TransactionListProps) {
  // Limitar o número de transações exibidas
  const limitedTransactions = transactions.slice(0, limit);
  
  return (
    <Card className={className}>
      <CardHeader
        title={title}
        subtitle={subtitle}
        icon={<CreditCardIcon className="w-5 h-5" />}
      />
      <CardContent noPadding>
        <div className="divide-y dark:divide-dark-border">
          {limitedTransactions.length > 0 ? (
            limitedTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
              >
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mr-3" 
                    style={{ backgroundColor: `${transaction.category?.color}20` }}
                  >
                    <span 
                      className="text-sm" 
                      style={{ color: transaction.category?.color }}
                    >
                      {transaction.category?.icon || transaction.category?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs dark:text-text-secondary text-gray-500">
                      {format(new Date(transaction.date), "d 'de' MMMM", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <div 
                  className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
                >
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center dark:text-text-secondary text-gray-500">
              Não há transações para exibir.
            </div>
          )}
        </div>
      </CardContent>
      
      {showViewAll && transactions.length > 0 && (
        <CardFooter className="text-center">
          <Link 
            href="/transactions" 
            className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            Ver todas as transações →
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}