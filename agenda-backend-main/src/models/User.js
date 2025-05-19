const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String }, // para autenticação Firebase
  email: { type: String, required: true, unique: true },
  senha: { type: String }, // opcional, se não usar apenas Firebase
  nome: { type: String },
  telefone: { type: String },
  papel: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
