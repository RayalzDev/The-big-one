import { Link, useNavigate } from "react-router-dom";
import { HOME, REGISTRO } from "../../Routes/paths";
import { useState } from "react";
import { LOGIN } from "../../config/settings";
import { Form, Button } from "react-bootstrap/";

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    contraseña: "",
  });

  function handleInputs(event) {
    setUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
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

    if (respuesta.status === 200) {
      navigate(HOME);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce tu usuario"
            name="nombre"
            value={usuario.nombre}
            onChange={handleInputs}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce la contraseña"
            name="contraseña"
            value={usuario.contraseña}
            onChange={handleInputs}
          />
          <Form.Text className="text-muted">
            Tus datos no se compartirán a menos que los podamos vender.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to={REGISTRO}>Registrarse</Link>
    </div>
  );
}
