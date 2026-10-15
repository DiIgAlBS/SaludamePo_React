import { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Button, Modal, Form, Badge, Card, Row, Col, Alert } from 'react-bootstrap';
import famososIniciales from '../data/famosos';
import blogsIniciales from '../data/blogsData';

function Admin() {
  const [key, setKey] = useState('catalogo');

  // Estados locales sincronizados con localStorage
  const [famosos, setFamosos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [ventas, setVentas] = useState([]);

  // Estados para modales de Catálogo
  const [showModalFamoso, setShowModalFamoso] = useState(false);
  const [famosoEditar, setFamosoEditar] = useState(null);
  const [formFamoso, setFormFamoso] = useState({ nombre: '', categoria: '', precio: '', descripcion: '', imagen: '', popular: false });

  // Estados para modales de Blog
  const [showModalBlog, setShowModalBlog] = useState(false);
  const [blogEditar, setBlogEditar] = useState(null);
  const [formBlog, setFormBlog] = useState({ titulo: '', categoria: '', fecha: '', resumen: '', imagen: '' });

  // Estados para responder mensajes
  const [showModalRespuesta, setShowModalRespuesta] = useState(false);
  const [mensajeSel, setMensajeSel] = useState(null);
  const [textoRespuesta, setTextoRespuesta] = useState('');

  // Cargar datos desde localStorage
  useEffect(() => {
    const famsStorage = JSON.parse(localStorage.getItem('famosos')) || famososIniciales;
    localStorage.setItem('famosos', JSON.stringify(famsStorage));
    setFamosos(famsStorage);

    const blogsStorage = JSON.parse(localStorage.getItem('blogs')) || blogsIniciales;
    localStorage.setItem('blogs', JSON.stringify(blogsStorage));
    setBlogs(blogsStorage);

    const msgsStorage = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    setMensajes(msgsStorage);

    const ventasStorage = JSON.parse(localStorage.getItem('ventas')) || [];
    setVentas(ventasStorage);
  }, []);

  // --- MÉTODOS CATÁLOGO ---
  const guardarFamoso = (e) => {
    e.preventDefault();
    let listaActualizada = [...famosos];

    if (famosoEditar) {
      listaActualizada = listaActualizada.map((f) =>
        f.id === famosoEditar.id ? { ...f, ...formFamoso, precio: Number(formFamoso.precio) } : f
      );
    } else {
      const nuevo = {
        id: Date.now(),
        ...formFamoso,
        precio: Number(formFamoso.precio)
      };
      listaActualizada.push(nuevo);
    }

    setFamosos(listaActualizada);
    localStorage.setItem('famosos', JSON.stringify(listaActualizada));
    setShowModalFamoso(false);
  };

  const eliminarFamoso = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este personaje del catálogo?')) {
      const filtrados = famosos.filter((f) => f.id !== id);
      setFamosos(filtrados);
      localStorage.setItem('famosos', JSON.stringify(filtrados));
    }
  };

  const abrirModalFamoso = (famoso = null) => {
    if (famoso) {
      setFamosoEditar(famoso);
      setFormFamoso(famoso);
    } else {
      setFamosoEditar(null);
      setFormFamoso({ nombre: '', categoria: 'Personajes Animados', precio: '', descripcion: '', imagen: '', popular: false });
    }
    setShowModalFamoso(true);
  };

  // --- MÉTODOS BLOGS ---
  const guardarBlog = (e) => {
    e.preventDefault();
    let listaActualizada = [...blogs];

    if (blogEditar) {
      listaActualizada = listaActualizada.map((b) => (b.id === blogEditar.id ? { ...b, ...formBlog } : b));
    } else {
      const nuevo = { id: Date.now(), ...formBlog };
      listaActualizada.push(nuevo);
    }

    setBlogs(listaActualizada);
    localStorage.setItem('blogs', JSON.stringify(listaActualizada));
    setShowModalBlog(false);
  };

  const eliminarBlog = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este artículo del blog?')) {
      const filtrados = blogs.filter((b) => b.id !== id);
      setBlogs(filtrados);
      localStorage.setItem('blogs', JSON.stringify(filtrados));
    }
  };

  const abrirModalBlog = (blog = null) => {
    if (blog) {
      setBlogEditar(blog);
      setFormBlog(blog);
    } else {
      setBlogEditar(null);
      setFormBlog({ titulo: '', categoria: 'Noticias', fecha: new Date().toISOString().split('T')[0], resumen: '', imagen: '' });
    }
    setShowModalBlog(true);
  };

  // --- MÉTODOS MENSAJES DE CONTACTO ---
  const enviarRespuestaMensaje = (e) => {
    e.preventDefault();
    const listaActualizada = mensajes.map((m) =>
      m.id === mensajeSel.id ? { ...m, respuesta: textoRespuesta, respondido: true } : m
    );
    setMensajes(listaActualizada);
    localStorage.setItem('mensajesContacto', JSON.stringify(listaActualizada));
    setShowModalRespuesta(false);
    setTextoRespuesta('');
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-danger mb-0">Panel de Administración</h1>
          <p className="text-muted">Gestión integral de Saludame Po</p>
        </div>
        <Badge bg="danger" className="fs-6 px-3 py-2">
          Modo Administrador
        </Badge>
      </div>

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
                <th>Popular</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {famosos.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                  </td>
                  <td className="fw-bold">{item.nombre}</td>
                  <td><Badge bg="secondary">{item.categoria}</Badge></td>
                  <td className="fw-bold text-success">${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.popular ? <Badge bg="warning" text="dark">Sí</Badge> : 'No'}</td>
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
            <Button variant="danger" className="fw-bold" onClick={() => abrirModalBlog()}>
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
                  <td>{item.fecha}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => abrirModalBlog(item)}>
                      ✏️ Editar
                    </Button>
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
          <h4 className="mb-3">Buzón de Consultas y Solicitudes</h4>
          {mensajes.length === 0 ? (
            <Alert variant="info">No hay mensajes de contacto recibidos aún.</Alert>
          ) : (
            <Row className="g-3">
              {mensajes.map((m) => (
                <Col key={m.id} md={6}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold text-danger mb-0">{m.nombreCompleto}</h5>
                        <Badge bg={m.respondido ? 'success' : 'warning'}>
                          {m.respondido ? 'Respondido' : 'Pendiente'}
                        </Badge>
                      </div>
                      <p className="text-muted small mb-1"><strong>Correo:</strong> {m.correoContacto}</p>
                      <p className="text-muted small mb-2"><strong>Tipo:</strong> {m.tipoSolicitud}</p>
                      <p className="bg-light p-2 rounded border mb-2">{m.mensajeContacto}</p>

                      {m.respondido && (
                        <Alert variant="success" className="p-2 small mb-2">
                          <strong>Respuesta enviada:</strong> {m.respuesta}
                        </Alert>
                      )}

                      <Button
                        variant={m.respondido ? 'outline-secondary' : 'danger'}
                        size="sm"
                        onClick={() => {
                          setMensajeSel(m);
                          setTextoRespuesta(m.respuesta || '');
                          setShowModalRespuesta(true);
                        }}
                      >
                        {m.respondido ? 'Modificar Respuesta' : 'Responder Consulta'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        {/* TAB 4: HISTORIAL DE VENTAS */}
        <Tab eventKey="ventas" title="📊 Ventas y Pedidos">
          <h4 className="mb-3">Historial Reciente de Compras</h4>
          {ventas.length === 0 ? (
            <Alert variant="info">Aún no se han registrado ventas en la plataforma.</Alert>
          ) : (
            <Table responsive striped bordered hover className="align-middle shadow-sm bg-white">
              <thead className="table-dark">
                <tr>
                  <th>ID Venta</th>
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
                    <td>{v.fecha}</td>
                    <td><strong>{v.usuarioNombre}</strong> ({v.usuarioCorreo})</td>
                    <td>
                      <ul className="mb-0 small ps-3">
                        {v.items.map((it, idx) => (
                          <li key={idx}>
                            {it.nombre} ({it.tipoSaludo}) - Para: {it.destinatario}
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
              <Form.Select value={formFamoso.categoria} onChange={(e) => setFormFamoso({ ...formFamoso, categoria: e.target.value })}>
                <option value="Personajes Animados">Personajes Animados</option>
                <option value="Caricaturas">Caricaturas</option>
                <option value="Famosos Nacionales">Famosos Nacionales</option>
                <option value="Humor Nacional">Humor Nacional</option>
                <option value="Anime / Doblaje">Anime / Doblaje</option>
                <option value="Personajes TV">Personajes TV</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio CLP</Form.Label>
              <Form.Control type="number" required value={formFamoso.precio} onChange={(e) => setFormFamoso({ ...formFamoso, precio: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control type="text" required value={formFamoso.imagen} onChange={(e) => setFormFamoso({ ...formFamoso, imagen: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} required value={formFamoso.descripcion} onChange={(e) => setFormFamoso({ ...formFamoso, descripcion: e.target.value })} />
            </Form.Group>
            <Form.Check type="checkbox" label="Destacado en Home (Popular)" checked={formFamoso.popular} onChange={(e) => setFormFamoso({ ...formFamoso, popular: e.target.checked })} />
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
          <Modal.Title>{blogEditar ? 'Editar Artículo' : 'Crear Artículo de Blog'}</Modal.Title>
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
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" required value={formBlog.fecha} onChange={(e) => setFormBlog({ ...formBlog, fecha: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control type="text" required value={formBlog.imagen} onChange={(e) => setFormBlog({ ...formBlog, imagen: e.target.value })} />
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

      {/* MODAL RESPONDER MENSAJE */}
      <Modal show={showModalRespuesta} onHide={() => setShowModalRespuesta(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Responder a {mensajeSel?.nombreCompleto}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={enviarRespuestaMensaje}>
          <Modal.Body>
            <p className="bg-light p-2 rounded border"><strong>Consulta original:</strong> {mensajeSel?.mensajeContacto}</p>
            <Form.Group className="mb-3">
              <Form.Label>Respuesta del Administrador</Form.Label>
              <Form.Control as="textarea" rows={4} required placeholder="Escribe aquí la respuesta oficial..." value={textoRespuesta} onChange={(e) => setTextoRespuesta(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalRespuesta(false)}>Cancelar</Button>
            <Button variant="success" type="submit">Enviar Respuesta</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
export default Admin;