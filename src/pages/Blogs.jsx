import { Container, Row, Col, Card } from 'react-bootstrap';
import blogsIniciales from '../data/BlogsData';

function Blogs() {
  const noticias = JSON.parse(localStorage.getItem('blogs')) || blogsIniciales;

  return (
    <Container className="my-5">
      <h1 className="text-center fw-bold mb-5">Novedades y Noticias Pop</h1>
      <Row className="g-4">
        {noticias.map((item) => (
          <Col key={item.id} md={6}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <Card.Body>
                {item.imagen && (
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="img-fluid rounded mb-3 w-100"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <span className="badge bg-danger mb-2">{item.categoria}</span>
                <Card.Title className="fw-bold fs-4">{item.titulo}</Card.Title>
                <Card.Subtitle className="text-muted small mb-3">Publicado el {item.fecha}</Card.Subtitle>
                <Card.Text className="text-secondary">{item.resumen}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Blogs;