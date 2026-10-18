import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import famosos from '../data/famosos';
import ProductCard from '../components/molecules/ProductCard';

function Productos() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('defecto');

  useEffect(() => {
    // Limpia registros antiguos de la memoria del navegador
    localStorage.removeItem('famosos');
  }, []);

  const categorias = ['Todas', ...new Set(famosos.map((f) => f.categoria))];

  // 1. Filtrar por categoría y texto de búsqueda
  let resultado = famosos.filter((famoso) => {
    const coincideCategoria = categoria === 'Todas' || famoso.categoria === categoria;
    const coincideBusqueda = famoso.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // 2. Aplicar ordenamiento dinámico
  resultado = [...resultado].sort((a, b) => {
    if (orden === 'nombre-asc') return a.nombre.localeCompare(b.nombre);
    if (orden === 'nombre-desc') return b.nombre.localeCompare(a.nombre);
    if (orden === 'precio-asc') return a.precio - b.precio;
    if (orden === 'precio-desc') return b.precio - a.precio;
    return 0; // Orden por defecto (del 1 al 20)
  });

  return (
    <Container className="my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-dark">Catálogo de Saludos</h1>
        <p className="text-muted">Elige a tu famoso o personaje favorito y encarga tu saludo personalizado.</p>
      </div>

      {/* Controles de Búsqueda, Filtro y Ordenamiento */}
      <Row className="mb-4 g-3 align-items-center">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold small">Buscar personaje:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Kramer, Naruto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold small">Categoría:</Form.Label>
            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold small">Ordenar por:</Form.Label>
            <Form.Select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="defecto">Orden recomendado</option>
              <option value="nombre-asc">Nombre: A - Z</option>
              <option value="nombre-desc">Nombre: Z - A</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Grilla de Productos */}
      {resultado.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">No se encontraron resultados para tu búsqueda.</h5>
        </div>
      ) : (
        <Row className="g-4">
          {resultado.map((famoso) => (
            <Col key={famoso.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard 
                famoso={famoso} 
                onVerDetalle={(id) => navigate(`/producto/${id}`)} 
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export default Productos;