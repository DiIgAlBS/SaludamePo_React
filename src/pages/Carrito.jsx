import { Container, Table, Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

function Carrito() {
  const navigate = useNavigate();
  const [itemsCarrito, setItemsCarrito] = useState([]);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setItemsCarrito(carrito);
  }, []);

  const actualizarStorage = (nuevoCarrito) => {
    setItemsCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
  };

  const eliminarItem = (idUnico) => {
    const filtrado = itemsCarrito.filter((item) => item.idUnico !== idUnico);
    actualizarStorage(filtrado);
  };

  const vaciarCarrito = () => {
    actualizarStorage([]);
  };

  const totalPagar = itemsCarrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handlePagar = () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (!usuarioLogueado) {
      alert('Debes iniciar sesión para completar la compra de tus saludos.');
      navigate('/login');
      return;
    }

    const ventasAnteriores = JSON.parse(localStorage.getItem('ventas')) || [];
    const nuevaVenta = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-CL'),
      usuarioNombre: usuarioLogueado.nombre,
      usuarioCorreo: usuarioLogueado.correo,
      items: itemsCarrito,
      total: totalPagar
    };

    ventasAnteriores.push(nuevaVenta);
    localStorage.setItem('ventas', JSON.stringify(ventasAnteriores));

    alert(`¡Gracias ${usuarioLogueado.nombre}! Tu pago por $${totalPagar.toLocaleString('es-CL')} CLP ha sido procesado exitosamente.`);
    vaciarCarrito();
    navigate('/');
  };

  return (
    <Container className="my-5">
      <h1 className="fw-bold mb-4">Tu Carrito de Saludos</h1>

      <Row className="g-4">
        <Col md={8}>
          {itemsCarrito.length === 0 ? (
            <Card className="text-center p-5 border-0 shadow-sm">
              <Card.Body>
                <h4>Tu carrito está vacío po 🛒</h4>
                <p className="text-muted mb-4">Añade un saludo personalizado desde nuestro catálogo.</p>
                <Link to="/productos" className="btn btn-outline-danger fw-bold">
                  Ver Catálogo
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <>
              <Table responsive className="align-middle bg-white shadow-sm rounded">
                <thead className="table-light">
                  <tr>
                    <th>Famoso / Personaje</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsCarrito.map((item) => (
                    <tr key={item.idUnico}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={item.imagen} alt={item.nombre} style={{ width: '45px', height: '45px', objectFit: 'cover' }} className="rounded" />
                          <div>
                            <strong className="d-block">{item.nombre}</strong>
                            <small className="text-muted">Para: {item.destinatario}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{item.tipoSaludo}</span>
                      </td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td className="fw-bold text-danger">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarItem(item.idUnico)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-warning fw-bold text-dark" onClick={vaciarCarrito}>
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 p-3">
            <Card.Body>
              <h4 className="fw-bold mb-3">Resumen del Pedido</h4>
              <div className="d-flex justify-content-between fs-5 mb-4 border-top pt-3">
                <span>Total a Pagar:</span>
                <strong className="text-danger">${totalPagar.toLocaleString('es-CL')} CLP</strong>
              </div>

              <Button 
                variant="danger" 
                size="lg" 
                className="w-100 fw-bold py-2" 
                disabled={itemsCarrito.length === 0} 
                onClick={handlePagar}
              >
                Pagar Ahora
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Carrito;