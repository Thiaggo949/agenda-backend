const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middlewares/authMiddleware');

// Todas as rotas protegidas por autenticação
router.use(autenticar);

// Criar uma nova tarefa
router.post('/', tarefaController.criarTarefa);

// Listar todas as tarefas do usuário autenticado
router.get('/', tarefaController.listarTarefas);

// Atualizar uma tarefa específica
router.put('/:id', tarefaController.atualizarTarefa);

// Deletar uma tarefa específica
router.delete('/:id', tarefaController.deletarTarefa);

module.exports = router;
