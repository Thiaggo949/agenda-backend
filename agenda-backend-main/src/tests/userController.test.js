const request = require('supertest');
const app = require('../server'); // exporte o app em server.js
const mongoose = require('mongoose');

// Dados de teste simulados
const novoUsuario = {
  nome: 'Teste Usuário',
  email: `teste_${Date.now()}@email.com`,
  senha: '123456',
  telefone: '+5511999999999',
  papel: 'usuario'
};

describe('Testes de Usuário - Registro', () => {
  it('deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(novoUsuario);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', novoUsuario.email);
  });

  afterAll(async () => {
    // Finaliza conexão com o banco de dados após os testes
    await mongoose.connection.close();
  });
});
