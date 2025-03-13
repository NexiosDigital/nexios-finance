# Nexios Finance

Uma aplica��o completa de gest�o financeira pessoal que oferece rastreamento de transa��es, or�amentos, gest�o de investimentos e insights de IA.

## Vis�o Geral

Nexios Finance � uma plataforma de gest�o financeira pessoal moderna que integra:

- =� **Dashboard completo** para visualiza��o das suas finan�as
- =� **Rastreamento de transa��es** com categoriza��o autom�tica
- =� **Or�amentos** para controlar seus gastos
- =� **Gest�o de investimentos** para acompanhar seu patrim�nio
- <� **Metas financeiras** para planejar seu futuro
- =� **Integra��o com WhatsApp** para registrar transa��es em tempo real
- > **Intelig�ncia Artificial** para insights personalizados e previs�es financeiras

## Arquitetura

O projeto utiliza uma arquitetura moderna e escal�vel:

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js API REST, Python FastAPI para servi�os de IA
- **Database**: PostgreSQL com Supabase para autentica��o e armazenamento
- **Integra��es**: WhatsApp API, n8n para automa��o de workflows

## Estrutura do Projeto

```
   frontend/                    # Aplica��o Next.js (Frontend)
      public/                  # Arquivos est�ticos
      src/                     # C�digo fonte frontend
         components/          # Componentes React
         pages/               # P�ginas e rotas Next.js
         lib/                 # Bibliotecas e utilit�rios
         hooks/               # Custom hooks
         utils/               # Fun��es utilit�rias
         services/            # Servi�os de API
         types/               # Tipos TypeScript
         styles/              # Estilos globais
      .env.local               # Vari�veis de ambiente (frontend)
      package.json             # Depend�ncias frontend
      tsconfig.json            # Configura��o TypeScript
      tailwind.config.js       # Configura��o TailwindCSS
      next.config.js           # Configura��o Next.js

   backend/                     # Backend da aplica��o
      node-api/                # API REST em Node.js
      ai-service/              # Servi�o de IA/ML em Python
      integrations/            # Integra��es com servi�os externos
      migrations/              # Migra��es e scripts de banco de dados

   database/                    # Configura��es do banco de dados
      supabase/                # Configura��es do Supabase

   shared/                      # C�digo compartilhado

   docker-compose.yml           # Configura��o de containers
   package.json                 # Depend�ncias e scripts do projeto
   README.md                    # Documenta��o do projeto
   .gitignore                   # Arquivos ignorados pelo git
```

## Recursos

- **Gest�o de Transa��es**: Registre suas receitas e despesas com categoriza��o autom�tica
- **Or�amentos**: Defina limites de gastos por categoria e acompanhe seu progresso
- **Dashboard**: Visualize sua sa�de financeira com gr�ficos e indicadores claros
- **Metas Financeiras**: Defina objetivos financeiros e acompanhe seu progresso
- **Investimentos**: Acompanhe o desempenho dos seus investimentos
- **Integra��o WhatsApp**: Registre transa��es enviando mensagens simples por WhatsApp
- **Insights de IA**: Receba recomenda��es personalizadas e previs�es baseadas nos seus padr�es financeiros

## Come�ando

### Pr�-requisitos

- Node.js (v16+)
- Docker e Docker Compose
- Supabase CLI (opcional)

### Instala��o

1. Clone o reposit�rio:
   ```
   git clone https://github.com/seu-usuario/nexios-finance.git
   cd nexios-finance
   ```

2. Instale as depend�ncias:
   ```
   npm run setup
   ```

3. Configure as vari�veis de ambiente copiando os arquivos de exemplo:
   ```
   cp frontend/.env.example frontend/.env.local
   cp backend/node-api/.env.example backend/node-api/.env
   cp backend/ai-service/.env.example backend/ai-service/.env
   ```

4. Inicie os servi�os usando Docker Compose:
   ```
   docker-compose up -d
   ```

5. Acesse a aplica��o em [http://localhost:3000](http://localhost:3000)

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

### Servi�o de IA

```
cd backend/ai-service
python -m uvicorn app.main:app --reload
```

## Licen�a

Este projeto est� licenciado sob a licen�a MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.