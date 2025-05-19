const admin = require('../config/firebase');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Adaptação aqui: salva os dados como req.usuario (e não req.user)
    req.usuario = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      nome: decodedToken.name || '',
    };

    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authenticate;
