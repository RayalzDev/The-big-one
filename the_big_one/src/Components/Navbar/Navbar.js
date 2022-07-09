import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  Offcanvas,
  Modal,
} from "react-bootstrap/";
import { useNavigate, Link } from "react-router-dom";
import { HOME } from "../../Routes/paths";
import { useState } from "react";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";
import { USUARIO } from "../../config/settings";

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
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-auto p-0">
          <Container fluid className="bg-info bg-gradient">
            <Navbar.Brand href={HOME}>StonkNet</Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {usuario.nombre}
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href={HOME}>Inicio</Nav.Link>
                  <Nav.Link href={`/perfil/${usuario._id}`}>Perfil</Nav.Link>
                  <Nav.Item type="number">{usuario.cartera}</Nav.Item>
                  <NavDropdown
                    title="Acciones"
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
                  <NavDropdown
                    title="Favoritos"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {usuario.favoritos?.map((empresa) => (
                      <NavDropdown.Item>
                        <Link to={`/empresa/${empresa}`}>{empresa}</Link>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <Form>
                    <Button variant="primary" onClick={logout}>
                      Log Out
                    </Button>
                  </Form>
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
          </Container>
        </Navbar>
      ))}
    </>
  );
}
