import { Container, Row, Col, Card } from 'react-bootstrap';

function Nosotros() {
  return (
    <Container className="my-5">
      <h1 className="text-center fw-bold mb-5">Sobre Saludame Po</h1>

      <Row className="g-4 mb-5 align-items-center">
        <Col md={6}>
          <h3 className="fw-bold mb-3">Nuestra Misión</h3>
          <p className="text-muted">
            <strong>Saludame Po</strong> nace con el objetivo de acortar la distancia entre los fanáticos y sus estrellas favoritas. Nos especializamos en conectar a las voces más queridas del doblaje latinoamericano y talentos nacionales con personas que buscan un regalo inolvidable y único.
          </p>
          <p className="text-muted">
            Ya sea para un cumpleaños, un saludo motivacional o una broma entre amigos, garantizamos videos personalizados en alta calidad y con la mejor buena onda chilena.
          </p>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm p-4" style={{ backgroundColor: '#fff1f2' }}>
            <Card.Body>
              <h4 className="fw-bold mb-3">¿Por qué elegirnos?</h4>
              <ul className="list-unstyled text-secondary mb-0">
                <li className="mb-2">✔️ Contacto directo con actores de doblaje oficiales.</li>
                <li className="mb-2">✔️ Entrega rápida en menos de 48 horas.</li>
                <li>✔️ Pagos seguros y garantía de satisfacción.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="text-center fw-bold mb-4">Equipo Desarrollador</h3>
      <Row className="g-4 justify-content-center">
        <Col md={5}>
          <Card className="shadow-sm border-0 text-center p-3">
            <Card.Body>
              <h5 className="fw-bold mb-1">Diego Bustamante</h5>
              <p className="text-muted small mb-0">Desarrollador Frontend - Duoc UC</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm border-0 text-center p-3">
            <Card.Body>
              <h5 className="fw-bold mb-1">Bastián Zúñiga</h5>
              <p className="text-muted small mb-0">Desarrollador Frontend - Duoc UC</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Nosotros;