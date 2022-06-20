import { Link, useNavigate } from "react-router-dom";
import { HOME, REGISTRO } from "../../Routes/paths";
import { useState, useEffect } from "react";
import { LOGIN } from "../../config/settings";

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    contrasena: "",
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
    console.log(respuesta)
    if (respuesta.status === 200) {
      navigate(HOME);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={usuario.nombre}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={usuario.contraseña}
            onChange={handleInputs}
          />
        </div>
        <button>Submit</button>
      </form>
      <Link to={REGISTRO}>Registrarse</Link>
    </div>
  );
}
