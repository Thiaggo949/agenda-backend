const axios = require('axios');
const User = require('../models/User');
const admin = require('../config/firebase');

const FIREBASE_API_KEY = 'AIzaSyBXFH1YM9KC-XtJ7j5hB3A3WXIkOyHTR6Y';

// Função de registro de usuário com retorno de token
const register = async (req, res) => {
  const { email, senha, nome, telefone, papel } = req.body;

  try {
    // Verifica se o usuário já existe no MongoDB
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Cria o usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password: senha,
      displayName: nome,
      phoneNumber: telefone || undefined,
    });

    // Salva no MongoDB
    const newUser = new User({
      uid: userRecord.uid,
      email,
      senha,
      nome: nome || 'Nome não informado',
      telefone: telefone || '',
      papel: papel || 'usuario',
    });

    await newUser.save();

    // Realiza login para obter o token real do Firebase
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password: senha,
        returnSecureToken: true,
      }
    );

    const { idToken } = response.data;

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token: idToken,
      user: {
        _id: newUser._id,
        uid: newUser.uid,
        email: newUser.email,
        nome: newUser.nome,
        telefone: newUser.telefone,
        papel: newUser.papel,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      }
    });

  } catch (err) {
    console.error('Erro no registro:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// Função de login de usuário com token
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Login via Firebase REST API
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password: senha,
        returnSecureToken: true,
      }
    );

    const { idToken, localId } = response.data;

    // Busca usuário no MongoDB
    const user = await User.findOne({ uid: localId });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado no banco de dados' });
    }

    // Remove a senha do retorno
    const { senha: _, ...userSemSenha } = user._doc;

    res.status(200).json({
      message: 'Login bem-sucedido',
      token: idToken,
      user: userSemSenha
    });

  } catch (err) {
    console.error('Erro no login:', err.response?.data || err.message);
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

// Sincronização (para login externo)
const syncUser = async (req, res) => {
  try {
    const { uid, email, nome, telefone, papel } = req.body;

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({
        uid,
        email,
        nome: nome || 'Nome não informado',
        telefone: telefone || '',
        papel: papel || 'usuario',
      });

      await user.save();
    }

    res.status(200).json({
      message: 'Usuário sincronizado com sucesso!',
      usuario: user,
    });

  } catch (error) {
    console.error('Erro ao sincronizar o usuário:', error);
    res.status(500).json({ error: 'Erro ao sincronizar o usuário.' });
  }
};

module.exports = { register, login, syncUser };
