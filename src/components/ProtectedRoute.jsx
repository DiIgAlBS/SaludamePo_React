import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem('token');
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (!token || !usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && usuarioLogueado.rol !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;