import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const [cantCarrito, setCantCarrito] = useState(0);
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

  useEffect(() => {
    const actualizarCantidad = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
      setCantCarrito(totalItems);
    };

    actualizarCantidad();
    window.addEventListener('storage', actualizarCantidad);
    return () => window.removeEventListener('storage', actualizarCantidad);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    navigate('/login');
  };

  return (
    <Navbar style={{ backgroundColor: '#f43f5e' }} variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-white">
          Saludame Po
        </Navbar.Brand>

        {/* Botón Hamburguesa que aparece en móviles */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Menú desplegable */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos" className="text-white">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="text-white">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="text-white">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="text-white">Contacto</Nav.Link>
          </Nav>

          {/* Sección de Sesión y Carrito adaptable */}
          <Nav className="align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0">
            {usuarioLogueado?.rol === 'admin' && (
              <Nav.Link as={Link} to="/admin" className="btn btn-dark text-warning btn-sm fw-bold px-3 w-100 w-lg-auto text-start text-lg-center">
                ⚙️ Panel Admin
              </Nav.Link>
            )}

            {usuarioLogueado ? (
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 w-100 w-lg-auto">
                <span className="text-white fw-semibold">
                  👋 Hola, {usuarioLogueado.nombre}
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="w-100 w-lg-auto">
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-light text-dark btn-sm px-3 fw-semibold w-100 w-lg-auto text-center">
                Iniciar Sesión
              </Nav.Link>
            )}

            <Button 
              as={Link} 
              to="/carrito" 
              variant="warning" 
              size="sm" 
              className="fw-bold text-dark d-flex align-items-center justify-content-center gap-1 w-100 w-lg-auto ms-lg-2"
            >
              🛒 Cart ({cantCarrito})
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;