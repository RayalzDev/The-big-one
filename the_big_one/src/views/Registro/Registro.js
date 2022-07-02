import { Link, useNavigate } from "react-router-dom";
import { LOGIN, HOME } from "../../Routes/paths";
import { useState } from "react";
import { USUARIO } from "../../config/settings";

export default function Registro() {
  const navigate = useNavigate();

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

  function handleInputs(event) {
    setNuevoUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requestUsuario = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    };

    await fetch(USUARIO, requestUsuario);
    navigate(HOME);
  }

  return (
    <div>
      <h1>Registro</h1>
      <Link to={LOGIN}>Login</Link>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={nuevoUsuario.contraseña}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="text"
            name="foto"
            aria-describedby="emailHelp"
            value={nuevoUsuario.foto}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dinero inicial</label>
          <input
            type="number"
            className="form-control"
            name="cartera"
            id="formdinero"
            aria-describedby="emailHelp"
            value={nuevoUsuario.cartera}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="text"
            name="favoritos"
            aria-describedby="emailHelp"
            value={nuevoUsuario.favoritos}
            onChange={handleInputs}
          />
          </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
