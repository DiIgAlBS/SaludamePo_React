import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <p className="mb-1 fw-bold">
          Saludame Po - Proyecto Frontend &copy; 2026.
        </p>
        <small className="text-muted">
          Términos y Condiciones | Privacidad
        </small>
      </Container>
    </footer>
  );
}
export default Footer;