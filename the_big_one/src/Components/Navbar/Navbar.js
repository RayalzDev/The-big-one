import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  Offcanvas,
  Modal,
  Row,
  Col,
} from "react-bootstrap/";
import { useNavigate, Link } from "react-router-dom";
import { HOME } from "../../Routes/paths";
import { useState } from "react";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";
import { USUARIO } from "../../config/settings";
import logo from "../../assets/images/logo.jpg";

export default function Navegacion() {
  const { info, setInfo } = useLogeadoContext();

  const navigate = useNavigate();
  const usuario = info;

  //    Manejo del Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //      Manejo de usuario

  async function borrarUsuario() {
    const requestUsuario = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: usuario._id }),
    };
    await fetch(USUARIO, requestUsuario);
    localStorage.clear("usuario");
    setInfo({});
    navigate("/");
  }

  function logout() {
    localStorage.clear("usuario");
    setInfo({});
    navigate("/");
  }
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    contraseña: "",
    email: "",
    foto: "",
    cartera: 0,
    favoritos: [],
    acciones: [],
    rol: "usuario",
  });

  function handleInputsRegistro(event) {
    setNuevoUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmitRegistro(event) {
    event.preventDefault();

    const requestUsuario = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    };

    await fetch(USUARIO, requestUsuario);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    setInfo(nuevoUsuario);
    navigate(HOME);
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand}  expand={false} className="mb-auto p-0 " style={{ width: "100%" }}>
          {/* <Container fluid className="bg-info bg-gradient p-1"> */}
          <Row className="navegacion p-1 align-items-center" style={{ width: "100%" }}>
            <Col className="col-3 text-start ps-4 d-flex align-items-center">
              {/* <h3 className="text-black pe-3">
                <i class="bi bi-graph-up-arrow"></i>
              </h3> */}
              <img
                    style={{ maxHeight: "59px", maxWidth: "59px" }}
                    className="d-block w-100 h-100 rounded pe-2"
                    src={logo}
                    alt="Third slide"
                  />
              <Link to={HOME} className="text-decoration-none d-flex align-items-center">
                <Navbar.Brand><h3 className="text-white">StonkNet</h3></Navbar.Brand>
              </Link>
            </Col>
            <Col className="col-6"></Col>
            <Col className="col-3 text-end">
              {info ? (
                <>
                  <Navbar.Toggle
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                    variant="light"
                  />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title
                        id={`offcanvasNavbarLabel-expand-${expand}`}
                      >
                        {usuario.nombre}
                      </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href={HOME}>Inicio</Nav.Link>

                        <NavDropdown
                          title="Activos"
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          {usuario.acciones?.map((empresa) => (
                            <NavDropdown.Item>
                              <Link to={`/empresa/${empresa.nombre}`}>
                                {empresa.nombre} - {empresa.cantidad}
                              </Link>
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>

                        <Button variant="primary" onClick={logout}>
                          Log Out
                        </Button>

                        <Button variant="primary" onClick={handleShow}>
                          Borrar usuario
                        </Button>
                      </Nav>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Borrar usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          ¿Estás seguro?
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={borrarUsuario}
                          >
                            Si
                          </Button>
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClose}
                          >
                            No
                          </Button>
                        </Modal.Body>
                      </Modal>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleShow}>
                    Regístrate
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Registro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmitRegistro}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={nuevoUsuario.nombre}
                            onChange={handleInputsRegistro}
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlImput2"
                        >
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            name="contraseña"
                            value={nuevoUsuario.contraseña}
                            onChange={handleInputsRegistro}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlImput3"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={nuevoUsuario.email}
                            onChange={handleInputsRegistro}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlImput4"
                        >
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Imagen"
                            name="foto"
                            value={nuevoUsuario.foto}
                            onChange={handleInputsRegistro}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlImput5"
                        >
                          <Form.Label>Dinero</Form.Label>
                          <Form.Control
                            type="number"
                            name="cartera"
                            value={nuevoUsuario.cartera}
                            onChange={handleInputsRegistro}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleClose}>
                        Cerrar
                      </Button>
                      <Button variant="primary" onClick={handleSubmitRegistro}>
                        Registrarse
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </Col>
          </Row>
          {/* </Container> */}
        </Navbar>
      ))}
    </>
  );
}
