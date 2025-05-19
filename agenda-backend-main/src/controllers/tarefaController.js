const Tarefa = require('../models/Tarefa');

// Criar nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao, data, status } = req.body;

    const novaTarefa = new Tarefa({
      titulo,
      descricao,
      data,
      status,
      usuarioId: req.usuario.uid,
    });

    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao criar tarefa', detalhe: error.message });
  }
};

// Listar tarefas do usuário autenticado
exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ usuarioId: req.usuario.uid }).sort({ data: 1 });
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhe: error.message });
  }
};

// Atualizar tarefa por ID
exports.atualizarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
      { _id: id, usuarioId: req.usuario.uid },
      req.body,
      { new: true }
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhe: error.message });
  }
};

// Deletar tarefa por ID
exports.deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Tarefa.findOneAndDelete({ _id: id, usuarioId: req.usuario.uid });

    if (!resultado) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json({ mensagem: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa', detalhe: error.message });
  }
};
