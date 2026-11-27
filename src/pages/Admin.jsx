import { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Button, Modal, Form, Badge, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { apiFetch } from '../services/api';

function Admin() {
  const [key, setKey] = useState('catalogo');
  const [cargando, setCargando] = useState(true);
  const [errorGlobal, setErrorGlobal] = useState('');

  // Datos desde Backend
  const [famosos, setFamosos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [ventas, setVentas] = useState([]);

  // Modal Famoso
  const [showModalFamoso, setShowModalFamoso] = useState(false);
  const [famosoEditar, setFamosoEditar] = useState(null);
  const [formFamoso, setFormFamoso] = useState({
    nombre: '',
    categoriaId: '',
    precio: '',
    descripcion: '',
    imagenUrl: '',
    tiempoEntregaDias: 3,
  });

  // Modal Blog
  const [showModalBlog, setShowModalBlog] = useState(false);
  const [formBlog, setFormBlog] = useState({
    titulo: '',
    categoria: 'Noticias',
    resumen: '',
    contenido: '',
    imagenUrl: '',
  });

  const cargarTodo = async () => {
    setCargando(true);
    setErrorGlobal('');
    try {
      const [dataFamosos, dataCats, dataBlogs, dataMsgs, dataPedidos] = await Promise.all([
        apiFetch('/famosos'),
        apiFetch('/categorias'),
        apiFetch('/blogs'),
        apiFetch('/contacto'),
        apiFetch('/pedidos'),
      ]);
      setFamosos(dataFamosos);
      setCategorias(dataCats);
      setBlogs(dataBlogs);
      setMensajes(dataMsgs);
      setVentas(dataPedidos);
    } catch (err) {
      setErrorGlobal(err.message || 'Error al cargar datos del panel administrador.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  // --- CRUD FAMOSOS ---
  const abrirModalFamoso = (famoso = null) => {
    if (famoso) {
      setFamosoEditar(famoso);
      setFormFamoso({
        nombre: famoso.nombre,
        categoriaId: famoso.categoria?.id || (categorias[0]?.id ?? ''),
        precio: famoso.precio,
        descripcion: famoso.descripcion,
        imagenUrl: famoso.fotos?.[0]?.url || '',
        tiempoEntregaDias: famoso.tiempoEntregaDias || 3,
      });
    } else {
      setFamosoEditar(null);
      setFormFamoso({
        nombre: '',
        categoriaId: categorias[0]?.id ?? '',
        precio: '',
        descripcion: '',
        imagenUrl: '',
        tiempoEntregaDias: 3,
      });
    }
    setShowModalFamoso(true);
  };

  const guardarFamoso = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formFamoso.nombre,
        descripcion: formFamoso.descripcion,
        precio: Number(formFamoso.precio),
        tiempoEntregaDias: Number(formFamoso.tiempoEntregaDias),
        activo: true,
        categoria: { id: Number(formFamoso.categoriaId) },
      };

      let famosoGuardado;
      if (famosoEditar) {
        famosoGuardado = await apiFetch(`/famosos/${famosoEditar.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        famosoGuardado = await apiFetch('/famosos', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      // Si se ingresó una URL de imagen nueva, la asociamos en /api/famosos/{id}/fotos
      if (formFamoso.imagenUrl && (!famosoEditar || formFamoso.imagenUrl !== famosoEditar.fotos?.[0]?.url)) {
        await apiFetch(`/famosos/${famosoGuardado.id}/fotos`, {
          method: 'POST',
          body: JSON.stringify({
            url: formFamoso.imagenUrl,
            descripcion: `Foto de ${formFamoso.nombre}`,
            esPrincipal: true,
          }),
        });
      }

      setShowModalFamoso(false);
      await cargarTodo();
    } catch (err) {
      alert(err.message || 'Error al guardar el personaje.');
    }
  };

  const eliminarFamoso = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este personaje del catálogo?')) return;
    try {
      await apiFetch(`/famosos/${id}`, { method: 'DELETE' });
      await cargarTodo();
    } catch (err) {
      alert(err.message || 'Error al eliminar el personaje.');
    }
  };

  // --- CRUD BLOGS ---
  const guardarBlog = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/blogs', {
        method: 'POST',
        body: JSON.stringify({
          titulo: formBlog.titulo,
          categoria: formBlog.categoria,
          resumen: formBlog.resumen,
          contenido: formBlog.contenido || formBlog.resumen,
          imagenUrl: formBlog.imagenUrl,
        }),
      });
      setShowModalBlog(false);
      setFormBlog({ titulo: '', categoria: 'Noticias', resumen: '', contenido: '', imagenUrl: '' });
      await cargarTodo();
    } catch (err) {
      alert(err.message || 'Error al publicar la noticia.');
    }
  };

  const eliminarBlog = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este artículo del blog?')) return;
    try {
      await apiFetch(`/blogs/${id}`, { method: 'DELETE' });
      await cargarTodo();
    } catch (err) {
      alert(err.message || 'Error al eliminar la noticia.');
    }
  };

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 text-muted">Cargando Panel de Administración...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-danger mb-0">Panel de Administración</h1>
          <p className="text-muted">Gestión integral conectada a Spring Boot + PostgreSQL</p>
        </div>
        <Badge bg="danger" className="fs-6 px-3 py-2">
          ROLE_ADMIN
        </Badge>
      </div>

      {errorGlobal && <Alert variant="danger">{errorGlobal}</Alert>}

      <Tabs id="admin-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
        {/* TAB 1: CATÁLOGO */}
        <Tab eventKey="catalogo" title="🛍️ Catálogo (Saludos)">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Gestión de Personajes ({famosos.length})</h4>
            <Button variant="danger" className="fw-bold" onClick={() => abrirModalFamoso()}>
              + Agregar Personaje
            </Button>
          </div>

          <Table responsive striped bordered hover className="align-middle shadow-sm bg-white">
            <thead className="table-dark">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Entrega</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {famosos.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.fotos?.[0]?.url || '/imagenes/elmo.png'}
                      alt={item.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded"
                    />
                  </td>
                  <td className="fw-bold">{item.nombre}</td>
                  <td><Badge bg="secondary">{item.categoria?.nombre}</Badge></td>
                  <td className="fw-bold text-success">${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.tiempoEntregaDias} días</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => abrirModalFamoso(item)}>
                      ✏️ Editar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => eliminarFamoso(item.id)}>
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* TAB 2: BLOGS */}
        <Tab eventKey="blogs" title="📰 Noticias y Blogs">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Gestión de Noticias ({blogs.length})</h4>
            <Button variant="danger" className="fw-bold" onClick={() => setShowModalBlog(true)}>
              + Crear Noticia
            </Button>
          </div>

          <Table responsive striped bordered hover className="align-middle shadow-sm bg-white">
            <thead className="table-dark">
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold">{item.titulo}</td>
                  <td><Badge bg="info">{item.categoria}</Badge></td>
                  <td>{item.fechaPublicacion}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => eliminarBlog(item.id)}>
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* TAB 3: MENSAJES DE CONTACTO */}
        <Tab eventKey="contacto" title="📩 Mensajes Clientes">
          <h4 className="mb-3">Buzón de Consultas y Solicitudes ({mensajes.length})</h4>
          {mensajes.length === 0 ? (
            <Alert variant="info">No hay mensajes de contacto recibidos aún.</Alert>
          ) : (
            <Row className="g-3">
              {mensajes.map((m) => (
                <Col key={m.id} md={6}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold text-danger mb-0">{m.nombre}</h5>
                        <Badge bg={m.leido ? 'success' : 'warning'}>
                          {m.leido ? 'Leído' : 'Nuevo'}
                        </Badge>
                      </div>
                      <p className="text-muted small mb-1"><strong>Correo:</strong> {m.email}</p>
                      <p className="text-muted small mb-2"><strong>Asunto:</strong> {m.asunto || 'Consulta general'}</p>
                      <p className="bg-light p-2 rounded border mb-0">{m.mensaje}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        {/* TAB 4: HISTORIAL DE VENTAS */}
        <Tab eventKey="ventas" title="📊 Ventas y Pedidos">
          <h4 className="mb-3">Historial de Compras ({ventas.length})</h4>
          {ventas.length === 0 ? (
            <Alert variant="info">Aún no se han registrado ventas en la plataforma.</Alert>
          ) : (
            <Table responsive striped bordered hover className="align-middle shadow-sm bg-white">
              <thead className="table-dark">
                <tr>
                  <th>ID Pedido</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Items Comprados</th>
                  <th>Total Pagado</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td>#{v.id}</td>
                    <td>{new Date(v.fechaPedido).toLocaleDateString('es-CL')}</td>
                    <td><strong>{v.usuario?.nombre} {v.usuario?.apellido}</strong> ({v.usuario?.email})</td>
                    <td>
                      <ul className="mb-0 small ps-3">
                        {v.detalles?.map((det) => (
                          <li key={det.id}>
                            {det.famoso?.nombre} (x{det.cantidad}) - Para: {det.destinatario}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="fw-bold text-success">${v.total.toLocaleString('es-CL')} CLP</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>

      {/* MODAL PERSONAJE */}
      <Modal show={showModalFamoso} onHide={() => setShowModalFamoso(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{famosoEditar ? 'Editar Personaje' : 'Agregar Nuevo Personaje'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardarFamoso}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" required value={formFamoso.nombre} onChange={(e) => setFormFamoso({ ...formFamoso, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select required value={formFamoso.categoriaId} onChange={(e) => setFormFamoso({ ...formFamoso, categoriaId: e.target.value })}>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio CLP</Form.Label>
              <Form.Control type="number" required value={formFamoso.precio} onChange={(e) => setFormFamoso({ ...formFamoso, precio: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control type="text" value={formFamoso.imagenUrl} onChange={(e) => setFormFamoso({ ...formFamoso, imagenUrl: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} required value={formFamoso.descripcion} onChange={(e) => setFormFamoso({ ...formFamoso, descripcion: e.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalFamoso(false)}>Cancelar</Button>
            <Button variant="danger" type="submit">Guardar Cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL BLOG */}
      <Modal show={showModalBlog} onHide={() => setShowModalBlog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Artículo de Blog</Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardarBlog}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" required value={formBlog.titulo} onChange={(e) => setFormBlog({ ...formBlog, titulo: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" required value={formBlog.categoria} onChange={(e) => setFormBlog({ ...formBlog, categoria: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control type="text" value={formBlog.imagenUrl} onChange={(e) => setFormBlog({ ...formBlog, imagenUrl: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resumen / Contenido</Form.Label>
              <Form.Control as="textarea" rows={4} required value={formBlog.resumen} onChange={(e) => setFormBlog({ ...formBlog, resumen: e.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalBlog(false)}>Cancelar</Button>
            <Button variant="danger" type="submit">Publicar Artículo</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
export default Admin;