import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      navigate('/tarefas');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Email ou senha inválidos.');
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleLogin}>
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
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Não tem uma conta?{' '}
        <button
          onClick={() => navigate('/cadastro')}
          style={{
            color: '#007BFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
}
