import { useForm } from 'react-hook-form';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Button from '../components/atoms/Button';

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const mensajesExistentes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    const nuevoMensaje = {
      id: Date.now(),
      nombreCompleto: data.nombreCompleto.trim(),
      correoContacto: data.correoContacto.trim().toLowerCase(),
      tipoSolicitud: data.tipoSolicitud,
      mensajeContacto: data.mensajeContacto.trim(),
      fecha: new Date().toLocaleDateString('es-CL'),
      respondido: false,
      respuesta: ''
    };

    mensajesExistentes.push(nuevoMensaje);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajesExistentes));

    setEnviado(true);
    reset();
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '600px', width: '100%' }} className="shadow-sm border-0 p-3">
        <Card.Body>
          <h2 className="text-center fw-bold text-danger mb-2">Contáctanos</h2>
          <p className="text-center text-muted mb-4">
            ¿Tienes dudas o quieres postularte como famoso? Déjanos un mensaje.
          </p>

          {enviado && (
            <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nombreCompleto">
              <Form.Label className="fw-semibold">Nombre Completo (*)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Maria Lopez"
                isInvalid={!!errors.nombreCompleto}
                {...register('nombreCompleto', {
                  required: 'El nombre es obligatorio',
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: 'El nombre solo debe contener letras y espacios (sin números ni símbolos)'
                  },
                  validate: {
                    minLetters: (val) => {
                      const soloLetras = (val || '').trim().replace(/\s+/g, '');
                      if (soloLetras.length < 3) {
                        return 'El nombre debe tener al menos 3 letras reales (sin contar espacios)';
                      }
                      return true;
                    },
                    noRepeatedChars: (value) =>
                      !/(.)\1{2,}/.test(value || '') || 'No puedes usar 3 o más letras iguales seguidas (ej: aaa)'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreCompleto?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="correoContacto">
              <Form.Label className="fw-semibold">Correo Electrónico (*)</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@duoc.cl"
                isInvalid={!!errors.correoContacto}
                {...register('correoContacto', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[\w-\.]+@(duoc\.cl|duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i,
                    message: 'Ingresa un correo válido (@duoc.cl, @duocuc.cl, etc.)'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.correoContacto?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tipoSolicitud">
              <Form.Label className="fw-semibold">Tipo de Solicitud (*)</Form.Label>
              <Form.Select
                isInvalid={!!errors.tipoSolicitud}
                {...register('tipoSolicitud', { required: 'Selecciona el motivo de tu contacto' })}
              >
                <option value="">-- Selecciona una opción --</option>
                <option value="Ayuda al cliente">Ayuda al cliente</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Agradecimiento">Agradecimiento</option>
                <option value="Dudas">Dudas generales</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.tipoSolicitud?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="mensajeContacto">
              <Form.Label className="fw-semibold">Mensaje (*)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escribe tu consulta aquí..."
                isInvalid={!!errors.mensajeContacto}
                {...register('mensajeContacto', {
                  required: 'El mensaje no puede estar vacío',
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!?¡¿-]+$/,
                    message: 'No se permiten símbolos o caracteres extraños'
                  },
                  validate: {
                    minLen: (val) => val.trim().length >= 10 || 'Ingresa al menos 10 caracteres explicativos',
                    tieneTexto: (val) => /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(val) || 'El mensaje no puede contener únicamente números',
                    noRepeatedChars: (value) =>
                      !/(.)\1{3,}/.test(value || '') || 'No puedes usar 4 o más caracteres iguales seguidos (ej: aaaa)',
                    noSingleCharSpam: (value) => {
                      const letrasSinEspacios = (value || '').replace(/[\s.,!?¡¿-]+/g, '');
                      const letrasUnicas = new Set(letrasSinEspacios.toLowerCase());
                      return letrasUnicas.size > 1 || 'El mensaje debe contener texto real, no solo un carácter repetido';
                    }
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mensajeContacto?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100 fw-bold py-2">
              Enviar Mensaje
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Contacto;