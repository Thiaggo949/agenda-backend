import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      navigate('/tarefas');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar. Verifique os dados.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Criar Conta</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '95%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          required
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: '95%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={carregando}
        >
          {carregando ? 'Criando conta...' : 'Cadastrar'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Já tem uma conta?{' '}
        <button
          onClick={() => navigate('/')}
          style={{
            color: '#007BFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Faça login
        </button>
      </p>
    </div>
  );
}
