# Documentação Completa - Explora Manaus

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Componentes Principais](#componentes-principais)
5. [Funcionalidades](#funcionalidades)
6. [Configuração e Instalação](#configuração-e-instalação)
7. [Dependências](#dependências)
8. [API e Integrações](#api-e-integrações)
9. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
10. [Deploy](#deploy)

## Visão Geral

O Explora Manaus é uma plataforma web interativa desenvolvida em React que permite aos usuários explorar e compartilhar pontos de interesse na cidade de Manaus. A aplicação utiliza tecnologias modernas para fornecer uma experiência de usuário rica e interativa.

## Arquitetura do Sistema

O sistema é construído utilizando:
- Frontend: React.js
- Backend: Node.js com Express
- Banco de Dados: MongoDB (Mongoose)
- Autenticação: JWT (JSON Web Tokens)
- Mapa: Mapbox GL JS

## Estrutura do Projeto

```
App/
├── public/          # Arquivos estáticos
├── src/
│   ├── components/  # Componentes React reutilizáveis
│   ├── pages/       # Páginas principais da aplicação
│   ├── data/        # Dados e configurações
│   ├── img/         # Imagens e assets
│   ├── index.js     # Ponto de entrada da aplicação
│   └── index.css    # Estilos globais
├── package.json     # Dependências e scripts
└── README.md        # Documentação básica
```

## Componentes Principais

### Páginas
- `HomePage.js`: Página inicial da aplicação
- `MainPage.js`: Página principal após login
- `App.js`: Componente raiz da aplicação

### Componentes
- `MapPage.js`: Componente principal do mapa
- `AlertCard.js`: Componente para exibição de alertas
- `offcanvas-main.js`: Menu lateral deslizante
- `overlay-trigger-main.js`: Componente para triggers de overlay

## Funcionalidades

### 1. Sistema de Mapa
- Visualização interativa de Manaus
- Filtros de pontos de interesse
- Adição de marcadores personalizados
- Delimitação de áreas específicas

### 2. Gestão de Usuários
- Cadastro e autenticação
- Perfis personalizados
- Sistema de comentários e avaliações

### 3. Gestão de Eventos
- Criação e visualização de eventos
- Filtros por data e categoria
- Compartilhamento em redes sociais

### 4. Sistema de Busca
- Busca por localização
- Filtros avançados
- Sugestões automáticas

## Configuração e Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- MongoDB

### Passos de Instalação
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis necessárias

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Dependências Principais

- React 18.3.1
- React Router DOM 6.26.1
- Mapbox GL 3.6.0
- Bootstrap 5.3.3
- Express 4.21.1
- Mongoose 8.8.1
- JWT 9.0.2

## API e Integrações

### Mapbox
- Integração com Mapbox GL JS para visualização de mapas
- Geocodificação para busca de endereços
- Personalização de estilos de mapa

### MongoDB
- Armazenamento de dados de usuários
- Gestão de pontos de interesse
- Armazenamento de eventos

## Guia de Desenvolvimento

### Convenções de Código
- Utilizar componentes funcionais com hooks
- Seguir o padrão de nomenclatura camelCase
- Manter componentes pequenos e reutilizáveis

### Estrutura de Componentes
```javascript
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ props }) => {
  // Lógica do componente
  return (
    // JSX
  );
};

export default ComponentName;
```

### Estilização
- Utilizar CSS modules para escopo local
- Manter estilos globais em index.css
- Seguir o design system do Bootstrap

## Deploy

### Produção
1. Construa o projeto:
   ```bash
   npm run build
   ```
2. Configure o servidor de produção
3. Defina as variáveis de ambiente
4. Inicie o servidor

### Monitoramento
- Implementar logs de erro
- Monitorar performance
- Rastrear métricas de uso

## Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Envie um pull request

## Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a equipe de desenvolvimento 
