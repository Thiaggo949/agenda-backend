// Importa a função de conexão com o banco de dados
const connectDB = require('./config/database');

// Importa o framework Express
const express = require('express');

// Importa o CORS para permitir requisições de outras origens
const cors = require('cors');

// Importa o dotenv para lidar com variáveis de ambiente
require('dotenv').config();

// Cria uma instância do Express
const app = express();

// Define a porta que será usada (vem do .env ou usa 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Aplica o middleware que permite o uso de JSON nas requisições
app.use(express.json());

// Aplica o middleware CORS para habilitar requisições de outras origens (ex: frontend separado)
app.use(cors());

// Importa o roteador principal que agrupa todas as rotas (incluindo autenticação)
const routes = require('./routes');

// Usa as rotas sob o prefixo /api (boa prática para organização)
app.use('/api', routes);

// Rota raiz temporária para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('API do Agenda Backend funcionando!');
});

// Conecta ao MongoDB antes de iniciar o servidor
connectDB();

// Inicia o servidor apenas se não estiver sendo importado por outro módulo (ex: teste)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exporta o app para permitir testes com supertest
module.exports = app;
