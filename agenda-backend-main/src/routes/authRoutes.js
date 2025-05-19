const express = require('express');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota protegida
router.get('/teste', authenticate, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado!',
    usuario: req.user,
  });
});

module.exports = router;
