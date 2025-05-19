const express = require('express');
const router = express.Router();

// Importação das rotas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const tarefaRoutes = require('./tarefaRoutes');

// Rota inicial de teste
router.get('/', (req, res) => {
  res.send('Rota inicial funcionando!');
});

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

// Rotas de tarefas (agenda)
router.use('/tarefas', tarefaRoutes);

module.exports = router;
