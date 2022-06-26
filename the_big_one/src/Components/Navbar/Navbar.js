import {Container, Navbar, Nav, NavDropdown, Button, Form, FormControl, Offcanvas} from 'react-bootstrap/';
import {PERFIL} from "../../Routes/paths"

export default function Navegacion() {
 const usuario = JSON.parse(localStorage.getItem("usuario"));


  return (
    <>
  {[false].map((expand) => (
    <Navbar key={expand} bg="light" expand={false} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#" >Navbar Offcanvas</Navbar.Brand>
        <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
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
              <Nav.Link href="#action1">Inicio</Nav.Link>
              <Nav.Link href={PERFIL}>Perfil</Nav.Link>
              <Nav.Item type="number">{usuario.cartera}</Nav.Item>
              <NavDropdown
                title="Acciones"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
               {usuario.acciones.forEach(empresa => <NavDropdown.Item >{empresa.nombre} - {empresa.cantidad}</NavDropdown.Item>)}
              </NavDropdown>
              <NavDropdown
                title="Favoritos"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
               {usuario.favoritos.forEach(empresa => <NavDropdown.Item >{empresa}</NavDropdown.Item>)}
              </NavDropdown>
              <NavDropdown.Divider />
              <Nav.Item>Log Out</Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}
</>

  );
}
