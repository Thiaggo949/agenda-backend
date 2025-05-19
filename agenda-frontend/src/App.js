// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tarefas" element={<Tarefas />} />
      </Routes>
    </Router>
  );
}

export default App;

