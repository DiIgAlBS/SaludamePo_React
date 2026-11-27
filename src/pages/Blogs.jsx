import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { apiFetch } from '../services/api';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarBlogs = async () => {
      try {
        const data = await apiFetch('/blogs');
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'Error al cargar las noticias.');
      } finally {
        setCargando(false);
      }
    };
    cargarBlogs();
  }, []);

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Noticias y Blogs Pop</h1>
        <p className="text-muted">Entérate de los nuevos famosos y novedades de Saludame Po.</p>
      </div>

      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="danger" />
          <p className="mt-2 text-muted">Cargando noticias...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : blogs.length === 0 ? (
        <Alert variant="info" className="text-center">
          Aún no hay noticias publicadas.
        </Alert>
      ) : (
        <Row className="g-4">
          {blogs.map((blog) => (
            <Col key={blog.id} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                {blog.imagenUrl && (
                  <Card.Img
                    variant="top"
                    src={blog.imagenUrl}
                    alt={blog.titulo}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="danger">{blog.categoria}</Badge>
                    <small className="text-muted">{blog.fechaPublicacion}</small>
                  </div>
                  <Card.Title className="fw-bold">{blog.titulo}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">{blog.resumen}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export default Blogs;