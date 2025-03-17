'use client';

import React, { useState } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  BellIcon, 
  PaintBrushIcon, 
  CreditCardIcon, 
  Cog6ToothIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  PhoneIcon,
  GlobeAltIcon,
  IdentificationIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { CheckIcon as CheckIconSolid } from '@heroicons/react/24/solid';

// Tipo para dados do usuário
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: string;
  membershipLevel: 'free' | 'premium';
  language: string;
  currency: string;
  timezone: string;
  twoFactorEnabled: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    budget: boolean;
    insights: boolean;
    marketing: boolean;
  };
  preferences: {
    theme: 'system' | 'light' | 'dark' | 'custom';
    accentColor: string;
    compactMode: boolean;
    autoExport: boolean;
  };
}

// Dados de exemplo para o perfil do usuário
const sampleUserProfile: UserProfile = {
  id: 'usr_12345',
  name: 'Rafael Mendes',
  email: 'rafael.mendes@email.com',
  phone: '+55 (11) 98765-4321',
  avatar: 'https://i.pravatar.cc/300?u=12345',
  memberSince: '2023-09-15',
  membershipLevel: 'premium',
  language: 'pt-BR',
  currency: 'BRL',
  timezone: 'America/Sao_Paulo',
  twoFactorEnabled: true,
  notifications: {
    email: true,
    push: true,
    budget: true,
    insights: true,
    marketing: false
  },
  preferences: {
    theme: 'dark',
    accentColor: '#10B981',
    compactMode: false,
    autoExport: true
  }
};

// Opções disponíveis
const themeOptions = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'custom', label: 'Personalizado' }
];

const accentColorOptions = [
  { value: '#10B981', label: 'Esmeralda' },
  { value: '#3B82F6', label: 'Azul' },
  { value: '#8B5CF6', label: 'Roxo' },
  { value: '#EC4899', label: 'Rosa' },
  { value: '#F59E0B', label: 'Âmbar' },
  { value: '#ef4444', label: 'Vermelho' }
];

const languageOptions = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español' }
];

const currencyOptions = [
  { value: 'BRL', label: 'Real (R$)' },
  { value: 'USD', label: 'Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' }
];

const timezoneOptions = [
  { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
  { value: 'America/New_York', label: 'Nova York (GMT-5/4)' },
  { value: 'Europe/London', label: 'Londres (GMT+0/1)' },
  { value: 'Asia/Tokyo', label: 'Tóquio (GMT+9)' }
];

// Funções utilitárias
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Componentes
const Card = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  );
};

const TabButton = ({ 
  active, 
  icon, 
  children, 
  onClick 
}: { 
  active: boolean; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2.5 rounded-lg text-sm ${
        active
          ? 'bg-emerald-600 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      <div className="mr-2">{icon}</div>
      {children}
    </button>
  );
};

const ToggleSwitch = ({ 
  enabled, 
  onChange 
}: { 
  enabled: boolean; 
  onChange: (enabled: boolean) => void;
}) => {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
        enabled ? 'bg-emerald-600' : 'bg-gray-600'
      }`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const Badge = ({ variant, children }: { variant: 'premium' | 'free'; children: React.ReactNode }) => {
  const bgColor = variant === 'premium' ? 'bg-gradient-to-r from-amber-400 to-yellow-600' : 'bg-gray-600';
  
  return (
    <span className={`px-2 py-0.5 text-xs font-medium text-white rounded-full ${bgColor}`}>
      {children}
    </span>
  );
};

const ColorSwatch = ({ 
  color, 
  selected, 
  onClick 
}: { 
  color: string; 
  selected: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={`relative w-8 h-8 rounded-full focus:outline-none ${selected ? 'ring-2 ring-white' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <CheckIconSolid className="w-4 h-4 text-white" />
        </span>
      )}
    </button>
  );
};

