const request = require('supertest');
const app = require('../server'); // Ajuste aqui se for '../app' no seu projeto
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

describe('Testes de Tarefa - Acesso Protegido', () => {
  let token;

  beforeAll(async () => {
    const email = `testuser${Date.now()}@example.com`;
    const senha = '123456';

    try {
      // Cria um novo usuário de teste no Firebase e obtém o token
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
        {
          email,
          password: senha,
          returnSecureToken: true
        }
      );

      token = response.data.idToken;
    } catch (error) {
      console.error('Erro ao criar usuário de teste no Firebase:', error.response?.data || error.message);
    }
  });

  it('deve criar uma nova tarefa', async () => {
    const novaTarefa = {
      titulo: 'Teste Tarefa',
      descricao: 'Descrição de teste',
      data: new Date().toISOString(), // ✅ Campo obrigatório incluído
      status: 'pendente'              // ✅ Valor válido conforme seu schema
    };

    const res = await request(app)
      .post('/api/tarefas')
      .set('Authorization', `Bearer ${token}`) // ✅ Autenticação via Firebase
      .send(novaTarefa);

    // ✅ Espera-se que a resposta seja de sucesso e contenha os dados
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('titulo', 'Teste Tarefa');
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Encerra a conexão com o banco após os testes
  });
});
