const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  data: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ['pendente', 'concluida'],
    default: 'pendente',
  },
  usuarioId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tarefa', tarefaSchema);
