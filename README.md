
# Projeto Front-end com Monorepo

Este projeto é uma aplicação front-end construída com uma estrutura de monorepo usando Yarn Workspaces. A aplicação inclui três pacotes principais: server, web, e mobile.


## Estrutura do Projeto
```
crudmono
├── packages
│   ├── server [Responsável pela fakeAPI]
│   │   ├── src
│   │   │   ├── controllers/ [Lógica de negócio]
│   │   │   ├── models/ [Modelo de dados]
│   │   │   ├── routes/ [Rotas da aplicação]
│   │   │   ├── data/ [Armazena os dados]
│   │   │   └── server.ts
│   │   └── package.json
│   ├── web [Responsável pelo FrontEnd Web]
│   │   ├── public
│   │   ├── src
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── reducers/
│   │   │   ├── store/
│   │   │   ├── styles/
│   │   │   ├── axiosConfig.ts [Autenticação]
│   │   │   ├── App.tsx
│   │   │   └── index.tsx
│   │   │   └── hooks.ts
│   │   └── package.json
│   └── mobile
│       ├── src
│       │   ├── components
│       │   └── App.tsx
│       └── package.json
├── README.md
├── package.json
└── yarn.lock
```
## Stack utilizada

**Server**: Node.js, Express, Cors, TypeScript, Cookie-Parser, Nodemon

**Web**: React.js, TypeScript, Tailwind CSS, Axios, Redux

**Mobile**: React Native, Expo

**Geral**: Yarn Workspaces, Webpack



## Rodando localmente
- Versão Node recomendada: 21.2v

Clone o projeto

```bash
  git clone https://github.com/jscnewlf/crudmono
```

Entre no diretório do projeto

```bash
  cd crudmono
```

Instale as dependências na pasta raíz

```bash
  yarn install
```

Inicie o /server

```bash
  yarn dev
```

Inicie o /web

```bash
  yarn start
```


## Funcionalidades

#### Autenticação 
```
http://localhost:3000/login && http://localhost:3000/register
```
- **Login**: Permite que os usuários façam login na aplicação.
- **Registro**: Permite que novos usuários se registrem.
- **Logout**: Permite que os usuários façam logout.

#### Feed 
```
http://localhost:3000/feed
```
- **Listagem de Posts**: Exibe uma lista de posts na página de feed.
- **Exclusão de Posts**: Permite que os usuários excluam seus próprios posts.
- **Criação de Posts**: Permite que os usuários criem novos posts.

#### Post Page 
```
http://localhost:3000/feed/post_[idDoPost]
```
- **Listagem do Post por ID**: Exibe o post com seus respectivos comentários.
- **Edição do Post**: Permite que o usuário edite o post.
- **Criação de Comentário**: Permite que o usuário adicione comentários a um post.
- **Edição de Comentário**: Permite que o usuário edite comentário de um post.
- **Exclusão de Comentário**: Permite que o usuário exclue comentário de um post.
