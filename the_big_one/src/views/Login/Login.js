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

  
  
  return (
    <div className="login">
    <Container fluid className="p-4 d-flex justify-content-center" style={{ height: "100vh", weight: "100vh"}} >
      <div className="bg-light d-flex justify-content-center align-self-center p-5 rounded">
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

          </Col>
        </Row>
        
      </div>
    </Container>
    </div>
  );
}
