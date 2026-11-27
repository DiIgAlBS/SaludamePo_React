import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import famosos from '../data/famosos';
import ProductCard from '../components/molecules/ProductCard';

function Home() {
  const masPopulares = famosos.filter((f) => f.popular).slice(0, 4);

  return (
    <div>
      {/* Banner Principal Hero */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', 
          color: 'white', 
          padding: '60px 20px', 
          textAlign: 'center' 
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold mb-3">¡Pide tu saludo personalizado!</h1>
          <p className="lead mb-4">
            Sorprende con videos exclusivos de tus actores de doblaje y famosos favoritos.
          </p>
          <Link to="/productos" className="btn btn-warning btn-lg fw-bold px-4 py-2 text-dark shadow-sm">
            Ver Catálogo
          </Link>
        </Container>
      </div>

      {/* Saludos Más Populares */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4">Saludos Más Populares</h2>
        <Row className="g-4">
          {masPopulares.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={3}>
              <ProductCard famoso={item} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Ejemplos de Saludos en Video */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center fw-bold mb-4">Ejemplos de Saludos en Video</h2>
          <Row className="g-4 justify-content-center">
            <Col md={6} lg={5} className="text-center">
              <h5 className="fw-semibold mb-3">Saludo de Naruto</h5>
              <div className="shadow-sm rounded overflow-hidden bg-black" style={{ minHeight: '260px' }}>
                <video controls controlsList="nodownload" className="w-100 rounded" style={{ maxHeight: '280px' }}>
                  <source src="/videos/promocionales/naruto.mp4" type="video/mp4" />
                  Tu navegador no soporta el reproductor de video.
                </video>
              </div>
            </Col>

            <Col md={6} lg={5} className="text-center">
              <h5 className="fw-semibold mb-3">Saludo de Waton (Atletas de la risa)</h5>
              <div className="shadow-sm rounded overflow-hidden bg-black" style={{ minHeight: '260px' }}>
                <video controls controlsList="nodownload" className="w-100 rounded" style={{ maxHeight: '280px' }}>
                  <source src="/videos/waton.mp4" type="video/mp4" />
                  Tu navegador no soporta el reproductor de video.
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Home;