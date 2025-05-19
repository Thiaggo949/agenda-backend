# Agenda de Tarefas com Autenticação

Este projeto é uma aplicação full stack desenvolvida para o componente curricular **Tecnologias e Programação Integrada**. Ele permite o gerenciamento de tarefas com autenticação de usuários, integração com banco de dados e testes automatizados.

## 🔧 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB Atlas (Banco de Dados)
- Mongoose (ODM)
- Firebase Admin SDK (Autenticação)
- GitHub Actions (CI/CD)
- Docker (Execução em ambiente isolado)
- Jest + Supertest (Testes unitários)

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS (estilização)
- Firebase SDK (Autenticação no client)

## 📁 Estrutura do Projeto

```
agenda-backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── tests/
├── .env
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md

agenda-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── public/
├── .env
├── package.json
```

## ⚙️ Funcionalidades

### Backend
- Registro e login de usuários via Firebase
- CRUD completo de tarefas (criar, listar, editar e excluir)
- Validação de autenticação com middleware
- Integração com MongoDB Atlas
- Testes unitários com Jest e Supertest

### Frontend
- Tela de cadastro e login
- Listagem de tarefas
- Criação, edição e exclusão de tarefas
- Redirecionamento automático após login/cadastro
- Responsivo e estilizado com Tailwind

## 🧪 Testes Unitários

A aplicação possui testes automatizados desenvolvidos com `Jest` e `Supertest`, localizados na pasta `agenda-backend/tests`.

Testes implementados:
- Registro e login de usuários (mockados)
- Criação, listagem, atualização e remoção de tarefas
- Verificação de autenticação para rotas protegidas

Para executar os testes:

```bash
cd agenda-backend-main
npm install
npm test
```

## ☁️ Deploy e Execução

### Com Docker

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`.

### Sem Docker (Desenvolvimento)

**Backend:**
```bash
cd agenda-backend
npm install
npm run dev
```

**Frontend:**
```bash
cd agenda-frontend
npm install
npm start
```

## 🚀 CI/CD com GitHub Actions

O projeto possui pipeline de integração contínua que:
- Executa testes automatizados a cada `push`
- Valida a aplicação antes do deploy

## 🔐 Autenticação

A autenticação é realizada pelo Firebase Authentication, usando:
- Email e senha
- Geração e validação de tokens JWT

## 📌 Observações

- É necessário criar um projeto no [Firebase Console](https://console.firebase.google.com/) e preencher as variáveis no `.env`.
- O MongoDB deve ser configurado no MongoDB Atlas com URI no `.env`.

