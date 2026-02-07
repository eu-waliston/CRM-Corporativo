# CRM Corporativo

Um sistema CRM completo e corporativo construído com React.js.

## 🚀 Começando

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd crm-corporativo
```

2. Instale as dependências
```
npm install
```

3. Configure as variáveis de ambiente
```
cp .env.example .env
# Edite o .env com suas configurações
```
4. Inicie o servidor de desenvolvimento
```
npm start
```
# 🏗️ Estrutura do Projeto
```
src/
├── api/              # Configurações da API
├── assets/           # Imagens, ícones, fonts
├── components/       # Componentes React
│   ├── common/      # Componentes reutilizáveis
│   ├── layout/      # Componentes de layout
│   └── [feature]/   # Componentes por funcionalidade
├── context/         # Contextos React
├── hooks/           # Custom Hooks
├── layouts/         # Layouts principais
├── pages/           # Páginas da aplicação
├── routes/          # Configuração de rotas
├── store/           # Gerenciamento de estado (Redux)
│   ├── slices/     # Redux slices
│   └── selectors/  # Redux selectors
├── styles/          # Estilos globais
├── utils/           # Utilitários
└── App.js           # Componente principal
```

## 🛠️ Tecnologias Utilizadas

  - React.js - Biblioteca principal

  - Redux Toolkit - Gerenciamento de estado

  - React Router - Navegação

  - Tailwind CSS - Estilização

  - React Query - Gerenciamento de dados do servidor

  - Axios - Cliente HTTP

  - React Hook Form - Formulários

  - Chart.js - Gráficos

  - Framer Motion - Animações

  - ESLint/Prettier - Code quality

## 📦 Scripts Disponíveis

  - npm start - Inicia servidor de desenvolvimento

  - npm build - Build para produção

  - npm test - Executa testes

  - npm lint - Verifica qualidade do código

  - npm format - Formata o código

## 🚀 Deploy
1. Build do projeto:
```
npm run build
```
2. O build estará na pasta build/ pronto para deploy.

## 📄 Licença

Este projeto está sob a licença MIT.


## 20. Como Executar o Projeto

```bash
# 1. Dê permissões de execução aos scripts se necessário
chmod +x scripts/*

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env

# subi o env porem sem informações sensiveis, por ser um cenário de teste !!!!

# 4. Inicie o servidor de desenvolvimento
npm start

# 5. Para produção
npm run build

```

## Contas para teste do CRM

```
    email: 'admin@crm.com',
    password: 'admin123',


    email: 'vendas@crm.com',
    password: 'vendas123',

    email: 'teste@crm.com',
    password: 'teste123',

```


## Recursos Implementados:
  - ✅ Arquitetura Corporativa Completa

  - ✅ Sistema de Autenticação

  - ✅ Gerenciamento de Estado (Redux + React Query)

  - ✅ Design System com Tailwind CSS

  - ✅ Dashboard com Gráficos

  - ✅ CRUD Completo de Leads

  - ✅ Sistema de Filtros e Busca

  - ✅ Modo Escuro

  - ✅ Layout Responsivo

  - ✅ Formulários com Validação

  - ✅ Notificações com Toast

  - ✅ Code Quality (ESLint + Prettier + Husky)

  - ✅ Deploy Pronto

