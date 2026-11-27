import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Carousel } from 'react-bootstrap';
import { apiFetch } from '../services/api';
import blogsData from '../data/BlogsData';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarBlogs = async () => {
      try {
        const data = await apiFetch('/blogs');
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(blogsData);
        }
      } catch (err) {
        console.warn('Usando respaldo local de blogs:', err.message);
        setBlogs(blogsData);
      } finally {
        setCargando(false);
      }
    };
    cargarBlogs();
  }, []);

  const estiloImagen = {
    height: '260px',
    objectFit: 'contain',
    backgroundColor: '#f8f9fa',
    padding: '8px'
  };

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
      ) : (
        <Row className="g-4">
          {blogs.map((blog) => {
            const localMatch = blogsData.find((item) => item.titulo === blog.titulo);
            const listaImagenes = localMatch?.imagenes || (blog.imagenUrl ? [blog.imagenUrl] : []);

            return (
              <Col key={blog.id || blog.titulo} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 overflow-hidden">
                  {listaImagenes.length > 1 ? (
                    <Carousel interval={3000} indicators={true} controls={true} variant="dark">
                      {listaImagenes.map((imgSrc, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            className="d-block w-100"
                            src={imgSrc}
                            alt={`${blog.titulo} - ${idx + 1}`}
                            style={estiloImagen}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : listaImagenes.length === 1 ? (
                    <Card.Img
                      variant="top"
                      src={listaImagenes[0]}
                      alt={blog.titulo}
                      style={estiloImagen}
                    />
                  ) : null}

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
            );
          })}
        </Row>
      )}
    </Container>
  );
}
export default Blogs;