const PersonalInfoSection = ({ 
  profile, 
  onUpdate 
}: { 
  profile: UserProfile; 
  onUpdate: (updates: Partial<UserProfile>) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    onUpdate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || ''
    });
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Informações Pessoais</h2>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Editar
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center"
            >
              <XMarkIcon className="w-4 h-4 mr-1" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center"
            >
              <CheckIcon className="w-4 h-4 mr-1" />
              Salvar
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {profile.name.charAt(0)}
            </div>
            {!isEditing ? null : (
              <button className="absolute -bottom-2 -right-2 p-1.5 bg-gray-800 border border-gray-600 rounded-full text-gray-300 hover:text-white transition-colors">
                <PhotoIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="ml-4">
            <h3 className="text-lg font-medium">{profile.name}</h3>
            <div className="text-sm text-gray-400 flex items-center mt-0.5">
              <span>Membro desde {formatDate(profile.memberSince)}</span>
              <span className="mx-2">•</span>
              <Badge variant={profile.membershipLevel}>
                {profile.membershipLevel === 'premium' ? 'Premium' : 'Gratuito'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome</label>
            <div className="flex items-center">
              <div className="absolute ml-3 text-gray-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Telefone</label>
            <div className="flex items-center">
              <div className="absolute ml-3 text-gray-400">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="flex items-center">
              <div className="absolute ml-3 text-gray-400">
                <EnvelopeIcon className="h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs text-gray-400 mb-1">Nome</h4>
                <div className="text-sm font-medium flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {profile.name}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs text-gray-400 mb-1">Telefone</h4>
                <div className="text-sm font-medium flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {profile.phone || 'Não informado'}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-xs text-gray-400 mb-1">Email</h4>
                <div className="text-sm font-medium flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {profile.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PasswordSection = ({ onUpdate }: { onUpdate: () => void }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Alterar Senha</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Senha Atual</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showCurrent ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="pl-10 pr-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showCurrent ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Nova Senha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="pl-10 pr-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowNew(!showNew)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showNew ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-400">A senha deve ter pelo menos 8 caracteres e incluir letras, números e símbolos.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirmar Nova Senha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showConfirm ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Atualizar Senha
          </button>
        </div>
      </form>
    </div>
  );
};

const NotificationsSection = ({ 
  notifications, 
  onUpdate 
}: { 
  notifications: UserProfile['notifications']; 
  onUpdate: (updates: Partial<UserProfile['notifications']>) => void;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notificações</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notificações por E-mail</h3>
              <p className="text-sm text-gray-400 mt-1">Receba atualizações importantes por e-mail</p>
            </div>
            <ToggleSwitch
              enabled={notifications.email}
              onChange={(enabled) => onUpdate({ email: enabled })}
            />
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notificações Push</h3>
              <p className="text-sm text-gray-400 mt-1">Receba notificações diretamente no seu navegador</p>
            </div>
            <ToggleSwitch
              enabled={notifications.push}
              onChange={(enabled) => onUpdate({ push: enabled })}
            />
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Alertas de Orçamento</h3>
              <p className="text-sm text-gray-400 mt-1">Seja notificado quando estiver próximo do limite do orçamento</p>
            </div>
            <ToggleSwitch
              enabled={notifications.budget}
              onChange={(enabled) => onUpdate({ budget: enabled })}
            />
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Insights e Dicas</h3>
              <p className="text-sm text-gray-400 mt-1">Receba análises personalizadas e dicas de economia</p>
            </div>
            <ToggleSwitch
              enabled={notifications.insights}
              onChange={(enabled) => onUpdate({ insights: enabled })}
            />
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Atualizações e Novidades</h3>
              <p className="text-sm text-gray-400 mt-1">Receba novidades sobre recursos e atualizações do Nexios</p>
            </div>
            <ToggleSwitch
              enabled={notifications.marketing}
              onChange={(enabled) => onUpdate({ marketing: enabled })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PreferencesSection = ({ 
  preferences, 
  onUpdate 
}: { 
  preferences: UserProfile['preferences']; 
  onUpdate: (updates: Partial<UserProfile['preferences']>) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Aparência e Preferências</h2>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Tema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themeOptions.map(option => (
              <button
                key={option.value}
                className={`p-4 rounded-lg border flex flex-col items-center justify-center h-24 transition-colors ${
                  preferences.theme === option.value
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                }`}
                onClick={() => onUpdate({ theme: option.value as any })}
              >
                <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center">
                  {option.value === 'light' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  )}
                  {option.value === 'dark' && (
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600"></div>
                  )}
                  {option.value === 'system' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-800"></div>
                  )}
                  {option.value === 'custom' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                  )}
                </div>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Cor do Tema</h3>
          <div className="flex flex-wrap gap-4">
            {accentColorOptions.map(color => (
              <ColorSwatch
                key={color.value}
                color={color.value}
                selected={preferences.accentColor === color.value}
                onClick={() => onUpdate({ accentColor: color.value })}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            A cor do tema é aplicada em botões, links e elementos de destaque.
          </p>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Modo Compacto</h3>
              <p className="text-sm text-gray-400 mt-1">Reduza o espaçamento para mostrar mais conteúdo na tela</p>
            </div>
            <ToggleSwitch
              enabled={preferences.compactMode}
              onChange={(enabled) => onUpdate({ compactMode: enabled })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Exportação Automática</h3>
              <p className="text-sm text-gray-400 mt-1">Salvar automaticamente seus dados mensalmente</p>
            </div>
            <ToggleSwitch
              enabled={preferences.autoExport}
              onChange={(enabled) => onUpdate({ autoExport: enabled })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RegionalSettingsSection = ({ 
  profile, 
  onUpdate 
}: { 
  profile: Pick<UserProfile, 'language' | 'currency' | 'timezone'>; 
  onUpdate: (updates: Partial<Pick<UserProfile, 'language' | 'currency' | 'timezone'>>) => void;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Configurações Regionais</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Idioma</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={profile.language}
              onChange={(e) => onUpdate({ language: e.target.value })}
              className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white appearance-none"
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Moeda</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={profile.currency}
              onChange={(e) => onUpdate({ currency: e.target.value })}
              className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white appearance-none"
            >
              {currencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Fuso Horário</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={profile.timezone}
              onChange={(e) => onUpdate({ timezone: e.target.value })}
              className="pl-10 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white appearance-none"
            >
              {timezoneOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="button"
          className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

const SecuritySection = ({ 
  profile, 
  onUpdate 
}: { 
  profile: Pick<UserProfile, 'twoFactorEnabled'>; 
  onUpdate: (updates: Partial<Pick<UserProfile, 'twoFactorEnabled'>>) => void;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Segurança</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Autenticação de Dois Fatores (2FA)</h3>
              <p className="text-sm text-gray-400 mt-1">Adicione uma camada extra de segurança à sua conta</p>
            </div>
            <ToggleSwitch
              enabled={profile.twoFactorEnabled}
              onChange={(enabled) => onUpdate({ twoFactorEnabled: enabled })}
            />
          </div>
          {profile.twoFactorEnabled && (
            <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-800/50 rounded-lg">
              <div className="flex items-start">
                <CheckIconSolid className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-emerald-400">
                  A autenticação de dois fatores está ativada. Seu login está protegido.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="font-medium">Dispositivos Conectados</h3>
          <p className="text-sm text-gray-400 mt-1">Gerenciar dispositivos que têm acesso à sua conta</p>
          
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/70 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-700">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M1 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5zm16 0v10H3V5h14z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Chrome / Windows</p>
                  <p className="text-xs text-gray-400">Ativo agora • Este dispositivo</p>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-white">Detalhes</button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800/70 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-700">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h6.5A2.25 2.25 0 0114 4.25v10.5A2.25 2.25 0 0111.75 17h-6.5A2.25 2.25 0 013 14.75V4.25zm14.5 4A1.5 1.5 0 0019 7.75v4.5a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-4.5A1.5 1.5 0 0116.5 6h1a1.5 1.5 0 011.5 1.5v.75z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Safari / iPhone</p>
                  <p className="text-xs text-gray-400">22 de março • São Paulo, Brasil</p>
                </div>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300">Remover</button>
            </div>
          </div>
          
          <button className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
            Ver todos os dispositivos
            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="font-medium">Histórico de Login</h3>
          <p className="text-sm text-gray-400 mt-1">Veja suas atividades de login recentes</p>
          
          <button className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
            Ver histórico completo
            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const DataSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dados e Privacidade</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-emerald-900/20 text-emerald-400 mr-4">
              <ArrowDownTrayIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Exportar seus dados</h3>
              <p className="text-sm text-gray-400 mt-1">Faça download de todos os seus dados financeiros</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg">CSV</button>
                <button className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg">Excel</button>
                <button className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg">PDF</button>
                <button className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg">JSON</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 mr-4">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Política de Privacidade</h3>
              <p className="text-sm text-gray-400 mt-1">Saiba como tratamos seus dados pessoais</p>
              <button className="mt-3 text-sm text-blue-400 hover:text-blue-300">Ler política de privacidade</button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-red-900/20 text-red-400 mr-4">
              <XMarkIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Excluir sua conta</h3>
              <p className="text-sm text-gray-400 mt-1">Apagar permanentemente sua conta e todos os dados associados</p>
              <button className="mt-3 px-3 py-1.5 text-xs bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800/30 rounded-lg">
                Iniciar processo de exclusão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionSection = ({ level }: { level: 'free' | 'premium' }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Assinatura</h2>
      
      <div className="bg-gray-700/50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Badge variant={level} className="mr-2">
            {level === 'premium' ? 'Premium' : 'Gratuito'}
          </Badge>
          {level === 'premium' && (
            <span className="text-sm text-gray-400">
              Renovação em 15 de abril de 2025
            </span>
          )}
        </div>
        
        {level === 'premium' ? (
          <div>
            <p className="text-sm text-gray-300 mb-4">
              Você está no plano Premium, com acesso a todos os recursos do Nexios Finance.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm">
                Gerenciar Assinatura
              </button>
              <button className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg shadow-sm">
                Ver Histórico de Pagamentos
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-300 mb-4">
              Você está no plano Gratuito. Faça upgrade para o Premium e tenha acesso a recursos avançados.
            </p>
            
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-700 rounded-xl p-5 bg-gray-800/50">
                <h3 className="text-lg font-medium mb-3">Plano Atual: Gratuito</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Até 3 contas financeiras</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Rastreamento de despesas básico</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Orçamentos mensais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Relatórios básicos</span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <XMarkIcon className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Sincronização bancária</span>
                  </li>
                </ul>
                <p className="text-center text-lg font-bold mb-4">R$ 0,00</p>
              </div>
              
              <div className="border border-emerald-600/50 rounded-xl p-5 bg-emerald-900/10 relative">
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    RECOMENDADO
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-3">Premium</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Contas financeiras ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Sincronização bancária automática</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Categorização automática com IA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Análises e insights avançados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Exportação de dados completa</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-xl font-bold mb-1">R$ 14,90/mês</p>
                  <p className="text-xs text-gray-400 mb-4">Economize 20% no plano anual</p>
                  <button className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md transition-colors">
                    Fazer Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal
const EnhancedProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(sampleUserProfile);
  const [activeTab, setActiveTab] = useState<string>('personal');
  
  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...updates
    }));
  };
  
  const handleNotificationUpdate = (updates: Partial<UserProfile['notifications']>) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      notifications: {
        ...prevProfile.notifications,
        ...updates
      }
    }));
  };
  
  const handlePreferenceUpdate = (updates: Partial<UserProfile['preferences']>) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      preferences: {
        ...prevProfile.preferences,
        ...updates
      }
    }));
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          Perfil e Configurações
        </h1>
        <p className="text-gray-400 mt-1">Gerencie suas preferências e detalhes da conta</p>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-700/50 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <TabButton
            active={activeTab === 'personal'}
            icon={<UserIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('personal')}
          >
            Pessoal
          </TabButton>
          <TabButton
            active={activeTab === 'security'}
            icon={<ShieldCheckIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('security')}
          >
            Segurança
          </TabButton>
          <TabButton
            active={activeTab === 'notifications'}
            icon={<BellIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('notifications')}
          >
            Notificações
          </TabButton>
          <TabButton
            active={activeTab === 'appearance'}
            icon={<PaintBrushIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('appearance')}
          >
            Aparência
          </TabButton>
          <TabButton
            active={activeTab === 'subscription'}
            icon={<CreditCardIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('subscription')}
          >
            Assinatura
          </TabButton>
          <TabButton
            active={activeTab === 'data'}
            icon={<DocumentDuplicateIcon className="w-5 h-5" />}
            onClick={() => setActiveTab('data')}
          >
            Dados
          </TabButton>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <Card className="p-6 lg:col-span-2">
          {activeTab === 'personal' && (
            <PersonalInfoSection 
              profile={profile} 
              onUpdate={handleProfileUpdate} 
            />
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-8">
              <PasswordSection onUpdate={() => {}} />
              <SecuritySection 
                profile={profile} 
                onUpdate={handleProfileUpdate} 
              />
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <NotificationsSection 
              notifications={profile.notifications} 
              onUpdate={handleNotificationUpdate} 
            />
          )}
          
          {activeTab === 'appearance' && (
            <PreferencesSection 
              preferences={profile.preferences} 
              onUpdate={handlePreferenceUpdate} 
            />
          )}
          
          {activeTab === 'subscription' && (
            <SubscriptionSection level={profile.membershipLevel} />
          )}
          
          {activeTab === 'data' && (
            <DataSection />
          )}
        </Card>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <Card className="p-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <p className="text-xs text-gray-400">{profile.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plano</span>
                  <Badge variant={profile.membershipLevel}>
                    {profile.membershipLevel === 'premium' ? 'Premium' : 'Gratuito'}
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                </div>
              </div>
            </div>
            
            {profile.membershipLevel !== 'premium' && (
              <button className="w-full mt-4 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors">
                Fazer Upgrade para Premium
              </button>
            )}
          </Card>
          
          {/* Regional Settings */}
          {(activeTab === 'personal' || activeTab === 'appearance') && (
            <Card className="p-5">
              <RegionalSettingsSection 
                profile={profile} 
                onUpdate={handleProfileUpdate} 
              />
            </Card>
          )}
          
          {/* Quick Links */}
          {activeTab === 'security' && (
            <Card className="p-5">
              <h3 className="font-medium mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex items-center">
                    <KeyIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Redefinir Senha
                  </button>
                </li>
                <li>
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex items-center">
                    <IdentificationIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Verificar Identidade
                  </button>
                </li>
                <li>
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex items-center">
                    <Cog6ToothIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Configurar 2FA
                  </button>
                </li>
              </ul>
            </Card>
          )}
          
          {/* Help & Support */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Ajuda e Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="block text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  Contatar Suporte
                </a>
              </li>
              <li>
                <a href="#" className="block text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  Tutoriais e Guias
                </a>
              </li>
              <li>
                <a href="#" className="block text-sm text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  Novidades e Atualizações
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;