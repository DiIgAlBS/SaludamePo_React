import { useForm } from 'react-hook-form';
import { Container, Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { datosChile } from '../data/regiones';
import Button from '../components/atoms/Button';

function Registro() {
  const navigate = useNavigate();
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [registroError, setRegistroError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const claveWatch = watch('clave');

  const handleRegionChange = (e) => {
    const regionSeleccionada = e.target.value;
    const regEncontrada = datosChile.find((r) => r.region === regionSeleccionada);
    setComunasDisponibles(regEncontrada ? regEncontrada.comunas : []);
    setValue('comuna', '');
  };

  const onSubmit = (data) => {
    setRegistroError('');

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuariosGuardados.some(
      (u) => u.correo.toLowerCase() === data.correo.trim().toLowerCase()
    );

    if (existe) {
      setRegistroError('Este correo electrónico ya se encuentra registrado.');
      return;
    }

    const nuevoUsuario = {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      rut: data.rut.trim().toUpperCase(),
      correo: data.correo.trim().toLowerCase(),
      fechaNacimiento: data.fechaNacimiento,
      region: data.region,
      comuna: data.comuna,
      clave: data.clave.trim(),
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    alert('¡Registro realizado con éxito po! Ahora puedes iniciar sesión.');
    navigate('/login');
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
                        message: 'Solo debe contener letras y espacios (sin números ni símbolos)'
                      },
                      validate: (val) => {
                        const soloLetras = val.trim().replace(/\s+/g, '');
                        if (soloLetras.length < 3) {
                          return 'Debe tener al menos 3 letras reales';
                        }
                        return true;
                      }
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
                        message: 'Solo debe contener letras y espacios (sin números ni símbolos)'
                      },
                      validate: (val) => {
                        const soloLetras = val.trim().replace(/\s+/g, '');
                        if (soloLetras.length < 3) {
                          return 'Debe tener al menos 3 letras reales';
                        }
                        return true;
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.apellido?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="rut">
                  <Form.Label className="fw-semibold">RUT (sin puntos ni guión)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="19011022K"
                    isInvalid={!!errors.rut}
                    {...register('rut', {
                      required: 'El RUT es obligatorio',
                      pattern: {
                        value: /^[0-9]{7,8}[0-9Kk]$/,
                        message: 'RUT inválido (ej: 19011022K)',
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.rut?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

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

                        if (isNaN(fechaNac.getTime())) {
                          return 'Fecha de nacimiento no válida';
                        }

                        let edad = hoy.getFullYear() - fechaNac.getFullYear();
                        const mesDiff = hoy.getMonth() - fechaNac.getMonth();
                        if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
                          edad--;
                        }

                        if (edad < 18) {
                          return 'Debes tener al menos 18 años para registrarte';
                        }
                        if (edad > 100) {
                          return 'Ingresa una fecha de nacimiento válida (máximo 100 años de edad)';
                        }
                        return true;
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fechaNacimiento?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="correo">
              <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@duoc.cl"
                isInvalid={!!errors.correo}
                {...register('correo', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[\w-\.]+@(duoc\.cl|duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i,
                    message: 'Debe terminar en @duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com',
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="region">
                  <Form.Label className="fw-semibold">Región</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.region}
                    {...register('region', {
                      required: 'Selecciona una región',
                      onChange: handleRegionChange,
                    })}
                  >
                    <option value="">-- Seleccionar --</option>
                    {datosChile.map((r, idx) => (
                      <option key={idx} value={r.region}>{r.region}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.region?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="comuna">
                  <Form.Label className="fw-semibold">Comuna</Form.Label>
                  <Form.Select
                    disabled={comunasDisponibles.length === 0}
                    isInvalid={!!errors.comuna}
                    {...register('comuna', { required: 'Selecciona una comuna' })}
                  >
                    <option value="">-- Seleccionar --</option>
                    {comunasDisponibles.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.comuna?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="clave">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={!!errors.clave}
                    {...register('clave', {
                      required: 'La contraseña es obligatoria',
                      minLength: { value: 4, message: 'De 4 a 10 caracteres' },
                      maxLength: { value: 10, message: 'De 4 a 10 caracteres' },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">{errors.clave?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-4" controlId="claveConfirm">
                  <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
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

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2">
              Completar Registro
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