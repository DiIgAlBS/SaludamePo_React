import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import famososIniciales from '../data/famosos';

function Productos() {
  const famosos = JSON.parse(localStorage.getItem('famosos')) || famososIniciales;

  return (
    <Container className="my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Catálogo de Saludos</h2>
        <p className="text-muted">Elige a tu famoso o actor de doblaje favorito y encarga tu saludo personalizado.</p>
      </div>

      <Row className="g-4">
        {famosos.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={3}>
            <Card className="h-100 shadow-sm border-0 rounded-3">
              <Card.Img 
                variant="top" 
                src={item.imagen} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body className="d-flex flex-column p-3">
                <span className="badge bg-danger-subtle text-danger align-self-start mb-2 px-2 py-1" style={{ fontSize: '0.75rem' }}>
                  {item.categoria}
                </span>
                <Card.Title className="fw-bold fs-6 mb-1">{item.nombre}</Card.Title>
                <Card.Text className="text-muted small mb-2" style={{ fontSize: '0.825rem' }}>
                  {item.descripcion}
                </Card.Text>
                <div className="mt-auto pt-2 d-flex justify-content-between align-items-center border-top">
                  <span className="fw-bold text-danger">${item.precio.toLocaleString('es-CL')} CLP</span>
                  <Link to={`/productos/${item.id}`} className="btn btn-outline-danger btn-sm fw-semibold">
                    Ver Detalle
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Productos;