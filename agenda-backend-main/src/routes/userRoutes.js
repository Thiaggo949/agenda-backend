// Importa as funções do controller
const { register, login, syncUser } = require('../controllers/userController');

// Cria o roteador para definir as rotas relacionadas ao usuário
const express = require('express');
const router = express.Router();

// Definir rotas com as funções de callback corretamente
router.post('/register', register);
router.post('/login', login);
router.post('/sync', syncUser);

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
