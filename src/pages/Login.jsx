import { useForm } from 'react-hook-form';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/atoms/Button';

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoginError('');
    const correoInput = data.correo.trim().toLowerCase();
    const claveInput = data.clave.trim();

    if (
      (correoInput === 'admin@saludamepo.cl' || correoInput === 'admin@duoc.cl') &&
      claveInput === 'admin123'
    ) {
      const adminSession = {
        nombre: 'Administrador',
        correo: correoInput,
        rol: 'admin'
      };
      localStorage.setItem('usuarioLogueado', JSON.stringify(adminSession));
      alert('¡Bienvenido al Panel de Administración!');
      navigate('/admin');
      window.location.reload();
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correoInput && u.clave === claveInput
    );

    if (!usuarioEncontrado) {
      setLoginError('Correo o contraseña incorrectos.');
      return;
    }

    const clienteSession = {
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
      rol: 'cliente'
    };

    localStorage.setItem('usuarioLogueado', JSON.stringify(clienteSession));
    alert(`¡Bienvenid@ de nuevo, ${usuarioEncontrado.nombre}!`);
    navigate('/');
    window.location.reload();
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
                  pattern: {
                    value: /^[\w-\.]+@(duoc\.cl|duocuc\.cl|profesor\.duoc\.cl|gmail\.com|saludamepo\.cl)$/i,
                    message: 'Correo no válido',
                  },
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

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2">
              Ingresar
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