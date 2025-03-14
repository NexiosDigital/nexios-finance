# Nexios Finance

Uma aplicação completa de gestão financeira pessoal que oferece rastreamento de transações, orçamentos, gestão de investimentos e insights de IA.

## Visão Geral

Nexios Finance é uma plataforma de gestão financeira pessoal moderna que integra:

- **Dashboard completo** para visualização das suas finanças
- **Rastreamento de transações** com categorização automática
- **Orçamentos** para controlar seus gastos
- **Gestão de investimentos** para acompanhar seu patrimônio
- **Metas financeiras** para planejar seu futuro
- **Integração com WhatsApp** para registrar transações em tempo real
- **Inteligência Artificial** para insights personalizados e previsões financeiras

## Arquitetura

O projeto utiliza uma arquitetura moderna e escalável:

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js API REST, Python FastAPI para serviços de IA
- **Database**: PostgreSQL com Supabase para autenticação e armazenamento
- **Integrações**: WhatsApp API, n8n para automação de workflows

## Estrutura do Projeto

```
   frontend/                    # Aplicação Next.js (Frontend)
      public/                  # Arquivos estáticos
      src/                     # Código fonte frontend
         components/          # Componentes React
         pages/               # Páginas e rotas Next.js
         lib/                 # Bibliotecas e utilitários
         hooks/               # Custom hooks
         utils/               # Funções utilitárias
         services/            # Serviços de API
         types/               # Tipos TypeScript
         styles/              # Estilos globais
      .env.local               # Variáveis de ambiente (frontend)
      package.json             # Dependências frontend
      tsconfig.json            # Configuração TypeScript
      tailwind.config.js       # Configuração TailwindCSS
      next.config.js           # Configuração Next.js

   backend/                     # Backend da aplicação
      node-api/                # API REST em Node.js
      ai-service/              # Serviço de IA/ML em Python
      integrations/            # Integrações com serviços externos
      migrations/              # Migrações e scripts de banco de dados

   database/                    # Configurações do banco de dados
      supabase/                # Configurações do Supabase

   shared/                      # Código compartilhado

   docker-compose.yml           # Configuração de containers
   package.json                 # Dependências e scripts do projeto
   README.md                    # Documentação do projeto
   .gitignore                   # Arquivos ignorados pelo git
```

## Recursos

- **Gestão de Transações**: Registre suas receitas e despesas com categorização automática
- **Orçamentos**: Defina limites de gastos por categoria e acompanhe seu progresso
- **Dashboard**: Visualize sua saúde financeira com gráficos e indicadores claros
- **Metas Financeiras**: Defina objetivos financeiros e acompanhe seu progresso
- **Investimentos**: Acompanhe o desempenho dos seus investimentos
- **Integração WhatsApp**: Registre transações enviando mensagens simples por WhatsApp
- **Insights de IA**: Receba recomendações personalizadas e previsões baseadas nos seus padrões financeiros

## Começando

### Pré-requisitos

- Node.js (v16+)
- Docker e Docker Compose
- Supabase CLI (opcional)

### Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/nexios-finance.git
   cd nexios-finance
   ```

2. Instale as dependências:
   ```
   npm run setup
   ```

3. Configure as variáveis de ambiente copiando os arquivos de exemplo:
   ```
   cp frontend/.env.example frontend/.env.local
   cp backend/node-api/.env.example backend/node-api/.env
   cp backend/ai-service/.env.example backend/ai-service/.env
   ```

4. Inicie os serviços usando Docker Compose:
   ```
   docker-compose up -d
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Desenvolvimento

### Frontend

```
cd frontend
npm run dev
```

### Backend API

```
cd backend/node-api
npm run dev
```

### Serviço de IA

```
cd backend/ai-service
python -m uvicorn app.main:app --reload
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.