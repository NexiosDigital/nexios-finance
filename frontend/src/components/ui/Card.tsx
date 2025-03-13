import React, { HTMLAttributes, ReactNode } from 'react';

// Props do componente Card
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glassEffect?: boolean;
  hoverable?: boolean;
  className?: string;
}

// Componente Card principal
export const Card: React.FC<CardProps> = ({
  children,
  glassEffect = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  // Estilos base
  const baseStyles = 'rounded-xl transition-all';
  
  // Efeitos
  const effectStyles = {
    glass: 'bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10',
    glassDark: 'bg-black bg-opacity-20 backdrop-blur-lg border border-white border-opacity-5',
    default: 'bg-white dark:bg-dark-card shadow-md',
    hoverable: 'hover:shadow-lg dark:hover:shadow-xl transform hover:-translate-y-1',
  };
  
  // Montar classes
  const cardClasses = [
    baseStyles,
    glassEffect ? 'dark:' + effectStyles.glassDark + ' ' + effectStyles.glass : effectStyles.default,
    hoverable && effectStyles.hoverable,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Componente CardHeader
export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = ''
}) => {
  return (
    <div className={`px-6 py-5 flex items-center ${className}`}>
      {icon && (
        <div className="mr-4 text-primary-dark dark:text-primary-light">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

// Componente CardContent
export interface CardContentProps {
  children: ReactNode;
  noPadding?: boolean;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  noPadding = false,
  className = ''
}) => {
  return (
    <div className={`${noPadding ? '' : 'px-6 py-4'} ${className}`}>
      {children}
    </div>
  );
};

// Componente CardFooter
export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`px-6 py-3 border-t dark:border-dark-border ${className}`}>
      {children}
    </div>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter
});