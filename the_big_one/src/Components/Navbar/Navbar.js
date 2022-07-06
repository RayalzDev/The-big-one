import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Offcanvas,
} from "react-bootstrap/";
import { useNavigate, Link } from "react-router-dom";
import { PERFIL, HOME } from "../../Routes/paths";
import {useState} from "react"

export default function Navegacion() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function logout() {
    localStorage.clear("usuario");
    navigate("/");
  }


  const [buscarEmpresa, setbuscarEmpresa] = useState({
    name: "",
    });

  const baseBusqueda = {
    name: ""
  };

  const [busqueda, setBusqueda] = useState(baseBusqueda);

  function handleBusqueda(event) {
    setBusqueda((busqueda) => ({
      ...busqueda,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmitBusqueda(event) {
    event.preventDefault();
    setbuscarEmpresa(busqueda);
  }

  console.log(busqueda);
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand href={HOME}>Mi Pagina</Navbar.Brand>
            <Form className="d-flex" onSubmit={handleSubmitBusqueda}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="name"
                onChange={handleBusqueda}
              />
              <Button variant="outline-light bg-primary" type="submit">
                Search
              </Button>
            </Form>
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
                    {usuario.acciones.map((empresa) => (
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
                    {usuario.favoritos.map((empresa) => (
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
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
