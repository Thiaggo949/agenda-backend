import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/tarefas"
          element={
            <ProtectedRoute>
              <Tarefas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
