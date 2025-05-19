const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Opções removidas
    console.log('🟢 Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra a aplicação se falhar
  }
};

module.exports = connectDB;
