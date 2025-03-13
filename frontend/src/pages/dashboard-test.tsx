import React from 'react';
import { Layout } from '@/components/layout';
import { Card, Button, Alert } from '@/components/ui';

// Dados de exemplo para testar o dashboard
const mockUser = {
  id: 'user-123',
  name: 'João Silva',
  email: 'joao@exemplo.com',
  membership_level: 'premium',
};

// Página de dashboard para teste
export default function DashboardTest() {
  // Estado de teste para simular um usuário autenticado
  const [showAlert, setShowAlert] = React.useState(false);
  
  return (
    <Layout title="Dashboard de Teste">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Olá, {mockUser.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bem-vindo ao seu dashboard financeiro
          </p>
        </div>
        
        {showAlert && (
          <Alert
            variant="success"
            title="Teste bem-sucedido!"
            description="Este é um alerta de teste para demonstrar o componente Alert."
            onClose={() => setShowAlert(false)}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Card de Teste 1</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Este é um exemplo de card para testar os componentes UI.
            </p>
            <Button 
              onClick={() => setShowAlert(true)}
              isFullWidth
            >
              Mostrar Alerta
            </Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Card de Teste 2</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Este é outro exemplo de card para testar os componentes UI.
            </p>
            <Button 
              variant="secondary"
              isFullWidth
            >
              Botão Secundário
            </Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Card de Teste 3</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Este é mais um exemplo de card para testar os componentes UI.
            </p>
            <Button 
              variant="outline"
              isFullWidth
            >
              Botão Outline
            </Button>
          </Card>
        </div>
        
        <Card>
          <Card.Header 
            title="Card com Componentes" 
            subtitle="Exemplo de Card com Header, Content e Footer"
          />
          <Card.Content>
            <p className="mb-4">
              Este card demonstra o uso dos subcomponentes Card.Header, Card.Content e Card.Footer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-dark-surface rounded-lg">
                Seção 1
              </div>
              <div className="p-4 bg-gray-100 dark:bg-dark-surface rounded-lg">
                Seção 2
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className="flex justify-end">
              <Button variant="ghost">Cancelar</Button>
              <Button className="ml-2">Salvar</Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Layout>
  );
}