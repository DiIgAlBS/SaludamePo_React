import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ famoso }) {
  return (
    <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
      <div 
        style={{ height: '210px', backgroundColor: '#f8f9fa' }} 
        className="d-flex align-items-center justify-content-center p-2 border-bottom"
      >
        <img 
          src={famoso.imagen} 
          alt={famoso.nombre} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>
      <Card.Body className="d-flex flex-column p-3">
        <span 
          className="badge bg-danger-subtle text-danger align-self-start mb-2 px-2 py-1" 
          style={{ fontSize: '0.75rem' }}
        >
          {famoso.categoria}
        </span>
        <Card.Title className="fw-bold fs-6 mb-1">{famoso.nombre}</Card.Title>
        <Card.Text className="text-muted small mb-2 flex-grow-1" style={{ fontSize: '0.825rem' }}>
          {famoso.descripcion}
        </Card.Text>
        <div className="mt-auto pt-2 d-flex justify-content-between align-items-center border-top">
          <span className="fw-bold text-danger">${famoso.precio?.toLocaleString('es-CL')} CLP</span>
          <Link to={`/productos/${famoso.id}`} className="btn btn-outline-danger btn-sm fw-semibold">
            Ver Detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;