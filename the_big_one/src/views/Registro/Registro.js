import { Link } from "react-router-dom";
import { LOGIN } from "../../Routes/paths";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

export default function Registro() {
  const navigate = useNavigate();

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    contraseña: "",
    foto: "",
    cartera: 5,
    favoritos: [],
    acciones: [],
    rol: "usuario",
  });

  return (
    <div>
      <h1>Registro</h1>
      <Link to={LOGIN}>Login</Link>

      <form>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            id="formnombre"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            id="formcontraseña"
            placeholder="Contraseña"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="number"
            name="edad"
            className="form-control"
            id="formedad"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dinero inicial</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            id="formnombre"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
