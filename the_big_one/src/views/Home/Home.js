import { Link } from "react-router-dom";
import { LOGIN, REGISTRO } from "../../Routes/paths";
import  useFetch  from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import {USUARIO} from "../../config/settings"

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const usuarios = useFetch(USUARIO);

  useEffect(
    function () {
      setUsuario(usuarios);
    },
    [usuarios]
  );
  return (
    <div>
      <h1>Home</h1>

      <ul>
        <li>
          <Link to={LOGIN}>Login</Link>
        </li>
        <li>
        {usuario &&
        usuario.map((usuario) => (
          <div key={usuario._id}>
            <Link to={`/profile/${usuario._id}`}>
              <p>{usuario.nombre}</p>
            </Link>
          </div>
        ))}
        </li>
        <li>
          <Link to={REGISTRO}>Registro</Link>
        </li>
      </ul>
    </div>
  );
}
