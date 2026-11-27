import { useForm } from 'react-hook-form';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/atoms/Button';
import { apiFetch } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError('');
    setCargando(true);

    try {
      const resp = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data.correo.trim().toLowerCase(),
          password: data.clave.trim(),
        }),
      });

      localStorage.setItem('token', resp.token);
      localStorage.setItem(
        'usuarioLogueado',
        JSON.stringify({
          id: resp.id,
          nombre: resp.nombre,
          apellido: resp.apellido,
          correo: resp.email,
          rol: resp.rol,
        })
      );

      if (resp.rol === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      window.location.reload();
    } catch (err) {
      setLoginError(err.message || 'Correo o contraseña incorrectos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '450px', width: '100%' }} className="shadow-sm border-0 p-3">
        <Card.Body>
          <h2 className="text-center fw-bold text-danger mb-4">Iniciar Sesión</h2>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="correo">
              <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@duoc.cl"
                isInvalid={!!errors.correo}
                {...register('correo', {
                  required: 'El correo es obligatorio',
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="clave">
              <Form.Label className="fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                isInvalid={!!errors.clave}
                {...register('clave', { required: 'La contraseña es obligatoria' })}
              />
              <Form.Control.Feedback type="invalid">{errors.clave?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>

          <p className="text-center mt-3 mb-0 text-muted">
            ¿No tienes cuenta? <Link to="/registro" className="text-danger fw-bold">Regístrate aquí</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;