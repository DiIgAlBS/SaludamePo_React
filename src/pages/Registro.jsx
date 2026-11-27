import { useForm } from 'react-hook-form';
import { Container, Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button';
import { apiFetch } from '../services/api';

function Registro() {
  const navigate = useNavigate();
  const [regiones, setRegiones] = useState([]);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [registroError, setRegistroError] = useState('');
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const claveWatch = watch('clave');

  useEffect(() => {
    apiFetch('/regiones')
      .then((data) => setRegiones(data))
      .catch(() => setRegiones([]));
  }, []);

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    setValue('comunaId', '');
    if (!regionId) {
      setComunasDisponibles([]);
      return;
    }
    try {
      const comunas = await apiFetch(`/comunas/region/${regionId}`);
      setComunasDisponibles(comunas);
    } catch {
      setComunasDisponibles([]);
    }
  };

  const onSubmit = async (data) => {
    setRegistroError('');
    setCargando(true);

    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          email: data.correo.trim().toLowerCase(),
          password: data.clave.trim(),
          fechaNacimiento: data.fechaNacimiento,
          telefono: data.telefono?.trim() || null,
          direccion: data.direccion?.trim() || null,
          comunaId: data.comunaId ? Number(data.comunaId) : null,
        }),
      });

      alert('¡Registro realizado con éxito po! Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setRegistroError(err.message || 'No se pudo completar el registro.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '650px', width: '100%' }} className="shadow-sm border-0 p-3">
        <Card.Body>
          <h2 className="text-center fw-bold text-danger mb-4">Registro de Usuario</h2>

          {registroError && <Alert variant="danger">{registroError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label className="fw-semibold">Nombre (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Diego"
                    isInvalid={!!errors.nombre}
                    {...register('nombre', {
                      required: 'El nombre es obligatorio',
                      pattern: {
                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                        message: 'Solo debe contener letras y espacios',
                      },
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="apellido">
                  <Form.Label className="fw-semibold">Apellido (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Bustamante"
                    isInvalid={!!errors.apellido}
                    {...register('apellido', {
                      required: 'El apellido es obligatorio',
                      pattern: {
                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                        message: 'Solo debe contener letras y espacios',
                      },
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.apellido?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="fechaNacimiento">
                  <Form.Label className="fw-semibold">Fecha Nacimiento (*)</Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.fechaNacimiento}
                    {...register('fechaNacimiento', {
                      required: 'La fecha es obligatoria',
                      validate: (val) => {
                        const hoy = new Date();
                        const fechaNac = new Date(val);
                        if (isNaN(fechaNac.getTime())) return 'Fecha no válida';
                        let edad = hoy.getFullYear() - fechaNac.getFullYear();
                        const mesDiff = hoy.getMonth() - fechaNac.getMonth();
                        if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
                        if (edad < 18) return 'Debes tener al menos 18 años';
                        if (edad > 100) return 'Edad máxima 100 años';
                        return true;
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fechaNacimiento?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label className="fw-semibold">Teléfono</Form.Label>
                  <Form.Control type="text" placeholder="+56 9 1234 5678" {...register('telefono')} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="correo">
              <Form.Label className="fw-semibold">Correo Electrónico (*)</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@duoc.cl"
                isInvalid={!!errors.correo}
                {...register('correo', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Formato de correo inválido',
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="region">
                  <Form.Label className="fw-semibold">Región</Form.Label>
                  <Form.Select {...register('region', { onChange: handleRegionChange })}>
                    <option value="">-- Seleccionar --</option>
                    {regiones.map((r) => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="comunaId">
                  <Form.Label className="fw-semibold">Comuna</Form.Label>
                  <Form.Select disabled={comunasDisponibles.length === 0} {...register('comunaId')}>
                    <option value="">-- Seleccionar --</option>
                    {comunasDisponibles.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="clave">
                  <Form.Label className="fw-semibold">Contraseña (*)</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={!!errors.clave}
                    {...register('clave', {
                      required: 'La contraseña es obligatoria',
                      minLength: { value: 4, message: 'Mínimo 4 caracteres' },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.clave?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-4" controlId="claveConfirm">
                  <Form.Label className="fw-semibold">Confirmar Contraseña (*)</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={!!errors.claveConfirm}
                    {...register('claveConfirm', {
                      required: 'Confirma tu contraseña',
                      validate: (val) => val === claveWatch || 'Las contraseñas no coinciden',
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.claveConfirm?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2" disabled={cargando}>
              {cargando ? 'Registrando...' : 'Completar Registro'}
            </Button>
          </Form>

          <p className="text-center mt-3 mb-0 text-muted">
            ¿Ya tienes cuenta? <Link to="/login" className="text-danger fw-bold">Inicia sesión</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Registro;