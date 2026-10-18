import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import famosos from '../data/famosos';
import Button from '../components/atoms/Button';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const famoso = famosos.find((p) => p.id === parseInt(id));
  const [tipoSaludo, setTipoSaludo] = useState('predefinido');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!famoso) {
    return (
      <Container className="my-5 text-center">
        <h2>Celebridad no encontrada</h2>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/productos')}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const precioFinal = tipoSaludo === 'predefinido'
    ? Math.round(famoso.precio * 0.85)
    : famoso.precio;

  const onSubmit = (data) => {
    const itemCarrito = {
      idUnico: Date.now(),
      famosoId: famoso.id,
      nombre: famoso.nombre,
      imagen: famoso.imagen,
      precio: precioFinal,
      precioOriginal: famoso.precio,
      tipoSaludo: tipoSaludo === 'predefinido' ? 'Predefinido (15% DCTO)' : 'Personalizado',
      destinatario: data.destinatario.trim(),
      mensaje: tipoSaludo === 'predefinido' ? data.saludoPredefinido : data.instrucciones.trim(),
      cantidad: 1
    };

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoActual.push(itemCarrito);
    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    window.dispatchEvent(new Event('storage'));

    alert(`¡Saludo de ${famoso.nombre} agregado al carrito por $${precioFinal.toLocaleString('es-CL')} CLP!`);
    navigate('/carrito');
  };

  return (
    <Container className="my-5">
      {/* Botón Volver Atrás */}
      <Button 
        variant="secondary" 
        size="sm" 
        className="mb-3 fw-semibold" 
        onClick={() => navigate(-1)}
      >
        ← Volver atrás
      </Button>

      <Card className="shadow-sm border-0 p-4">
        <Row className="g-4">
          <Col md={6}>
            {/* Contenedor adaptado para evitar recortes de imagen */}
            <div 
              className="bg-light p-2 rounded border text-center d-flex align-items-center justify-content-center" 
              style={{ minHeight: '320px' }}
            >
              <img 
                src={famoso.imagen} 
                alt={famoso.nombre} 
                className="img-fluid rounded" 
                style={{ maxHeight: '360px', objectFit: 'contain' }} 
              />
            </div>
            
            {/* SECCIÓN DE VIDEO DINÁMICO */}
            <div className="bg-light p-3 rounded mt-3 text-center border">
              <h6 className="fw-bold mb-2">📹 Muestra de Saludo en Video:</h6>
              {famoso.video ? (
                <video 
                  controls 
                  controlsList="nodownload" 
                  className="w-100 rounded shadow-sm" 
                  style={{ maxHeight: '240px', backgroundColor: '#000' }}
                >
                  <source src={famoso.video} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              ) : (
                <small className="text-muted d-block py-2">
                  Muestra de video no disponible actualmente para esta celebridad.
                </small>
              )}
            </div>
          </Col>

          <Col md={6}>
            <span className="badge bg-danger mb-2">{famoso.categoria}</span>
            <h1 className="fw-bold mb-1">{famoso.nombre}</h1>
            
            <div className="d-flex align-items-center gap-2 mb-3">
              <h3 className="text-danger fw-bold mb-0">
                ${precioFinal.toLocaleString('es-CL')} CLP
              </h3>
              {tipoSaludo === 'predefinido' && (
                <span className="badge bg-success">
                  15% DCTO - Normal: <del>${famoso.precio.toLocaleString('es-CL')}</del>
                </span>
              )}
            </div>

            <p className="text-muted mb-4">{famoso.descripcion}</p>

            <div className="p-3 bg-light rounded border mb-4">
              <h5 className="fw-bold text-dark mb-3">Personaliza tu Saludo</h5>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tipo de Saludo:</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="radio" 
                      id="optPredefinido" 
                      label="Saludo Predefinido (15% DCTO)" 
                      name="tipoSaludo" 
                      checked={tipoSaludo === 'predefinido'} 
                      onChange={() => setTipoSaludo('predefinido')} 
                    />
                    <Form.Check 
                      type="radio" 
                      id="optPersonalizado" 
                      label="Saludo Personalizado" 
                      name="tipoSaludo" 
                      checked={tipoSaludo === 'personalizado'} 
                      onChange={() => setTipoSaludo('personalizado')} 
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="destinatario">
                  <Form.Label className="fw-semibold">¿Para quién es el saludo?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Para Carlos"
                    isInvalid={!!errors.destinatario}
                    {...register('destinatario', { 
                      required: 'Ingresa a quién va dirigido el saludo',
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
                    {errors.destinatario?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {tipoSaludo === 'predefinido' ? (
                  <Form.Group className="mb-4" controlId="saludoPredefinido">
                    <Form.Label className="fw-semibold">Selecciona un mensaje predefinido:</Form.Label>
                    <Form.Select {...register('saludoPredefinido')}>
                      <option value="¡Hola! Te mando un abrazo gigante y que tengas un feliz cumpleaños.">
                        ¡Feliz Cumpleaños! 🎂
                      </option>
                      <option value="¡Hola! Te envío mucha fuerza y ánimo, todo saldrá excelente.">
                        ¡Mucho Ánimo! 💪
                      </option>
                      <option value="¡Hola! Un saludo gigante con mucho cariño de parte de todo el equipo.">
                        Saludo General 🌟
                      </option>
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-4" controlId="instrucciones">
                    <Form.Label className="fw-semibold">Instrucciones o mensaje especial:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ej: Dile feliz cumpleaños y que siga entrenando como Saiyajin..."
                      isInvalid={!!errors.instrucciones}
                      {...register('instrucciones', {
                        required: 'Escribe las instrucciones para el saludo',
                        minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                        validate: {
                          noRepeatedChars: (value) =>
                            !/(.)\1{3,}/.test(value || '') || 'El mensaje contiene demasiadas letras repetidas seguidas (ej: aaaa)',
                          noSingleCharSpam: (value) => {
                            const letrasSinEspacios = (value || '').replace(/[\s.,!?¡¿-]+/g, '');
                            const letrasUnicas = new Set(letrasSinEspacios.toLowerCase());
                            return letrasUnicas.size > 1 || 'El mensaje debe tener contenido real, no solo una letra repetida';
                          }
                        }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.instrucciones?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Button type="submit" variant="danger" size="lg" className="w-100 fw-bold">
                  🛒 Agregar al Carrito (${precioFinal.toLocaleString('es-CL')})
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
export default DetalleProducto;