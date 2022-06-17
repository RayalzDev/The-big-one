import { Link } from "react-router-dom";
import { LOGIN } from "../../Routes/paths";

export default function Registro() {
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
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            name="apellido"
            className="form-control"
            id="formapellido"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input
            type="number"
            name="edad"
            className="form-control"
            id="formedad"
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
