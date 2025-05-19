import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarTarefas = async () => {
    try {
      const response = await api.get('/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      alert('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosTarefa = { titulo, descricao };
    if (data) dadosTarefa.data = data;

    try {
      if (editandoId) {
        await api.put(`/tarefas/${editandoId}`, dadosTarefa);
        setEditandoId(null);
      } else {
        await api.post('/tarefas', dadosTarefa);
      }

      setTitulo('');
      setDescricao('');
      setData('');
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      alert('Erro ao salvar tarefa');
    }
  };

  const handleEditar = (tarefa) => {
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setData(tarefa.data ? tarefa.data.slice(0, 10) : '');
    setEditandoId(tarefa._id);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta tarefa?')) return;

    try {
      await api.delete(`/tarefas/${id}`);
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        background: '#fff',
        fontFamily: 'sans-serif',
        transition: 'opacity 0.5s ease',
        opacity: loading ? 0 : 1,
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Minhas Tarefas</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{
            width: '95%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <textarea
          placeholder="Descrição / Anotação"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{
            width: '95%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            minHeight: '80px',
            resize: 'vertical',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{
            width: '96%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          {editandoId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tarefas.map((tarefa) => (
            <li
              key={tarefa._id}
              style={{
                background: '#f9f9f9',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '15px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <strong style={{ fontSize: '1.1rem' }}>{tarefa.titulo}</strong>
              <p style={{ margin: '8px 0' }}>{tarefa.descricao}</p>
              {tarefa.data && (
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#555' }}>
                  Data: {new Date(tarefa.data).toLocaleDateString()}
                </p>
              )}
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleEditar(tarefa)}
                  style={{
                    marginRight: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2196F3',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(tarefa._id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#f44336',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
