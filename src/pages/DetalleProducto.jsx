import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Badge, Spinner, Alert } from 'react-bootstrap';
import Button from '../components/atoms/Button';
import { apiFetch } from '../services/api';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [famoso, setFamoso] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [tipoSaludo, setTipoSaludo] = useState('Cumpleaños');
  const [destinatario, setDestinatario] = useState('');
  const [dedicatoria, setDedicatoria] = useState('');

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await apiFetch(`/famosos/${id}`);
        setFamoso(data);
      } catch (err) {
        setError(err.message || 'No se pudo encontrar el personaje solicitado.');
      } finally {
        setCargando(false);
      }
    };
    cargarDetalle();
  }, [id]);

  const handleAgregarCarrito = (e) => {
    e.preventDefault();
    if (!destinatario.trim()) {
      alert('Por favor ingresa para quién es el saludo.');
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoItem = {
      idUnico: Date.now(),
      id: famoso.id,
      nombre: famoso.nombre,
      precio: famoso.precio,
      imagen: famoso.fotos?.[0]?.url || '/imagenes/elmo.png',
      tipoSaludo,
      destinatario: destinatario.trim(),
      dedicatoria: dedicatoria.trim(),
      cantidad: 1,
    };

    const carritoActualizado = [...carritoActual, nuevoItem];
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    window.dispatchEvent(new Event('storage'));

    alert(`¡Saludo de ${famoso.nombre} agregado al carrito po!`);
    navigate('/carrito');
  };

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 text-muted">Cargando detalle del personaje...</p>
      </Container>
    );
  }

  if (error || !famoso) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">{error || 'Personaje no encontrado.'}</Alert>
        <Link to="/productos" className="btn btn-outline-danger fw-bold">
          Volver al Catálogo
        </Link>
      </Container>
    );
  }

  const imagenPrincipal = famoso.fotos?.[0]?.url || '/imagenes/elmo.png';
  const videoMuestra = famoso.videos?.[0]?.url;
  const audioMuestra = famoso.audios?.[0]?.url;

  return (
    <Container className="my-5">
      <Link to="/productos" className="btn btn-outline-secondary btn-sm mb-4">
        ← Volver al Catálogo
      </Link>

      <Row className="g-4">
        <Col md={5}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <img
              src={imagenPrincipal}
              alt={famoso.nombre}
              className="w-100"
              style={{ maxHeight: '420px', objectFit: 'cover' }}
            />
          </Card>

          {videoMuestra && (
            <div className="mt-3">
              <p className="fw-semibold small text-muted mb-1">Video de muestra:</p>
              <video src={videoMuestra} controls className="w-100 rounded shadow-sm" />
            </div>
          )}

          {audioMuestra && (
            <div className="mt-3">
              <p className="fw-semibold small text-muted mb-1">Audio de muestra:</p>
              <audio src={audioMuestra} controls className="w-100" />
            </div>
          )}
        </Col>

        <Col md={7}>
          <Card className="border-0 shadow-sm p-4">
            <Card.Body>
              <Badge bg="secondary" className="mb-2">
                {famoso.categoria?.nombre || 'Personaje'}
              </Badge>
              <h1 className="fw-bold text-dark mb-2">{famoso.nombre}</h1>
              <h3 className="fw-bold text-danger mb-3">
                ${famoso.precio.toLocaleString('es-CL')} CLP
              </h3>
              <p className="text-muted mb-2">{famoso.descripcion}</p>
              <p className="small text-secondary mb-4">
                ⏱️ Tiempo estimado de entrega: <strong>{famoso.tiempoEntregaDias || 3} días</strong>
              </p>

              <Form onSubmit={handleAgregarCarrito}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Motivo del Saludo</Form.Label>
                  <Form.Select value={tipoSaludo} onChange={(e) => setTipoSaludo(e.target.value)}>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Ánimo / Apoyo">Ánimo / Apoyo</option>
                    <option value="Felicitaciones">Felicitaciones</option>
                    <option value="Broma / Talla">Broma / Talla</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">¿Para quién es el saludo? (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Mi amigo Juanito"
                    required
                    value={destinatario}
                    onChange={(e) => setDestinatario(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Instrucciones o dedicatoria</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe lo que quieres que diga el personaje..."
                    value={dedicatoria}
                    onChange={(e) => setDedicatoria(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="danger" size="lg" className="w-100 fw-bold py-2">
                  🛒 Agregar al Carrito
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default DetalleProducto;