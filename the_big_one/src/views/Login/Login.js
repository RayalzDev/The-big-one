import { useNavigate } from "react-router-dom";
import { HOME } from "../../Routes/paths";
import { useState } from "react";
import { LOGIN, USUARIO } from "../../config/settings";
import { Form, Button, Modal, Container, Col, Row } from "react-bootstrap/";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";

export default function Login() {
  const { setInfo } = useLogeadoContext();
  const navigate = useNavigate();

  //      Manejo del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //      Manejo del Login
  const [usuario, setUsuario] = useState({
    nombre: "",
    contraseña: "",
  });

  function handleInputsLogin(event) {
    setUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmitLogin(event) {
    event.preventDefault();

    const requestUsuario = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };
    const respuesta = await fetch(LOGIN, requestUsuario);
    const data = await respuesta.json();

    console.log({ data });

    localStorage.setItem("usuario", JSON.stringify(data));
    setInfo(data);

    if (respuesta.status === 200) {
      navigate(HOME);
    }
  }

  //      Manejo  del Registro
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
    <div className="login">
    <Container fluid className="p-4 d-flex justify-content-center" style={{ height: "100vh", weight: "100vh"}} >
      <div className="bg-light d-flex justify-content-center align-self-center h-50 w-50">
        <Row className="justify-content-center align-content-center">
          <Col md="auto">
            <Form onSubmit={handleSubmitLogin}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu usuario"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleInputsLogin}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Introduce la contraseña"
                  name="contraseña"
                  value={usuario.contraseña}
                  onChange={handleInputsLogin}
                />
                <Form.Text className="text-muted">
                  Tus datos no se compartirán a menos que los podamos vender.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button variant="primary" type="submit">
                Entrar
              </Button>
            </Form>
            <Button variant="primary" onClick={handleShow}>
              Regístrate
            </Button>
          </Col>
        </Row>
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
      </div>
    </Container>
    </div>
  );
}
