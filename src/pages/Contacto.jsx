import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import Button from '../components/atoms/Button';
import { apiFetch } from '../services/api';

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setEnviado(false);
    setErrorEnvio('');
    setCargando(true);

    try {
      await apiFetch('/contacto', {
        method: 'POST',
        body: JSON.stringify({
          nombre: data.nombre.trim(),
          email: data.email.trim().toLowerCase(),
          asunto: data.asunto,
          mensaje: data.mensaje.trim(),
        }),
      });

      setEnviado(true);
      reset();
    } catch (err) {
      setErrorEnvio(err.message || 'No se pudo enviar el mensaje. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '600px', width: '100%' }} className="shadow-sm border-0 p-4">
        <Card.Body>
          <h2 className="text-center fw-bold text-danger mb-2">Contáctanos</h2>
          <p className="text-center text-muted mb-4">
            ¿Tienes dudas o quieres postular como famoso? Escríbenos po.
          </p>

          {enviado && (
            <Alert variant="success">
              ¡Mensaje enviado con éxito! Nuestro equipo te responderá pronto.
            </Alert>
          )}
          {errorEnvio && <Alert variant="danger">{errorEnvio}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label className="fw-semibold">Nombre Completo (*)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Camila Soto"
                isInvalid={!!errors.nombre}
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-semibold">Correo Electrónico (*)</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.cl"
                isInvalid={!!errors.email}
                {...register('email', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Ingresa un correo válido',
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="asunto">
              <Form.Label className="fw-semibold">Motivo de Contacto</Form.Label>
              <Form.Select {...register('asunto')}>
                <option value="Consulta General">Consulta General</option>
                <option value="Problema con un Pedido">Problema con un Pedido</option>
                <option value="Postular como Famoso">Postular como Famoso</option>
                <option value="Sugerencia">Sugerencia</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="mensaje">
              <Form.Label className="fw-semibold">Mensaje (*)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Cuéntanos en qué te podemos ayudar..."
                isInvalid={!!errors.mensaje}
                {...register('mensaje', {
                  required: 'El mensaje no puede estar vacío',
                  minLength: { value: 10, message: 'Escribe al menos 10 caracteres' },
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.mensaje?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2" disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Contacto;