import { Link } from "react-router-dom";
import { HOME, REGISTRO } from "../../Routes/paths";

export default function Login() {





  return (
    <div>
      <h1>Login</h1>
      <form >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
         
            
          />
        </div>
          <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
           
           
          />
        </div>
        <button>
          Submit
        </button>
        </form>
    </div>
  );
}
